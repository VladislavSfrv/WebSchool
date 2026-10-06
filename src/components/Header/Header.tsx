import { Search, UserRound } from "lucide-react";
import styles from "./header.module.css";

type HeaderProps = {
  onLogout: () => void;
};

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.breadcrumb}>Рабочее место <span>/</span> Обзор</div>
      <div className={styles.top_actions}>
        <button className={styles.icon_button} aria-label="Поиск"><Search size={18} /></button>
        <button className={styles.register_trigger} type="button" onClick={onLogout}><UserRound size={15} /> Выйти</button>
        <span className={styles.online_dot} /> <span className={styles.online_text}>Онлайн</span>
      </div>
    </header>
  );
}
