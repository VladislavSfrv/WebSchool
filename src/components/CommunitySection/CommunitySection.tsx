import { Code2 } from "lucide-react";
import styles from './communitySection.module.css';

export function CommunitySection() {
  return (
    <>
      <section className={styles.bottom_grid} id="community">
        <div className={styles.quote_panel}>
          <span className={styles.quote_mark}>“</span>
          <p>
            Хороший код — это не тот, который работает.
            <br />
            <em>Это тот, который легко изменить.</em>
          </p>
          <span className="quote-author">— Мартин Фаулер</span>
        </div>
        <div className={styles.next_panel}>
          <div>
            <p className="eyebrow">СЛЕДУЮЩАЯ ЦЕЛЬ</p>
            <h3>
              Собери свой первый
              <br />
              пет-проект
            </h3>
          </div>
          <div className={styles.mini_code}>
            <Code2 size={17} />
            <span>
              build something
              <br />
              <strong>you care about.</strong>
            </span>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <span>codefolk / 2026</span>
        <span>Сделано для тех, кто создаёт</span>
      </footer>
    </>
  );
}
