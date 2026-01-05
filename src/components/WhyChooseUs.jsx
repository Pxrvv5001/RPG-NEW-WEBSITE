import { motion } from "framer-motion";
import { Globe2, Ruler, BadgeIndianRupee, Truck } from "lucide-react";

const features = [
    {
        icon: <Globe2 size={32} />,
        title: "Direct Global Imports",
        desc: "We source directly from forests in Tanzania, Malaysia, and the USA, ensuring 100% authenticity and zero middleman costs."
    },
    {
        icon: <Ruler size={32} />,
        title: "Precision Sawmilling",
        desc: "Our in-house horizontal and vertical band saws allow us to cut logs to your exact custom specifications."
    },
    {
        icon: <BadgeIndianRupee size={32} />,
        title: "Wholesale Pricing",
        desc: "Get the best market rates. We supply bulk timber to dealers, furniture manufacturers, and construction projects."
    },
    {
        icon: <Truck size={32} />,
        title: "Pan-India Delivery",
        desc: "Reliable logistics network ensuring your timber reaches your site safely and on time, anywhere in India."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose <span className="text-[#d97706]">RPG?</span>
                    </h2>
                    <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
                        We don't just sell wood; we provide timber solutions tailored to your architectural needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-[#1e293b] hover:bg-white dark:hover:bg-[#263345] border border-transparent hover:border-gray-200 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-white dark:bg-[#0f172a] rounded-full flex items-center justify-center text-[#d97706] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;