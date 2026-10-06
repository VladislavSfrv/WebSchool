import { BookOpen, LayoutDashboard, LogOut, Users } from "lucide-react";
import styles from './sidebar.module.css'
import { NavLink } from "react-router-dom";
import { routes } from "../../lib/constants";
import type { AuthUser } from "../../lib/authSession";

type SidebarProps = {
  user: AuthUser;
  onLogout: () => void;
};

export function Sidebar({ user, onLogout }: SidebarProps) {
  const initials = user.fullName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <aside className={styles.sidebar}>
      <a className={styles.brand} href="#top">
        <span className={styles.brand_mark}>/</span>codefolk
      </a>
      <div className={styles.sidebar_label}>Рабочее место</div>
      <nav className={styles.main_nav} aria-label="Основная навигация">
        <NavLink to={routes.main} className={({ isActive }) => `${styles.nav_item} ${isActive ? styles.active : ''}`}>
          <LayoutDashboard size={17} /> Обзор <span className={styles.nav_dot} />
        </NavLink>
        <NavLink to={routes.profile} className={({ isActive }) => `${styles.nav_item} ${isActive ? styles.active : ''}`}>
          <BookOpen size={17} /> Мои курсы
        </NavLink>
        <NavLink to={routes.community} className={({ isActive }) => `${styles.nav_item} ${isActive ? styles.active : ''}`}>
          <Users size={17} /> Сообщество
        </NavLink>
      </nav>
      <div className={`${styles.sidebar_label} ${styles.progress_label}`}>Твой прогресс</div>
      <div className={styles.sidebar_progress}>
        <div className={styles.progress_ring}>
          <strong>42%</strong>
          <span>на пути</span>
        </div>
        <p>
          Не останавливайся.
          <br />
          Маленькие шаги работают.
        </p>
      </div>
      <div className={styles.sidebar_bottom}>
        <span className={styles.avatar}>{initials}</span>
        <span className={styles.user_details}>
          <strong>{user.fullName}</strong>
          <small>{user.email}</small>
        </span>
        <button className={styles.logout_button} type="button" onClick={onLogout} aria-label="Выйти">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
