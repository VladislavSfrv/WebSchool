import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import type { AuthUser } from "../../lib/authSession";
import styles from "./dashboardIntro.module.css";

type DashboardIntroProps = {
  user: AuthUser;
};

export function DashboardIntro({ user }: DashboardIntroProps) {
  const firstName = user.fullName.trim().split(/\s+/)[0];
  return (
    <div className={styles.dashboard} id="dashboard">
      <section className={styles.welcome_block}>
        <p className="eyebrow">СРЕДА, 24 СЕНТЯБРЯ</p>
        <h1>
          Привет, {firstName}<span className={styles.sun}>✳</span>
        </h1>
        <p className={styles.welcome_copy}>
          Продолжим превращать идеи
          <br />в работающий код?
        </p>
        <button className={styles.primary_button}>
          Открыть последний урок <ArrowUpRight size={17} />
        </button>
      </section>
      <aside className={styles.streak_card}>
        <div className={styles.streak_top}>
          <span className={styles.streak_icon}>
            <Sparkles size={18} />
          </span>
          <span>ТЕКУЩАЯ СЕРИЯ</span>
        </div>
        <div className={styles.streak_number}>
          12 <small>дней</small>
        </div>
        <div className={styles.week_dots}>
          {["П", "В", "С", "Ч", "П", "С", "В"].map((day, index) => (
            <div
              className={
                index < 5 ? `${styles.day} ${styles.done}` : index === 5 ? `${styles.day} ${styles.today}` : styles.day
              }
              key={day + index}
            >
              <span>{index < 5 ? <Check size={11} /> : ""}</span>
              <small>{day}</small>
            </div>
          ))}
        </div>
        <p>
          На 3 дня больше, чем
          <br />в прошлый раз. Так держать!
        </p>
      </aside>
    </div>
  );
}
