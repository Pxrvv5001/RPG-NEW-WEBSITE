import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "../assets/my-new-hero.jpg";
import TimberParticles from "./TimberParticles";

const Hero = () => {

    const scrollToDivisions = () => {
        const element = document.getElementById("divisions");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToStats = () => {
        const element = document.getElementById("stats");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* 1. Background Image */}
            <img
                src={heroBg}
                alt="Timber Yard"
                className="absolute inset-0 w-full h-full object-cover"
                fetchPriority="high"
            />

            {/* 2. Dark Overlay */}
            <div className="absolute inset-0 bg-[#0f172a]/60"></div>

            {/* 3. Particle Layer */}
            <div className="absolute inset-0 z-10 opacity-70 pointer-events-none">
                <TimberParticles />
            </div>

            {/* 4. Main Content */}
            <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto -mt-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[#d97706] text-xs md:text-base font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4"
                >
                    {/* UPDATED YEAR */}
                    Est. 2004 · Haryana, India
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
                >
                    Sourcing the World's<br /> Finest Timber
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-200 text-sm md:text-xl font-light mb-8 md:mb-10 max-w-xs md:max-w-2xl mx-auto leading-relaxed"
                >
                    Premier importers of Teak, Pine, and Veneers. Bridging the gap between global forestry and Indian craftsmanship.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <button
                        onClick={scrollToDivisions}
                        className="inline-block px-8 py-4 md:py-3 bg-[#d97706] text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-[#b45309] transition-all duration-300 rounded md:rounded-none cursor-pointer border-none shadow-lg"
                    >
                        Explore Divisions
                    </button>
                </motion.div>
            </div>

            {/* 5. Minimal Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                onClick={scrollToStats}
            >
                <ChevronDown size={32} className="text-white/70 hover:text-[#d97706] transition-colors" />
            </motion.div>

        </section>
    );
};

export default Hero;