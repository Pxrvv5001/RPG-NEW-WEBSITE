import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, TreePine } from "lucide-react"; // Import Icons

const stats = [
    { id: 1, label: "Years of Experience", value: "20+" },
    { id: 2, label: "Happy Clients", value: "2,500+" },
    { id: 3, label: "CBM Timber Sold", value: "50k+" },
    { id: 4, label: "Global Partners", value: "15+" },
];

const Stats = () => {
    return (
        <section id="stats" className="relative py-16 md:py-20 bg-[#1c1c1c] text-white border-y border-white/10 overflow-hidden">

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

                {/* 2. Trust Signals / Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
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