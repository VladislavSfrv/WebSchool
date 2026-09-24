import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Eye, EyeOff, X } from "lucide-react";
import styles from "./registrationModal.module.css";

type RegistrationModalProps = {
  onClose: () => void;
};

export function RegistrationModal({ onClose }: RegistrationModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
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
            <button className={styles.primary_button} type="button" onClick={onClose}>
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
            <form className={styles.registration_form} onSubmit={handleSubmit}>
              <label>
                Имя и фамилия
                <input
                  type="text"
                  name="name"
                  placeholder="Алексей К."
                  required
                  autoComplete="name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </label>
              <label>
                Пароль
                <span className={styles.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Минимум 8 символов"
                    minLength={8}
                    required
                    autoComplete="new-password"
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
              </label>
              <label className="agreement">
                <input type="checkbox" required />
                <span>
                  Я принимаю <a href="#terms">условия использования</a> и
                  политику конфиденциальности
                </span>
              </label>
              <button className={styles.submit_button} type="submit">
                Создать аккаунт <ArrowUpRight size={17} />
              </button>
              <p className={styles.login_hint}>
                Уже есть аккаунт?{" "}
                <button type="button" onClick={onClose}>
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
