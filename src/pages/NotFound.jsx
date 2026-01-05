import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
    return (
        <div className="bg-[#f9f8f4] dark:bg-[#0f172a] min-h-screen font-sans flex flex-col justify-between transition-colors duration-500">
            <Header />

            <div className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="text-center max-w-lg mx-auto">
                    {/* Animated Icon */}
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-block p-6 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-8"
                    >
                        <AlertTriangle size={64} className="text-[#d97706]" />
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Lost in the Woods?
                    </h2>

                    <p className="text-gray-600 dark:text-slate-400 mb-10 leading-relaxed">
                        The page you are looking for seems to have been chopped down.
                        Let's get you back to the main yard.
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-all duration-300"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;