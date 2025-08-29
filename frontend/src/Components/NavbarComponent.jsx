import { useState } from 'react';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Palette } from 'lucide-react';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (isAuthenticated) {
            logout();
        }
    };

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    const handleLogin = () => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleUserProfile = () => {
        navigate('/editor');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const navigationItems = [
        { name: 'AI Image Generator', href: '/generate' },
        { name: 'Image Editor', href: '/editor' },
        { name: 'About', href: '/contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogoClick}
                        className="flex items-center space-x-2 bg-transparent border-none cursor-pointer"
                    >
                        <Palette className="h-8 w-8 text-green-600" />
                        <span className="text-xl font-bold text-green-600">CanvasCraft</span>
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <motion.button
                                onClick={() => navigate(item.href)}
                                key={item.name}
                                href={item.href}
                                whileHover={{ scale: 1.1, color: '#059669' }}
                                className="text-black hover:text-green-600 transition-colors font-medium"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleProfileClick}
                                    className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                    title="Go to Profile"
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {user?.username || user?.email?.split('@')[0] || 'User'}
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogin}
                                    className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSignUp}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Sign Up
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
                        {navigationItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                whileHover={{ x: 5 }}
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-3 py-2 text-black hover:text-green-600 bg-transparent border-none font-medium rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {item.name}
                            </motion.a>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="pt-4 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            handleUserProfile();
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        <UserCircleIcon className="h-5 w-5" />
                                        <span>Go to Editor ({user?.username || user?.email?.split('@')[0] || 'User'})</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Logout
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            handleLogin();
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        Login
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            handleSignUp();
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Sign Up
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.header>
    );
}

export default Navbar;