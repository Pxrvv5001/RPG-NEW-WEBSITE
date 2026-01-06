import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiniCTA from "../components/MiniCTA"; // <--- IMPORT

import marineImg from "../assets/marine.jpg";
import commercialImg from "../assets/commercial.jpg";
import gurjanImg from "../assets/gurjan.jpg";
import blockboardImg from "../assets/blockboard.jpg";
import flushdoorImg from "../assets/flushdoor.jpg";
import laminateImg from "../assets/laminate.jpg";

const plywoods = [
    { id: 1, name: "Marine Grade Plywood", spec: "IS:710 Certified", tag: "Waterproof", desc: "Boiling Waterproof (BWP) plywood designed for kitchens, bathrooms, and exterior use.", image: marineImg },
    { id: 2, name: "Commercial MR Grade", spec: "IS:303 Certified", tag: "Moisture Resistant", desc: "High-quality moisture-resistant plywood perfect for bedroom furniture and interior paneling.", image: commercialImg },
    { id: 3, name: "Gurjan Face Veneer", spec: "Premium Face", tag: "A++ Grade", desc: "Imported Gurjan face veneer for that reddish-brown premium finish on plywood sheets.", image: gurjanImg },
    { id: 4, name: "Block Boards", spec: "Pine Wood Filler", tag: "High Strength", desc: "Sturdy block boards made with seasoned pine wood fillers. Ideal for wardrobes and doors.", image: blockboardImg },
    { id: 5, name: "Flush Doors", spec: "Solid Core", tag: "Ready to Install", desc: "Pine-framed flush doors available in custom sizes. chemically treated against termites.", image: flushdoorImg },
    { id: 6, name: "Decorative Laminates", spec: "0.8mm & 1mm", tag: "Interior Design", desc: "A vast collection of textures and colors for surfacing furniture and walls.", image: laminateImg }
];

const Plywood = () => {
    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Plywood & Laminates | R.P. Goyal & Sons</title>
                <meta name="description" content="Manufacturers of Marine Grade (IS:710), Commercial Plywood, and Decorative Laminates in Karnal." />
            </Helmet>

            <Header />

            {/* Header: Dark Stone Border */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Plywood & Laminates</h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">Engineered for Strength and Durability</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plywoods.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            // Card BG: Dark Stone (#292524)
                            className="group bg-[#f9f8f4] dark:bg-[#292524] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                                    {item.tag}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.spec}</p>
                                <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                <Link
                                    to="/contact"
                                    state={{ interest: "Plywood & Laminates" }}
                                    className="block text-center w-full py-3 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <MiniCTA />
            <Footer />
        </div>
    );
};

export default Plywood;