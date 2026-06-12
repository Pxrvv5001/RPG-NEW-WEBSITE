import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import storyImg from "../assets/YardStock.jpg";

const OurStory = () => {
    return (
        <section className="relative z-20 py-24 bg-gradient-to-b from-white to-[#f9f8f4] dark:from-[#1c1c1c] dark:to-[#171717] overflow-hidden transition-colors duration-500 grain-overlay">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">

                {/* LEFT: Single Static Image */}
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
                            alt="Gandhidham Yard Operations"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative Box - Brand Orange */}
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
                        Our Operational Hubs
                    </h4>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Processed in Gujarat,<br/>
                        Headquartered in Karnal.
                    </h2>

                    {/* Decorative Divider */}
                    <div className="h-1 w-20 bg-[#d97706] mb-8"></div>

                    <div className="space-y-6 text-lg text-gray-600 dark:text-stone-400 font-light leading-loose">
                        <p>
                            {/* UPDATED LEGACY TEXT */}
                            Building on a legacy that began in 2004, R.P. Goyal & Sons operates with a strategic dual-hub advantage. While our <span className="font-semibold text-gray-900 dark:text-white">Head Office serves you from Karnal</span>, all heavy machinery and physical processing are conducted at our extensive facility in <span className="font-bold text-[#d97706]">Gandhidham, Gujarat</span>.
                        </p>
                        <p>
                            From this port hub, we directly import and process <span className="font-semibold text-gray-900 dark:text-white">Teak from Tanzania & Ecuador</span>, structural <span className="font-semibold text-gray-900 dark:text-white">Meranti & Resak from Malaysia</span>, and softwoods like <span className="font-semibold text-gray-900 dark:text-white">American Pine & German Spruce</span>. This logistics powerhouse ensures that every log is graded and sawn to perfection before it reaches the market.
                        </p>
                    </div>

                    <div className="mt-8">
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