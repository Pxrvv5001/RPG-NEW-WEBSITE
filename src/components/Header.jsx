import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- SMART THEME LOGIC ---
    const [theme, setTheme] = useState(() => {
        // 1. Check local storage first (User override)
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;

        // 2. If no save, check Device Settings
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        // 3. Default to light
        return "light";
    });

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle Theme Application
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

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    // Mobile: Solid Black (Fast) | Laptop: Glassy Blur (Premium)
                    ? "bg-[#1c1c1c] md:bg-[#1c1c1c]/90 md:backdrop-blur-md py-4 shadow-lg"
                    : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold text-white tracking-widest">
                    R.P. GOYAL <span className="text-[#d97706]">&</span> SONS
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-white/90">
                    <Link to="/" className="hover:text-[#d97706] transition-colors">Home</Link>
                    <a href="/#divisions" className="hover:text-[#d97706] transition-colors">Divisions</a>
                    <a href="/#atelier" className="hover:text-[#d97706] transition-colors">Materials</a>
                    <Link to="/contact" className="hover:text-[#d97706] transition-colors">Contact</Link>

                    {/* THEME TOGGLE BUTTON */}
                    <button
                        onClick={toggleTheme}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-[#d97706]" />}
                    </button>
                </nav>

                {/* Mobile Actions (Menu + Theme) */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleTheme} className="text-white">
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-[#d97706]" />}
                    </button>

                    <button
                        className="text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu /> }
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#1c1c1c] border-t border-gray-800">
                    <div className="flex flex-col p-6 gap-4 text-white">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <a href="/#divisions" onClick={() => setIsMobileMenuOpen(false)}>Divisions</a>
                        <a href="/#atelier" onClick={() => setIsMobileMenuOpen(false)}>Materials</a>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;