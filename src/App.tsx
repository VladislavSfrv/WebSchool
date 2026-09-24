import { useState } from "react";
import styles from "./App.module.css";
import { RegistrationModal } from "./components/RegistrationModal";
import { Sidebar } from "./components/Sidebar";
import { MainPage } from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    return (
        <main className={styles.app_shell}>
            <Sidebar />
            <Routes>
                <Route path="/" element={<MainPage setIsRegistrationOpen={setIsRegistrationOpen} />} />
            </Routes>
            {isRegistrationOpen && (
                <RegistrationModal onClose={() => setIsRegistrationOpen(false)} />
            )}
        </main>
    );
}

export default App;
