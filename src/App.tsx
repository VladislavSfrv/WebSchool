import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { LoginModal } from "./components/LoginModal";
import { RegistrationModal } from "./components/RegistrationModal";
import { Sidebar } from "./components/Sidebar";
import { clearAuthUser, loadAuthUser, saveAuthUser, type AuthUser } from "./lib/authSession";
import { LandingPage } from "./pages/LandingPage";
import { MainPage } from "./pages/MainPage";

function App() {
    const [user, setUser] = useState<AuthUser | null>(() => loadAuthUser());
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = user !== null;
    const isWorkspace = location.pathname === "/workspace";

    const handleAuthenticationSuccess = (authenticatedUser: AuthUser) => {
        saveAuthUser(authenticatedUser);
        setUser(authenticatedUser);
        setIsRegistrationOpen(false);
        setIsLoginOpen(false);
    };

    const openLogin = () => {
        setIsRegistrationOpen(false);
        setIsLoginOpen(true);
    };

    const openRegistration = () => {
        setIsLoginOpen(false);
        setIsRegistrationOpen(true);
    };

    const handleLogout = () => {
        clearAuthUser();
        setUser(null);
        navigate("/");
    };

    return (
        <main className={styles.app_shell}>
            {isAuthenticated && isWorkspace && <Sidebar user={user} onLogout={handleLogout} />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            onRegister={openRegistration}
                            onLogin={openLogin}
                            user={user ?? undefined}
                            onOpenWorkspace={() => navigate("/workspace")}
                            onLogout={handleLogout}
                        />
                    }
                />
                <Route
                    path="/workspace"
                    element={
                        isAuthenticated ? (
                            <MainPage user={user} onLogout={handleLogout} />
                        ) : (
                            <LandingPage onRegister={openRegistration} onLogin={openLogin} />
                        )
                    }
                />
            </Routes>
            {isRegistrationOpen && (
                <RegistrationModal
                    onClose={() => setIsRegistrationOpen(false)}
                    onLogin={openLogin}
                    onSuccess={handleAuthenticationSuccess}
                />
            )}
            {isLoginOpen && (
                <LoginModal
                    onClose={() => setIsLoginOpen(false)}
                    onRegister={openRegistration}
                    onSuccess={handleAuthenticationSuccess}
                />
            )}
        </main>
    );
}

export default App;
