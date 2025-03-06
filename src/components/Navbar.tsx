import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogin = () => {
        navigate('/signin');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/signin');
        console.log("User logged out");
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex items-center'
                    >
                        <Code2 className="h-8 w-8 text-primary-600" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">TaskFlow</span>
                    </motion.div>

                    <div className='hidden md:flex items-center space-x-4'>
                        {isLoggedIn ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                                onClick={handleLogout}
                            >
                                Logout
                            </motion.button>
                        ) : (
                            <>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900"
                                >
                                    Features
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900"
                                >
                                    About
                                </motion.a>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-lg text-primary-600 hover:text-primary-700"
                                    onClick={handleLogin}
                                >
                                    Log In
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};