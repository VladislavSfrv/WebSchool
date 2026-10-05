import { ArrowRight, CheckCircle2, Play, Sparkles, Star, Users } from 'lucide-react';
import styles from './landingPage.module.css';

interface LandingPageProps {
  onRegister: () => void;
}

const stats = [
  { value: '12k+', label: 'учеников' },
  { value: '4.9', label: 'средний рейтинг' },
  { value: '92%', label: 'достигают цели' },
];

const benefits = [
  'Реальные проекты для портфолио',
  'Проверяемые домашки и фидбек',
  'Комьюнити с единомышленниками',
];

const roadmap = [
  { step: '01', title: 'Фундамент', text: 'HTML, CSS, JavaScript и архитектура интерфейсов.' },
  { step: '02', title: 'React', text: 'Компоненты, состояние, маршрутизация и работа с данными.' },
  { step: '03', title: 'Портфолио', text: 'Собираете проекты, которые можно показать работодателю.' },
];

const programs = [
  { title: 'Frontend Start', tag: 'для новичков', text: 'С нуля освоите верстку, UX и базовый JavaScript.', accent: 'lime' },
  { title: 'React Pro', tag: 'средний уровень', text: 'Погрузитесь в компоненты, hooks, API и production-ready архитектуру.', accent: 'orange' },
  { title: 'Career Boost', tag: 'продвинутый', text: 'Подготовка к собеседованию и разработка сильного портфолио.', accent: 'sky' },
];

export function LandingPage({ onRegister }: LandingPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>/</span>
          codefolk
        </div>
        <nav className={styles.nav} aria-label="Главная навигация">
          <a href="#programs">Программа</a>
          <a href="#benefits">Преимущества</a>
          <a href="#reviews">Отзывы</a>
        </nav>
        <button type="button" className={styles.primaryAction} onClick={onRegister}>
          Начать бесплатно
        </button>
      </header>

      <main className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">FRONTEND ШКОЛА</p>
          <h1>
            Создавай интерфейсы,
            <span> которые хочется открывать снова.</span>
          </h1>
          <p className={styles.lead}>
            Обучение для тех, кто хочет быстро войти в web-разработку, строить понятные
            интерфейсы и создавать продукты, которые реально ценят.
          </p>

          <div className={styles.actions}>
            <button type="button" className={styles.primaryAction} onClick={onRegister}>
              Записаться на курс <ArrowRight size={18} />
            </button>
            <button type="button" className={styles.secondaryAction}>
              <Play size={15} /> Смотреть программу
            </button>
          </div>

          <ul className={styles.benefitsList}>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <CheckCircle2 size={17} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroCard} aria-label="Панель продукта">
          <div className={styles.cardHeader}>
            <div>
              <p className="eyebrow">СКОРОСТЬ ОБУЧЕНИЯ</p>
              <strong>8 месяцев</strong>
            </div>
            <span className={styles.badge}>Live</span>
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.previewTop}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewColumn}>
                <span className={styles.previewPill}>UI / UX</span>
                <div className={styles.previewBox} />
                <div className={styles.previewLine} />
                <div className={styles.previewLineShort} />
              </div>
              <div className={styles.previewMetric}>
                <Sparkles size={16} />
                <div>
                  <strong>+14%</strong>
                  <span>прогресс</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.metricsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.metricItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <section className={styles.metricsStrip} id="benefits">
        <div>
          <Users size={18} />
          <span>Комьюнити 24/7</span>
        </div>
        <div>
          <Star size={18} />
          <span>Реальные отзывы</span>
        </div>
        <div>
          <Sparkles size={18} />
          <span>Путь от идеи до продукта</span>
        </div>
      </section>

      <section className={styles.section} id="programs">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">ПРОГРАММА</p>
          <h2>Построим твою карьеру в продуктивном темпе.</h2>
        </div>

        <div className={styles.programGrid}>
          {programs.map((program) => (
            <article key={program.title} className={`${styles.programCard} ${styles[program.accent]}`}>
              <span className={styles.courseTag}>{program.tag}</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <button type="button" className={styles.textButton} onClick={onRegister}>
                Узнать детали <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">КАК ПРОХОДИТ ОБУЧЕНИЕ</p>
          <h2>Практика, поддержка и ясная структура.</h2>
        </div>

        <div className={styles.stepsGrid}>
          {roadmap.map((step) => (
            <article key={step.step} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.reviewSection} id="reviews">
        <div className={styles.reviewCard}>
          <p className="eyebrow">ОТЗЫВЫ</p>
          <h2>«Мне хватило двух месяцев, чтобы перейти от верстки по макетам к работе над своими проектами.»</h2>
          <div className={styles.reviewer}>
            <span className={styles.avatar}>АН</span>
            <div>
              <strong>Анастасия Н.</strong>
              <small>Frontend Developer</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div>
          <p className="eyebrow">Готов начать?</p>
          <h2>Выбери свой путь и начни уже сегодня.</h2>
        </div>
        <button type="button" className={styles.primaryAction} onClick={onRegister}>
          Создать аккаунт <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
