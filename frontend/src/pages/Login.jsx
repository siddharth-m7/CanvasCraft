import { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, isAuthenticated } = useAuthStore();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await login(form.email, form.password);
            setError("");
            setLoading(false);
            setSuccess(true);
            navigate("/editor");
        } catch (err) {
            setLoading(false);
            setSuccess(false);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
        >
            <h2 className="text-xl font-bold text-center">Login</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {loading && <p className="text-blue-500 text-sm">Loading...</p>}
            {success && <p className="text-green-500 text-sm">login successful! Redirecting...</p>}

            <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            />

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
            Login
            </button>
        </form>
        </div>
    );
}
