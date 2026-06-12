import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CallToAction = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] relative overflow-hidden border-t border-white/5 grain-overlay">
            {/* Subtle Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d97706] rounded-full blur-[128px] opacity-10"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-800 rounded-full blur-[128px] opacity-10"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
                >
                    Let's Work <span className="text-[#d97706]">Together</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Interested in sourcing premium timber? Whether it's a single consignment or a long-term supply partnership, we'd love to start a conversation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-4 justify-center"
                >
                    {/* Primary Button: Orange Gradient */}
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:from-[#b45309] hover:to-[#92400e] transition-all shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40 hover:gap-3"
                    >
                        Get in Touch <ArrowRight size={18} />
                    </Link>

                    {/* Secondary Button: Outline */}
                    <Link
                        to="/catalog"
                        className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-700 text-gray-300 px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        View Catalog
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;