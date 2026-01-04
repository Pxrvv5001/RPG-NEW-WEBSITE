import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // <--- 1. Import Framer Motion

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // --- THEME LOGIC ---
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "light";
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // --- SCROLL LOGIC ---
    const handleScroll = (id) => {
        setIsMobileMenuOpen(false);

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-[#1c1c1c] md:bg-[#1c1c1c]/90 md:backdrop-blur-md py-4 shadow-lg"
                    : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold text-white tracking-widest">
                    R.P. GOYAL <span className="text-[#d97706]">&</span> SONS
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-white/90">
                    <Link to="/" className="hover:text-[#d97706] transition-colors">Home</Link>

                    <button onClick={() => handleScroll('divisions')} className="hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer">
                        Divisions
                    </button>
                    <button onClick={() => handleScroll('atelier')} className="hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer">
                        Materials
                    </button>

                    {/* NEW GALLERY LINK */}
                    <Link to="/gallery" className="hover:text-[#d97706] transition-colors">Gallery</Link>

                    <Link to="/contact" className="hover:text-[#d97706] transition-colors">Contact</Link>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-[#d97706]" />}
                    </button>
                </nav>

                {/* Mobile Actions */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleTheme} className="text-white">
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-[#d97706]" />}
                    </button>

                    <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu /> }
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown with Animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden absolute top-full left-0 w-full bg-[#1c1c1c] border-t border-gray-800 shadow-xl"
                    >
                        <div className="flex flex-col p-6 gap-4 text-white">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                            <button onClick={() => handleScroll('divisions')} className="text-left hover:text-[#d97706]">Divisions</button>
                            <button onClick={() => handleScroll('atelier')} className="text-left hover:text-[#d97706]">Materials</button>

                            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-left hover:text-[#d97706]">Gallery</Link>

                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;