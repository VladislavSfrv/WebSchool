import { useState, type FormEvent } from "react";
import { ArrowUpRight, Eye, EyeOff, X } from "lucide-react";
import * as yup from "yup";
import type { AuthUser } from "../../lib/authSession";
import { loginSchema, type LoginErrors, type LoginValues } from "../../lib/registrationSchema";
import styles from "../RegistrationModal/registrationModal.module.css";

type LoginModalProps = {
  onClose: () => void;
  onRegister: () => void;
  onSuccess: (user: AuthUser) => void;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export function LoginModal({ onClose, onRegister, onSuccess }: LoginModalProps) {
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof LoginValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    try {
      await loginSchema.validate(values, { abortEarly: false });
      setErrors({});
      setIsSaving(true);

      const response = await fetch(`${import.meta.env.BASE_URL}api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json() as { error?: string; user?: AuthUser };

      if (!response.ok || !result.user) {
        throw new Error(result.error ?? "Не удалось войти");
      }

      onSuccess(result.user);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: LoginErrors = {};
        error.inner.forEach((validationError) => {
          if (validationError.path) {
            nextErrors[validationError.path as keyof LoginValues] = validationError.message;
          }
        });
        setErrors(nextErrors);
      } else {
        setSubmitError(error instanceof Error ? error.message : "Не удалось войти");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className={styles.modal_backdrop}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className={styles.registration_modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          className={styles.modal_close}
          type="button"
          onClick={onClose}
          aria-label="Закрыть вход"
        >
          <X size={18} />
        </button>
        <div className={styles.modal_intro}>
          <span className={styles.modal_mark}>/</span>
          <p className="eyebrow">CODEFOLK · КАБИНЕТ</p>
          <h2 id="login-title">
            С возвращением
            <br />
            <em>в команду.</em>
          </h2>
          <p>Продолжай обучение там, где остановился.</p>
        </div>
        <form className={styles.registration_form} onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
            {errors.email && <span className={styles.field_error} id="login-email-error">{errors.email}</span>}
          </label>
          <label>
            Пароль
            <span className={styles.password_field}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={(event) => updateField("password", event.target.value)}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
              />
              <button
                type="button"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
            {errors.password && <span className={styles.field_error} id="login-password-error">{errors.password}</span>}
          </label>
          {submitError && <p className={styles.submit_error} role="alert">{submitError}</p>}
          <button className={styles.submit_button} type="submit" disabled={isSaving}>
            {isSaving ? "Входим…" : "Войти в кабинет"} <ArrowUpRight size={17} />
          </button>
          <p className={styles.login_hint}>
            Ещё нет аккаунта?{" "}
            <button type="button" onClick={onRegister}>
              Создать аккаунт
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}