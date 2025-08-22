import { useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Palette, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const { login, isAuthenticated } = useAuthStore();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    // Background animation variants
    const backgroundShapes = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 200 + 50,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {backgroundShapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        className="absolute rounded-full bg-gradient-to-r from-green-200/20 to-emerald-300/20 blur-xl"
                        style={{
                            width: shape.size,
                            height: shape.size,
                        }}
                        initial={{
                            x: shape.initialX,
                            y: shape.initialY,
                        }}
                        animate={{
                            x: [shape.initialX, Math.random() * window.innerWidth],
                            y: [shape.initialY, Math.random() * window.innerHeight],
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Floating decorative elements */}
            <motion.div
                className="absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full opacity-60"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-40 right-32 w-3 h-3 bg-emerald-500 rounded-full opacity-50"
                animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />
            <motion.div
                className="absolute bottom-32 left-40 w-5 h-5 bg-green-300 rounded-full opacity-40"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-100/50 p-8 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 relative"
                        >
                            <Palette className="h-8 w-8 text-white" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{ zIndex: -1 }}
                            />
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
                        >
                            Welcome Back
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 text-sm"
                        >
                            Please sign in to continue to CanvasCraft
                        </motion.p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error/Success Messages */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                        
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                            >
                                Login successful! Redirecting...
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full mr-2"
                                />
                                Signing you in...
                            </motion.div>
                        )}

                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Signing In...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Sign Up Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-center pt-4 border-t border-gray-100"
                        >
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate('/signup')}
                                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                                >
                                    Sign up here
                                </button>
                            </p>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}