import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Ruler, BadgeIndianRupee, Truck, Plus, Minus, HelpCircle, Calculator } from "lucide-react";

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

const faqs = [
    {
        q: "What is your Minimum Order Quantity (MOQ)?",
        a: "For Timber, our MOQ is typically 200 CFT (approx. 1 truckload partition). For Plywood, we accept orders starting from 50 sheets. Contact us for smaller sample requirements."
    },
    {
        q: "Do you deliver to remote locations?",
        a: "Yes, we have a network of trusted logistics partners that cover Tier 1, 2, and 3 cities across India, including remote industrial zones."
    },
    {
        q: "Who pays for shipping?",
        a: "Shipping is generally 'To Pay' basis (paid by the buyer upon receipt) unless negotiated otherwise for bulk contracts. We ensure you get competitive market rates from transporters."
    },
    {
        q: "Can I arrange my own transport?",
        // UPDATED ANSWER TO REFLECT GANDHIDHAM
        a: "Absolutely. For bulk orders, you can lift directly from our Gandhidham Plant (Gujarat). For retail/local orders, vehicles can be loaded at our Karnal Depot. We provide full loading assistance at both yards."
    }
];

const WhyChooseUs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 bg-white dark:bg-[#1c1c1c] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- FEATURES GRID --- */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose <span className="text-[#d97706]">RPG?</span>
                    </h2>
                    <p className="text-gray-500 dark:text-stone-400 max-w-2xl mx-auto">
                        We don't just sell wood; we provide timber solutions tailored to your architectural needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-[#292524] hover:bg-white dark:hover:bg-[#171717] border border-transparent hover:border-gray-200 dark:hover:border-stone-700 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-white dark:bg-[#1c1c1c] rounded-full flex items-center justify-center text-[#d97706] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-stone-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CALCULATOR TEASER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#d97706]/10 border border-[#d97706]/20 rounded-xl p-6 mb-24 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#d97706] text-white rounded-lg">
                            <Calculator size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Planning a Project?</h4>
                            <p className="text-sm text-gray-600 dark:text-stone-300">Use our free CBM Calculator to estimate your timber requirements instantly.</p>
                        </div>
                    </div>
                    <Link
                        to="/calculator"
                        className="px-6 py-3 bg-[#d97706] hover:bg-[#b45309] text-white font-medium text-sm rounded transition-colors whitespace-nowrap"
                    >
                        Open Calculator
                    </Link>
                </motion.div>


                {/* --- SHIPPING FAQ SECTION --- */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-[#d97706] font-bold uppercase tracking-widest text-xs mb-3">
                            <HelpCircle size={16} />
                            <span>Logistics & Delivery</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Shipping Questions</h3>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-[#292524] rounded-lg overflow-hidden border border-transparent dark:border-white/5 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-5 text-left text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <span className="text-[#d97706] shrink-0 ml-4">
                                        {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0 text-gray-600 dark:text-stone-400 text-sm leading-relaxed border-t border-gray-200 dark:border-white/5">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;