import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen flex flex-col font-sans transition-colors duration-500">
            <Header />

            <div className="flex-grow flex items-center justify-center px-6 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-lg"
                >
                    <div className="inline-block p-6 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
                        <AlertTriangle size={64} className="text-red-500 dark:text-red-400" />
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-300 mb-4">Page Not Found</h2>
                    <p className="text-gray-500 dark:text-slate-400 mb-8">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded hover:bg-[#d97706] transition-colors"
                    >
                        Back Home
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;