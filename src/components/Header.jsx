import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if we are on the Home page
    const isHome = location.pathname === '/';

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

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    const handleScroll = (id) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isActive = (path) => location.pathname === path ? "text-[#d97706]" : "text-white/90 hover:text-[#d97706]";

    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "100vh",
            transition: { staggerChildren: 0.1, duration: 0.3 }
        },
        exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome
                    ? "bg-[#1c1c1c] md:bg-[#1c1c1c]/90 md:backdrop-blur-md py-4 shadow-lg"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
                <Link to="/" className="flex items-center gap-3 group z-50">
                    <div className="flex flex-col border-l-2 border-[#d97706] pl-3 py-1">
                        <h1 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight tracking-wider">
                            R.P. GOYAL <span className="text-[#d97706]">&</span> SON'S
                        </h1>
                        <span className="text-[10px] md:text-xs font-sans font-medium tracking-[0.4em] text-white/50 uppercase">
                            Pvt. Ltd.
                        </span>
                    </div>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    <Link to="/" className={`transition-colors ${isActive('/')}`}>Home</Link>
                    <button onClick={() => handleScroll('divisions')} className="text-white/90 hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer">
                        Divisions
                    </button>
                    <button onClick={() => handleScroll('atelier')} className="text-white/90 hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer">
                        Materials
                    </button>
                    <Link to="/calculator" className={`transition-colors ${isActive('/calculator')}`}>CBM Calculator</Link>
                    <Link to="/gallery" className={`transition-colors ${isActive('/gallery')}`}>Gallery</Link>
                    <Link to="/contact" className={`transition-colors ${isActive('/contact')}`}>Contact</Link>

                    <button
                        onClick={toggleTheme}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} className="text-white" /> : <Sun size={18} className="text-[#d97706]" />}
                    </button>
                </nav>

                <div className="md:hidden flex items-center gap-4 z-50">
                    <button onClick={toggleTheme} className="text-white" aria-label="Toggle theme">
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-[#d97706]" />}
                    </button>

                    <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="md:hidden fixed top-0 left-0 w-full bg-[#1c1c1c] overflow-hidden z-40"
                    >
                        <div className="flex flex-col p-6 pt-28 gap-8 text-white text-2xl font-serif text-center">
                            <motion.div variants={itemVariants}>
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <button onClick={() => handleScroll('divisions')} className="hover:text-[#d97706]">Divisions</button>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <button onClick={() => handleScroll('atelier')} className="hover:text-[#d97706]">Materials</button>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d97706]">CBM Calculator</Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d97706]">Gallery</Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;