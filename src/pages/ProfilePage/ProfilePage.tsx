import { ArrowRight, BookOpen, CalendarRange, CheckCircle2, Clock3, Play } from 'lucide-react';
import type { AuthUser } from '../../lib/authSession';
import styles from './profilePage.module.css';

interface ProfilePageProps {
  user: AuthUser;
  onLogout: () => void;
}

const courses = [
  {
    title: 'React с нуля',
    track: 'Frontend Start',
    progress: 72,
    duration: '6 недель',
    lessonsDone: 24,
    totalLessons: 32,
    nextLesson: 'Компоненты и state',
    color: 'lime',
    icon: '⚛',
  },
  {
    title: 'JavaScript глубоко',
    track: 'Продвинутый блок',
    progress: 48,
    duration: '8 недель',
    lessonsDone: 19,
    totalLessons: 40,
    nextLesson: 'Асинхронность и API',
    color: 'sky',
    icon: 'JS',
  },
  {
    title: 'Дизайн-системы',
    track: 'UI / UX',
    progress: 28,
    duration: '4 недели',
    lessonsDone: 7,
    totalLessons: 21,
    nextLesson: 'Tokens и компоненты',
    color: 'coral',
    icon: '✦',
  },
];

export function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const firstName = user.fullName.trim().split(/\s+/)[0];

  return (
    <section className={styles.content} id="top">
      <header className={styles.topbar}>
        <div className={styles.breadcrumb}>Рабочее место <span>/</span> Мои курсы</div>
        <button type="button" className={styles.logoutButton} onClick={onLogout}>
          Выйти
        </button>
      </header>

      <div className={styles.hero}>
        <div>
          <p className="eyebrow">ТВОЯ ТЕРАПИЯ К ОБУЧЕНИЮ</p>
          <h1>Привет, {firstName}. <span>Твои курсы на пути к цели.</span></h1>
        </div>
        <div className={styles.summaryPanel}>
          <div>
            <span>Завершено</span>
            <strong>3 курса</strong>
          </div>
          <div>
            <span>Сейчас в работе</span>
            <strong>2 курса</strong>
          </div>
          <div>
            <span>Следующий урок</span>
            <strong>Сегодня</strong>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <button type="button" className={`${styles.filter} ${styles.active}`}>Все курсы</button>
          <button type="button" className={styles.filter}>В процессе</button>
          <button type="button" className={styles.filter}>Запланировано</button>
        </div>
        <div className={styles.stats}>
          <span><BookOpen size={14} /> 3 активных</span>
          <span><Clock3 size={14} /> 11ч 40м</span>
        </div>
      </div>

      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <article key={course.title} className={`${styles.courseCard} ${styles[course.color]}`}>
            <div className={styles.cardHeader}>
              <div className={styles.courseIcon}>{course.icon}</div>
              <button type="button" className={styles.goButton} aria-label={`Открыть ${course.title}`}>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.metaRow}>
                <span>{course.track}</span>
                <span>{course.duration}</span>
              </div>
              <h2>{course.title}</h2>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}>
                  <span style={{ width: `${course.progress}%` }} />
                </div>
                <strong>{course.progress}%</strong>
              </div>
              <div className={styles.lessonMeta}>
                <span>
                  <CheckCircle2 size={14} /> {course.lessonsDone}/{course.totalLessons} уроков
                </span>
                <span>
                  <Play size={14} /> {course.nextLesson}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.schedulePanel}>
        <div className={styles.scheduleHeader}>
          <div>
            <p className="eyebrow">ПЛАН НА НЕДЕЛЮ</p>
            <h3>Следующие занятия</h3>
          </div>
          <button type="button" className={styles.secondaryAction}>Смотреть всё</button>
        </div>

        <ul className={styles.timeline}>
          <li>
            <div className={styles.dayTag}>Пн</div>
            <div>
              <strong>React / Компоненты</strong>
              <span>Домашняя работа · 35 минут</span>
            </div>
          </li>
          <li>
            <div className={styles.dayTag}>Ср</div>
            <div>
              <strong>JavaScript / Асинхронность</strong>
              <span>Практика · 50 минут</span>
            </div>
          </li>
          <li>
            <div className={styles.dayTag}>Пт</div>
            <div>
              <strong>UI / Design tokens</strong>
              <span>Чекпоинт · 25 минут</span>
            </div>
          </li>
        </ul>

        <div className={styles.calendarNote}>
          <CalendarRange size={17} />
          <span>План обновлён на 3 мая</span>
        </div>
      </section>
    </section>
  );
}
