import { useState } from "react";
import styles from "./App.module.css";
import { RegistrationModal } from "./components/RegistrationModal";
import { Sidebar } from "./components/Sidebar";
import { LandingPage } from "./pages/LandingPage";
import { MainPage } from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsAuthenticated(true);
        setIsRegistrationOpen(false);
    };

    return (
        <main className={styles.app_shell}>
            {isAuthenticated && <Sidebar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <MainPage setIsRegistrationOpen={setIsRegistrationOpen} />
                        ) : (
                            <LandingPage onRegister={() => setIsRegistrationOpen(true)} />
                        )
                    }
                />
                <Route
                    path="/workspace"
                    element={
                        isAuthenticated ? (
                            <MainPage setIsRegistrationOpen={setIsRegistrationOpen} />
                        ) : (
                            <LandingPage onRegister={() => setIsRegistrationOpen(true)} />
                        )
                    }
                />
            </Routes>
            {isRegistrationOpen && (
                <RegistrationModal
                    onClose={() => setIsRegistrationOpen(false)}
                    onSuccess={handleRegistrationSuccess}
                />
            )}
        </main>
    );
}

export default App;
