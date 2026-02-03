import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PenSquare, User } from 'lucide-react';

import logo from '../assets/logo.png';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <img src={logo} alt="InkFlow Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">
                                InkFlow
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        {currentUser ? (
                            <>
                                <Link
                                    to="/create-post"
                                    className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
                                >
                                    <PenSquare className="h-4 w-4 mr-2" />
                                    Write Story
                                </Link>
                                <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                    <User className="h-4 w-4 mr-2 text-primary-500" />
                                    <span className="hidden sm:block text-gray-900">{currentUser.email?.split('@')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-primary-600 font-medium px-4 py-2 rounded-lg transition-colors hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="ml-4 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg transition-all hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
