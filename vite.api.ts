import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ValidationError } from 'yup';
import type { Plugin, PreviewServer, ViteDevServer } from 'vite';
import {
  loginSchema,
  registrationSchema,
  type LoginValues,
  type RegistrationValues,
} from './src/lib/registrationSchema.ts';

interface UserRecord {
  fullName: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  createdAt: string;
}

const dataDirectory = resolve(dirname(fileURLToPath(import.meta.url)), 'data');
const usersFile = resolve(dataDirectory, 'users.json');
const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

function readRequestBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolveRequest, rejectRequest) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => resolveRequest(Buffer.concat(chunks).toString('utf8')));
    request.on('error', rejectRequest);
  });
}

async function readUsers(): Promise<UserRecord[]> {
  try {
    const parsed = JSON.parse(await readFile(usersFile, 'utf8')) as unknown;
    return Array.isArray(parsed) ? (parsed as UserRecord[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users: UserRecord[]): Promise<void> {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8');
}

async function handleRegistration(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  let body: RegistrationValues;
  try {
    const requestBody: unknown = JSON.parse(await readRequestBody(request));
    body = await registrationSchema.validate(requestBody, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      sendJson(response, 400, { error: error.errors[0] ?? 'Invalid registration data' });
    } else {
      sendJson(response, 400, { error: 'Invalid JSON request body' });
    }
    return;
  }

  try {
    const fullName = body.fullName;
    const email = body.email.toLowerCase();
    const password = body.password;
    const users = await readUsers();
    if (users.some((user) => user.email === email)) {
      sendJson(response, 409, { error: 'An account with this email already exists' });
      return;
    }

    const passwordSalt = randomBytes(16).toString('hex');
    const passwordHash = (await scrypt(password, passwordSalt, 64)).toString('hex');
    const user: UserRecord = {
      fullName,
      email,
      passwordSalt,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    await writeUsers([...users, user]);
    sendJson(response, 201, {
      ok: true,
      user: { fullName, email },
    });
  } catch {
    sendJson(response, 400, { error: 'Invalid JSON request body' });
  }
}

async function handleLogin(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  let body: LoginValues;
  try {
    const requestBody: unknown = JSON.parse(await readRequestBody(request));
    body = await loginSchema.validate(requestBody, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      sendJson(response, 400, { error: error.errors[0] ?? 'Invalid login data' });
    } else {
      sendJson(response, 400, { error: 'Invalid JSON request body' });
    }
    return;
  }

  try {
    const email = body.email.toLowerCase();
    const users = await readUsers();
    const user = users.find((record) => record.email === email);
    const salt = user?.passwordSalt ?? '0'.repeat(32);
    const passwordHash = await scrypt(body.password, salt, 64);
    const savedHash = user ? Buffer.from(user.passwordHash, 'hex') : Buffer.alloc(passwordHash.length);
    const isValid = savedHash.length === passwordHash.length
      && timingSafeEqual(savedHash, passwordHash);

    if (!user || !isValid) {
      sendJson(response, 401, { error: 'Неверный email или пароль' });
      return;
    }

    sendJson(response, 200, {
      ok: true,
      user: { fullName: user.fullName, email: user.email },
    });
  } catch {
    sendJson(response, 500, { error: 'Не удалось выполнить вход' });
  }
}

export function registrationApiPlugin(): Plugin {
  const register = (server: ViteDevServer | PreviewServer): void => {
    server.middlewares.use((request, response, next) => {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
      const isRegister = pathname === '/api/register' || pathname === '/WebSchool/api/register';
      const isLogin = pathname === '/api/login' || pathname === '/WebSchool/api/login';
      if (!isRegister && !isLogin) {
        next();
        return;
      }

      void (isLogin
        ? handleLogin(request, response)
        : handleRegistration(request, response));
    });
  };

  return {
    name: 'registration-api',
    configureServer: register,
    configurePreviewServer: register,
  };
}
