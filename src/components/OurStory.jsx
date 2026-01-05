import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// Swapped to YardStock for a "fuller" look
import storyImg from "../assets/YardStock.jpeg";

const OurStory = () => {
    return (
        // Added 'z-20' to make sure this section sits ON TOP of the Stats blur
        <section className="relative z-20 py-24 bg-white dark:bg-[#0f172a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">

                {/* LEFT: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 relative"
                >
                    <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
                        <img
                            src={storyImg}
                            alt="Our Yard Stock"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative Box behind */}
                    <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#d97706] rounded-xl -z-0 hidden md:block"></div>
                </motion.div>

                {/* RIGHT: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2"
                >
                    <h4 className="text-[#d97706] font-bold uppercase tracking-widest text-xs mb-4">
                        Our Legacy
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Crafting Trust,<br/> One Log at a Time.
                    </h2>
                    <p className="text-gray-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                        Since 2020, R.P. Goyal & Sons has bridged the gap between global forests and Indian craftsmanship.
                        We don't just import timber; we curate it. From the dense forests of Tanzania to the sustainable
                        plantations of Ecuador, every log is handpicked for grain quality and durability.
                    </p>

                    {/* FIXED BUTTON: Now a solid clickable block */}
                    <div>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-2 bg-[#d97706] text-white px-8 py-3 rounded shadow-lg hover:bg-[#b45309] hover:gap-4 transition-all font-bold uppercase tracking-widest text-sm"
                        >
                            View Our Yard <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default OurStory;