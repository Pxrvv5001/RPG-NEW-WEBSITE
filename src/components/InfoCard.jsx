import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, ArrowRight } from "lucide-react"; // Added Icons
import FadeImage from "./FadeImage";

const InfoCard = ({ image, title, subtitle, tag, description, delay, onViewSpecs }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1 }}
            viewport={{ once: true }}
            className="h-full flex flex-col group bg-[#f9f8f4] dark:bg-[#292524] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
        >
            {/* Image Section */}
            <div className="h-64 relative flex-shrink-0 cursor-pointer" onClick={onViewSpecs}>
                <FadeImage
                    src={image}
                    alt={title}
                    className="h-full w-full"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />

                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded z-20">
                    {tag}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{subtitle}</p>

                <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                {/* Two Buttons: View Specs & Inquire */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                        onClick={onViewSpecs}
                        className="flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
                    >
                        <Eye size={16} /> Specs
                    </button>

                    <Link
                        to="/contact"
                        state={{ interest: `Inquiry: ${title}` }}
                        className="flex items-center justify-center gap-2 py-3 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-colors"
                    >
                        Inquire <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default InfoCard;