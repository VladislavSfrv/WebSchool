import { ArrowUpRight, Search } from "lucide-react";
import type { Course } from "../../types";
import styles from "./courseSection.module.css";

type CourseSectionProps = {
  courses: Course[];
  activeFilter: string;
  filters: string[];
  query: string;
  onFilterChange: (filter: string) => void;
  onQueryChange: (query: string) => void;
};

export function CourseSection({
  courses,
  activeFilter,
  filters,
  query,
  onFilterChange,
  onQueryChange,
}: CourseSectionProps) {
  return (
    <section className={styles.course_section} id="courses">
      <div className={styles.section_heading}>
        <div>
          <p className="eyebrow">ТВОЯ ТРАЕКТОРИЯ</p>
          <h2>Курсы в фокусе</h2>
        </div>
        <a href="#all-courses" className={styles.text_link}>
          Все курсы <ArrowUpRight size={15} />
        </a>
      </div>
      <div className={styles.course_toolbar}>
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? `${styles.filter} ${styles.active}` : styles.filter}
              onClick={() => onFilterChange(filter)}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className={styles.search_field}>
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Найти курс"
          />
        </label>
      </div>
      <div className={styles.course_grid}>
        {courses.map((course) => (
          <article className={`${styles.course_card} ${styles[course.color]}`} key={course.title}>
            <div className={styles.course_icon}>{course.icon}</div>
            <div className={styles.course_content}>
              <div className={styles.course_meta}>
                <span>{course.type}</span>
                <span>{course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <div className={styles.course_progress}>
                <div className={styles.bar}>
                  <span style={{ width: `${course.progress}%` }} />
                </div>
                <strong>
                  {course.progress ? `${course.progress}%` : "Начать"}
                </strong>
              </div>
            </div>
            <button
              className={styles.round_arrow}
              aria-label={`Открыть курс ${course.title}`}
            >
              <ArrowUpRight size={18} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
