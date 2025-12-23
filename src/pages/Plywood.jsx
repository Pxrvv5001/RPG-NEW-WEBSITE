import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ▼▼▼ IMPORT YOUR IMAGES HERE ▼▼▼
import marineImg from "../assets/marine.jpg";
import commercialImg from "../assets/commercial.jpg";
import gurjanImg from "../assets/gurjan.jpg";
import blockboardImg from "../assets/blockboard.jpg";
import flushdoorImg from "../assets/flushdoor.jpg";
import laminateImg from "../assets/laminate.jpg";

const plywoods = [
    {
        id: 1,
        name: "Marine Grade Plywood",
        spec: "IS:710 Certified",
        tag: "Waterproof",
        desc: "Boiling Waterproof (BWP) plywood designed for kitchens, bathrooms, and exterior use.",
        image: marineImg
    },
    {
        id: 2,
        name: "Commercial MR Grade",
        spec: "IS:303 Certified",
        tag: "Moisture Resistant",
        desc: "High-quality moisture-resistant plywood perfect for bedroom furniture and interior paneling.",
        image: commercialImg
    },
    {
        id: 3,
        name: "Gurjan Face Veneer",
        spec: "Premium Face",
        tag: "A++ Grade",
        desc: "Imported Gurjan face veneer for that reddish-brown premium finish on plywood sheets.",
        image: gurjanImg
    },
    {
        id: 4,
        name: "Block Boards",
        spec: "Pine Wood Filler",
        tag: "High Strength",
        desc: "Sturdy block boards made with seasoned pine wood fillers. Ideal for wardrobes and doors.",
        image: blockboardImg
    },
    {
        id: 5,
        name: "Flush Doors",
        spec: "Solid Core",
        tag: "Ready to Install",
        desc: "Pine-framed flush doors available in custom sizes. chemically treated against termites.",
        image: flushdoorImg
    },
    {
        id: 6,
        name: "Decorative Laminates",
        spec: "0.8mm & 1mm",
        tag: "Interior Design",
        desc: "A vast collection of textures and colors for surfacing furniture and walls.",
        image: laminateImg
    }
];

const Plywood = () => {
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Header />

            {/* Hero Header */}
            <div className="bg-[#451a03] pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Plywood & Laminates</h1>
                <p className="text-amber-200 text-sm tracking-widest uppercase">Engineered for Strength and Durability</p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plywoods.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-[#f9f8f4] dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                                    {item.tag}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">{item.spec}</p>
                                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                {/* Button -> Contact Page */}
                                <Link
                                    to="/contact"
                                    className="block text-center w-full py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#451a03] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Plywood;