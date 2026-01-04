import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const InfoCard = ({ image, title, subtitle, tag, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1 }}
            viewport={{ once: true }}
            className="group bg-[#f9f8f4] dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
        >
            {/* Image Section */}
            <div className="h-64 overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                    {tag}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{subtitle}</p>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                    {description}
                </p>

                <Link
                    to="/contact"
                    className="block text-center w-full py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    Inquire Now
                </Link>
            </div>
        </motion.div>
    );
};

export default InfoCard;