import { motion } from "framer-motion";

const stats = [
    { id: 1, label: "Years of Experience", value: "5+" },
    { id: 2, label: "Happy Clients", value: "500+" },
    { id: 3, label: "CFT Timber Sold", value: "100k+" },
    { id: 4, label: "Global Partners", value: "12+" },
];

const Stats = () => {
    return (
        <section className="relative py-20 bg-[#1c1c1c] text-white border-y border-white/10 overflow-hidden">

            {/* ▼▼▼ ANIMATED BACKGROUND ▼▼▼ */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Orb 1: Brand Color (Orange/Gold) - Top Left */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-[#d97706] rounded-full blur-[100px]"
                />

                {/* Orb 2: Cool Tone (Blue/Slate) - Bottom Right */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        opacity: [0.05, 0.2, 0.05]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-900 rounded-full blur-[100px]"
                />
            </div>

            {/* Content Container (z-10 ensures text is above the background) */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#d97706] mb-2">
                            {stat.value}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;