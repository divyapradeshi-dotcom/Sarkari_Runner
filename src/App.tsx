// src/App.tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import Home from "./pages/Dashboard.tsx";

function App() {
    return (
        <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 */}
            <Route
                path="*"
                element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="text-center p-8">
                            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                            <p className="text-2xl mb-6">Page Not Found</p>

                            <a
                                href="/login"
                                className="text-blue-600 hover:underline text-xl"
                            >
                                Go to Login →
                            </a>
                        </div>
                    </div>
                }
            />

        </Routes>
    );
}

export default App;