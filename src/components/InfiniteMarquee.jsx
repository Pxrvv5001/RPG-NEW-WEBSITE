import { motion } from "framer-motion";

const items = [
    "Teak Wood", "Meranti", "Pine Wood", "Veneers", "Door Frames",
    "Decking", "Cladding", "Sawmill Services", "Wholesale Timber"
];

const InfiniteMarquee = () => {
    return (
        <div className="bg-[#d97706] py-4 overflow-hidden relative z-20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    className="flex gap-8 md:gap-16 items-center"
                >
                    {[...items, ...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-8 md:gap-16">
                            <span className="text-white font-serif font-bold text-lg md:text-2xl uppercase tracking-wider">
                                {item}
                            </span>
                            <span className="text-black/20 text-xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;