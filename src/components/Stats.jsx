import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, TreePine } from "lucide-react";

const stats = [
    { id: 1, label: "Years of Experience", value: 20,   suffix: "+" },
    { id: 2, label: "Happy Clients",        value: 2500, suffix: "+" },
    { id: 3, label: "CBM Timber Sold",      value: 50,   suffix: "k+" },
    { id: 4, label: "Global Partners",      value: 15,   suffix: "+" },
];

// Easing function: ease-out quad
const easeOutQuad = (t) => t * (2 - t);

const StatItem = ({ stat, index }) => {
    const cardRef = useRef(null);
    const numRef  = useRef(null);
    const triggered = useRef(false);

    useEffect(() => {
        const card  = cardRef.current;
        const numEl = numRef.current;
        if (!card || !numEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || triggered.current) return;
                triggered.current = true;

                // Count-up animation using requestAnimationFrame
                const duration = 2000; // ms
                const delay    = index * 140;
                const start    = performance.now() + delay;

                const tick = (now) => {
                    const elapsed = Math.max(0, now - start);
                    const progress = Math.min(elapsed / duration, 1);
                    const eased   = easeOutQuad(progress);
                    const current = Math.round(eased * stat.value);

                    numEl.textContent =
                        (stat.value >= 1000
                            ? current.toLocaleString("en-IN")
                            : String(current)) + stat.suffix;

                    if (progress < 1) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
                observer.disconnect();
            },
            { threshold: 0.5 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, filter: "blur(14px)", scale: 0.86, y: 28 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            transition={{ delay: index * 0.13, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative"
        >
            <h4
                ref={numRef}
                className="text-4xl md:text-5xl font-serif font-bold text-[#d97706] mb-2 min-h-[3rem] tabular-nums"
            >
                0{stat.suffix}
            </h4>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                {stat.label}
            </p>
        </motion.div>
    );
};

const Stats = () => {
    return (
        <section
            id="stats"
            className="relative py-16 md:py-20 bg-gradient-to-b from-[#1c1c1c] to-[#0f0f0f] text-white border-y border-white/10 overflow-hidden grain-overlay"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-[#d97706] rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.05, 0.2, 0.05] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-900 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
                    {stats.map((stat, i) => (
                        <StatItem key={stat.id} stat={stat} index={i} />
                    ))}
                </div>

                {/* Trust Signals */}
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