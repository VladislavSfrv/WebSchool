import { useState } from 'react'
import { CommunitySection } from '../../components/CommunitySection'
import { CourseSection } from '../../components/CourseSection'
import { DashboardIntro } from '../../components/DashboardIntro'
import { Header } from '../../components/Header'
import type { Course } from '../../types'
import styles from './mainPage.module.css'

interface MainPageProps {
    setIsRegistrationOpen(isRegistrationOpen: boolean): void;
}

const courses: Course[] = [
    {
        title: "React с нуля",
        type: "Старт",
        duration: "6 недель",
        color: "lime",
        icon: "⚛",
        progress: 72,
    },
    {
        title: "Дизайн-системы",
        type: "Продолжение",
        duration: "4 недели",
        color: "coral",
        icon: "✦",
        progress: 28,
    },
    {
        title: "JavaScript глубоко",
        type: "Продолжение",
        duration: "8 недель",
        color: "sky",
        icon: "JS",
        progress: 0,
    },
];

export const MainPage = ({ setIsRegistrationOpen }: MainPageProps) => {
    const [activeFilter, setActiveFilter] = useState("Все курсы");
    const [query, setQuery] = useState("");
    const filters = ["Все курсы", "В процессе", "Для старта"];
    const visibleCourses = courses.filter((course) => {
        const matchesQuery = course.title
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
            activeFilter === "Все курсы" ||
            (activeFilter === "В процессе"
                ? course.progress > 0
                : course.progress === 0);
        return matchesQuery && matchesFilter;
    });
    return (
        <>
            <section className={styles.content} id="top">
                <Header onRegister={() => setIsRegistrationOpen(true)} />
                <DashboardIntro />
                <CourseSection
                    courses={visibleCourses}
                    activeFilter={activeFilter}
                    filters={filters}
                    query={query}
                    onFilterChange={setActiveFilter}
                    onQueryChange={setQuery}
                />
                <CommunitySection />
            </section>

        </>
    )
}
