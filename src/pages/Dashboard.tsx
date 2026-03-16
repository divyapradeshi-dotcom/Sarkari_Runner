import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const logout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

            <p className="text-gray-600 mb-6">
                Welcome to Sarkari Runner Admin Portal
            </p>

            <button
                onClick={logout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
            >
                Logout
            </button>
        </div>
    );
}