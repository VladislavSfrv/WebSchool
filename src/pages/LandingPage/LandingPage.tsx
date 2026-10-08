import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Play, Sparkles, Star, Users } from 'lucide-react';
import type { AuthUser } from '../../lib/authSession';
import styles from './landingPage.module.css';

interface LandingPageProps {
  onRegister: () => void;
  onLogin: () => void;
  user?: AuthUser;
  onOpenWorkspace?: () => void;
  onLogout?: () => void;
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

const courseRoadmaps = [
  {
    title: 'Frontend Start',
    duration: '8 недель',
    lessons: 32,
    modules: [
      { number: '01', title: 'Веб-основы', text: 'HTML, CSS, доступность и адаптивная верстка.', project: 'Сайт профиля' },
      { number: '02', title: 'JavaScript', text: 'Переменные, функции, DOM, события и асинхронность.', project: 'Тodo для командной строки' },
      { number: '03', title: 'UI и UX', text: 'Компоненты, цвета, типографика, фокус и пользовательские сценарии.', project: 'Интерфейс интернет-магазина' },
      { number: '04', title: 'Проект', text: 'Построите полноценное приложение и подготовьте его к демонстрации.', project: 'Собственный продукт' },
    ],
  },
  {
    title: 'React Pro',
    duration: '10 недель',
    lessons: 40,
    modules: [
      { number: '01', title: 'React в практике', text: 'Компоненты, JSX, props, состояние и lifecycle.', project: 'Дашборд задач' },
      { number: '02', title: 'Hooks и данные', text: 'useState, useEffect, useMemo, контекст и API.', project: 'Панель управления данными' },
      { number: '03', title: 'Маршрутизация', text: 'Маршруты, защищённые страницы и навигация.', project: 'Мультипагинный сайт' },
      { number: '04', title: 'Производство', text: 'Оптимизация, тесты, ошибки и подготовка к публике.', project: 'Портфолио-проект' },
    ],
  },
  {
    title: 'Career Boost',
    duration: '6 недель',
    lessons: 24,
    modules: [
      { number: '01', title: 'Навыки работодателя', text: 'Git, TypeScript, REST API и современные инструменты.', project: 'API-клиент' },
      { number: '02', title: 'Архитектура', text: 'Модульность, типы, состояние и масштабируемые интерфейсы.', project: 'Компонентная библиотека' },
      { number: '03', title: 'Тестирование', text: 'Unit, integration и E2E-тесты для реального продукта.', project: 'Тестируемое приложение' },
      { number: '04', title: 'Career package', text: 'Рефакторинг, резюме, представление проекта и собеседование.', project: 'Готовый к публике продукт' },
    ],
  },
];

const programs = [
  { title: 'Frontend Start', tag: 'для новичков', text: 'С нуля освоите верстку, UX и базовый JavaScript.', accent: 'lime' },
  { title: 'React Pro', tag: 'средний уровень', text: 'Погрузитесь в компоненты, hooks, API и production-ready архитектуру.', accent: 'orange' },
  { title: 'Career Boost', tag: 'продвинутый', text: 'Подготовка к собеседованию и разработка сильного портфолио.', accent: 'sky' },
];

const reviews = [
  {
    quote: 'Мне хватило двух месяцев, чтобы перейти от верстки по макетам к работе над своими проектами.',
    name: 'Анастасия Н.',
    role: 'Frontend Developer',
    initials: 'АН',
  },
  {
    quote: 'Курс дал понятную структуру, а проекты помогли собрать портфолио, которое действительно можно показать.',
    name: 'Дмитрий К.',
    role: 'Junior Frontend Developer',
    initials: 'ДК',
  },
  {
    quote: 'Спасибо за понятный фидбек. Я смог исправлять ошибки раньше и лучше понимать, как писать maintainable-код.',
    name: 'Мария С.',
    role: 'Product Designer',
    initials: 'МС',
  },
  {
    quote: 'После курса я могу confidently говорить о React, TypeScript и соблазне делать полноценные интерфейсы.',
    name: 'Николай П.',
    role: 'Frontend Engineer',
    initials: 'НП',
  },
];

export function LandingPage({ onRegister, onLogin, user, onOpenWorkspace, onLogout }: LandingPageProps) {
  const [selectedCourse, setSelectedCourse] = useState(courseRoadmaps[0].title);
  const [activeReview, setActiveReview] = useState(0);
  const activeRoadmap = courseRoadmaps.find((course) => course.title === selectedCourse) ?? courseRoadmaps[0];
  const review = reviews[activeReview];
  const firstName = user?.fullName.trim().split(/\s+/)[0];

  const showPreviousReview = () => {
    setActiveReview((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const showNextReview = () => {
    setActiveReview((current) => (current + 1) % reviews.length);
  };

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
        {user ? (
          <div className={styles.buttons}>
            <button type="button" className={styles.secondaryAction} onClick={onLogout}>
              Выйти
            </button>
            <button type="button" className={styles.primaryAction} onClick={onOpenWorkspace}>
              Мой кабинет
            </button>
          </div>
        ) : (
          <div className={styles.buttons}>
            <button type="button" className={styles.secondaryAction} onClick={onLogin}>
              Войти
            </button>
            <button type="button" className={styles.primaryAction} onClick={onRegister}>
              Начать бесплатно
            </button>
          </div>
        )}
      </header>

      <main className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">{user ? 'ТВОЙ ПУТЬ В CODEFOLK' : 'FRONTEND ШКОЛА'}</p>
          <h1>
            {user ? `Привет, ${firstName}.` : 'Создавай интерфейсы,'}
            <span>{user ? ' Продолжим учиться?' : ' которые хочется открывать снова.'}</span>
          </h1>
          <p className={styles.lead}>
            {user
              ? 'Твои курсы, новые навыки и проекты уже ждут. Продолжай в своём темпе.'
              : 'Обучение для тех, кто хочет быстро войти в web-разработку, строить понятные интерфейсы и создавать продукты, которые реально ценят.'}
          </p>

          <div className={styles.actions}>
            {user ? (
              <>
                <button type="button" className={styles.primaryAction} onClick={onOpenWorkspace}>
                  Продолжить обучение <ArrowRight size={18} />
                </button>
                <a className={styles.secondaryAction} href="#programs">
                  <Play size={15} /> Смотреть программу
                </a>
              </>
            ) : (
              <>
                <button type="button" className={styles.primaryAction} onClick={onRegister}>
                  Записаться на курс <ArrowRight size={18} />
                </button>
                <a className={styles.secondaryAction} href="#programs">
                  <Play size={15} /> Смотреть программу
                </a>
              </>
            )}
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
              <button
                type="button"
                className={styles.textButton}
                onClick={() => setSelectedCourse(program.title)}
                aria-pressed={selectedCourse === program.title}
              >
                {selectedCourse === program.title ? 'Показать roadmap' : 'Получить roadmap'} <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roadmapSection} id="roadmap">
        <div className={styles.roadmapIntro}>
          <p className="eyebrow">ROADMAP COURSE</p>
          <h2>Путь обучения: {activeRoadmap.title}</h2>
          <p>
            {activeRoadmap.duration} · {activeRoadmap.lessons} уроков · 4 этапа · итоговый проект
          </p>
        </div>

        <div className={styles.roadmapTrack}>
          {activeRoadmap.modules.map((module) => (
            <article key={module.number} className={styles.roadmapModule}>
              <div className={styles.moduleHeader}>
                <span>{module.number}</span>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.text}</p>
                </div>
              </div>
              <div className={styles.projectBlock}>
                <span>Итоговый проект</span>
                <strong>{module.project}</strong>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className={styles.primaryAction} onClick={onRegister}>
          Начать {activeRoadmap.title} <ArrowRight size={18} />
        </button>
      </section>

      <section className={styles.reviewSection} id="reviews">
        <div className={styles.reviewCard} aria-live="polite">
          <div className={styles.reviewHeader}>
            <p className="eyebrow">ОТЗЫВЫ</p>
            <span className={styles.reviewCount}>
              {activeReview + 1} / {reviews.length}
            </span>
          </div>
          <div className={styles.reviewContent} key={activeReview}>
            <h2>«{review.quote}»</h2>
            <div className={styles.reviewer}>
              <span className={styles.avatar}>{review.initials}</span>
              <div>
                <strong>{review.name}</strong>
                <small>{review.role}</small>
              </div>
            </div>
          </div>
          <div className={styles.reviewControls}>
            <div className={styles.reviewDots} aria-label="Выберите отзыв">
              {reviews.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  className={`${styles.reviewDot} ${index === activeReview ? styles.active : ''}`}
                  onClick={() => setActiveReview(index)}
                  aria-label={`Показать отзыв ${index + 1}`}
                  aria-current={index === activeReview ? 'true' : undefined}
                />
              ))}
            </div>
            <div className={styles.reviewArrows}>
              <button type="button" onClick={showPreviousReview} aria-label="Предыдущий отзыв">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={showNextReview} aria-label="Следующий отзыв">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div>
          <p className="eyebrow">Готов начать?</p>
          <h2>Выбери свой путь и начни уже сегодня.</h2>
        </div>
        <button
          type="button"
          className={styles.primaryAction}
          onClick={user ? onOpenWorkspace : onRegister}
        >
          {user ? 'Открыть кабинет' : 'Создать аккаунт'} <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
