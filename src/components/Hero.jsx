import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    // Replace with your preferred hero image
                    backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-[#0f172a]/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto">

                {/* Est. Date */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[#d97706] text-xs md:text-base font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4"
                >
                    Est. 2020 · Haryana, India
                </motion.p>

                {/* Main Headline - OPTIMIZED FOR MOBILE */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    // text-4xl on mobile -> text-7xl on laptop
                    className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight"
                >
                    Sourcing the World's<br /> Finest Timber
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-200 text-sm md:text-xl font-light mb-8 md:mb-10 max-w-xs md:max-w-2xl mx-auto leading-relaxed"
                >
                    Premier importers of Teak, Pine, and Veneers. Bridging the gap between global forestry and Indian craftsmanship.
                </motion.p>

                {/* Button - Larger touch target for mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a
                        href="#divisions"
                        className="inline-block px-8 py-4 md:py-3 bg-[#d97706] text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-[#b45309] transition-all duration-300 rounded md:rounded-none"
                    >
                        Explore Divisions
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;