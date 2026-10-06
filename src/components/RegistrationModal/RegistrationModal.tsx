import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Eye, EyeOff, X } from "lucide-react";
import * as yup from "yup";
import type { AuthUser } from "../../lib/authSession";
import { registrationSchema, type RegistrationErrors, type RegistrationValues } from "../../lib/registrationSchema";
import styles from "./registrationModal.module.css";

type RegistrationModalProps = {
  onClose: () => void;
  onLogin: () => void;
  onSuccess?: (user: AuthUser) => void;
};

const initialValues: RegistrationValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegistrationModal({ onClose, onLogin, onSuccess }: RegistrationModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<AuthUser | null>(null);
  const [values, setValues] = useState<RegistrationValues>(initialValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof RegistrationValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    try {
      await registrationSchema.validate(values, { abortEarly: false });
      setErrors({});
      setIsSaving(true);

      const response = await fetch(`${import.meta.env.BASE_URL}api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });
      const result = await response.json() as { error?: string; user?: AuthUser };

      if (!response.ok || !result.user) {
        throw new Error(result.error ?? "Не удалось зарегистрироваться");
      }

      setRegisteredUser(result.user);
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: RegistrationErrors = {};
        error.inner.forEach((validationError) => {
          if (validationError.path) {
            nextErrors[validationError.path as keyof RegistrationValues] = validationError.message;
          }
        });
        setErrors(nextErrors);
      } else {
        setSubmitError(error instanceof Error ? error.message : "Не удалось зарегистрироваться");
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
        aria-labelledby="registration-title"
      >
        <button
          className={styles.modal_close}
          type="button"
          onClick={onClose}
          aria-label="Закрыть регистрацию"
        >
          <X size={18} />
        </button>
        {isSubmitted ? (
          <div className={styles.success_state}>
            <span className={styles.success_icon}>
              <Check size={22} />
            </span>
            <p className="eyebrow">ПОЧТИ ГОТОВО</p>
            <h2>
              Проверь свою
              <br />
              почту
            </h2>
            <p>Мы отправили письмо с подтверждением на указанный адрес.</p>
            <button
              className={styles.primary_button}
              type="button"
              onClick={() => {
                if (registeredUser) onSuccess?.(registeredUser);
                onClose();
              }}
            >
              Вернуться в кабинет <ArrowUpRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className={styles.modal_intro}>
              <span className={styles.modal_mark}>/</span>
              <p className="eyebrow">НОВЫЙ ШАГ</p>
              <h2 id="registration-title">
                Начни создавать
                <br />
                <em>своё.</em>
              </h2>
              <p>
                Практика, сообщество и путь
                <br />
                от идеи до работающего продукта.
              </p>
            </div>
            <form className={styles.registration_form} onSubmit={handleSubmit} noValidate>
              <label>
                Имя и фамилия
                <input
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Алексей К."
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && <span className={styles.field_error} id="fullName-error">{errors.fullName}</span>}
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span className={styles.field_error} id="email-error">{errors.email}</span>}
              </label>
              <label>
                Пароль
                <span className={styles.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={(event) => updateField("password", event.target.value)}
                    placeholder="Минимум 8 символов"
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
                {errors.password && <span className={styles.field_error} id="password-error">{errors.password}</span>}
              </label>
              <label>
                Подтвердите пароль
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  placeholder="Введите пароль повторно"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                {errors.confirmPassword && <span className={styles.field_error} id="confirmPassword-error">{errors.confirmPassword}</span>}
              </label>
              <label className="agreement">
                <input type="checkbox" required />
                <span>
                  Я принимаю <a href="#terms">условия использования</a> и
                  политику конфиденциальности
                </span>
              </label>
              {submitError && <p className={styles.submit_error} role="alert">{submitError}</p>}
              <button className={styles.submit_button} type="submit" disabled={isSaving}>
                {isSaving ? "Создаём аккаунт…" : "Создать аккаунт"} <ArrowUpRight size={17} />
              </button>
              <p className={styles.login_hint}>
                Уже есть аккаунт?{" "}
                <button type="button" onClick={onLogin}>
                  Войти
                </button>
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
