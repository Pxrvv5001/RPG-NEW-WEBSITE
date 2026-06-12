import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, TreePine } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
    { id: 1, label: "Years of Experience", value: 20, suffix: "+" },
    { id: 2, label: "Happy Clients", value: 2500, suffix: "+" },
    { id: 3, label: "CBM Timber Sold", value: 50, suffix: "k+" },
    { id: 4, label: "Global Partners", value: 15, suffix: "+" },
];

// Sub-component to handle individual animation triggers
const StatItem = ({ stat, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
            transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
            className="relative"
        >
            <h4 className="text-4xl md:text-5xl font-serif font-bold text-[#d97706] mb-2 min-h-[3rem]">
                {inView ? (
                    <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                    />
                ) : (
                    "0"
                )}
            </h4>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                {stat.label}
            </p>
        </motion.div>
    );
};

const Stats = () => {
    return (
        <section id="stats" className="relative py-16 md:py-20 bg-gradient-to-b from-[#1c1c1c] to-[#0f0f0f] text-white border-y border-white/10 overflow-hidden grain-overlay">

            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-[#d97706] rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        opacity: [0.05, 0.2, 0.05]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-900 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* 1. Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
                    {stats.map((stat, i) => (
                        <StatItem key={stat.id} stat={stat} index={i} />
                    ))}
                </div>

                {/* 2. Trust Signals / Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 border-t border-white/10"
                >
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                        <CheckCircle2 className="text-[#d97706]" size={18} />
                        <span>GST Registered</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                        <ShieldCheck className="text-[#d97706]" size={18} />
                        <span>Verified Sawmill</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                        <TreePine className="text-[#d97706]" size={18} />
                        <span>Sustainably Sourced</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Stats;