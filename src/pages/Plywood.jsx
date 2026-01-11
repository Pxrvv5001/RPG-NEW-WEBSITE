import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, ArrowRight, X, Layers, Droplets, Hammer, Ruler } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiniCTA from "../components/MiniCTA";

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
        image: marineImg,
        specs: {
            core: "100% Hardwood (Eucalyptus)",
            glue: "Phenol Formaldehyde (BWP Grade)",
            face: "0.4mm Gurjan Face",
            density: "800 kg/m³",
            warranty: "25 Years Guarantee"
        }
    },
    {
        id: 2,
        name: "Commercial MR Grade",
        spec: "IS:303 Certified",
        tag: "Moisture Resistant",
        desc: "High-quality moisture-resistant plywood perfect for bedroom furniture and interior paneling.",
        image: commercialImg,
        specs: {
            core: "Alternate Core (Poplar + Eucalyptus)",
            glue: "Melamine Urea Formaldehyde",
            face: "0.3mm Recon Face",
            density: "650 kg/m³",
            warranty: "10 Years Warranty"
        }
    },
    {
        id: 3,
        name: "Gurjan Face Veneer",
        spec: "Premium Face",
        tag: "A++ Grade",
        desc: "Imported Gurjan face veneer for that reddish-brown premium finish on plywood sheets.",
        image: gurjanImg,
        specs: {
            thickness: "0.35mm to 0.55mm",
            moisture: "8-12% (Dried)",
            origin: "Burma / Indonesia",
            grade: "A++ (Knot Free)",
            uses: "Premium Furniture Surfacing"
        }
    },
    {
        id: 4,
        name: "Block Boards",
        spec: "Pine Wood Filler",
        tag: "High Strength",
        desc: "Sturdy block boards made with seasoned pine wood fillers. Ideal for wardrobes and doors.",
        image: blockboardImg,
        specs: {
            filler: "Seasoned Pine Wood Batons",
            frame: "Hardwood Frame",
            glue: "BWP / MR Options",
            stability: "High Warp Resistance",
            uses: "Wardrobe Shutters, Long Panels"
        }
    },
    {
        id: 5,
        name: "Flush Doors",
        spec: "Solid Core",
        tag: "Ready to Install",
        desc: "Pine-framed flush doors available in custom sizes. chemically treated against termites.",
        image: flushdoorImg,
        specs: {
            core: "Solid Tubular / Pine Filler",
            treatment: "Vacuum Pressure Impregnated (VPI)",
            finish: "Raw / Laminate / Veneer",
            sizes: "Custom sizes up to 8ft",
            durability: "Termite & Borer Proof"
        }
    },
    {
        id: 6,
        name: "Decorative Laminates",
        spec: "0.8mm & 1mm",
        tag: "Interior Design",
        desc: "A vast collection of textures and colors for surfacing furniture and walls.",
        image: laminateImg,
        specs: {
            thickness: "0.8mm / 1.0mm",
            finish: "Matte, Gloss, Texture, Suede",
            resistance: "Scratch & Heat Resistant",
            bonding: "Compatible with PVA Glue",
            maintenance: "Zero Maintenance Surface"
        }
    }
];

const Plywood = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Plywood & Laminates | R.P. Goyal & Sons</title>
                <meta name="description" content="Manufacturers of Marine Grade (IS:710), Commercial Plywood, and Decorative Laminates in Karnal." />
            </Helmet>

            <Header />

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
                            className="group bg-[#f9f8f4] dark:bg-[#292524] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706] flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => setSelectedItem(item)}>
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                                    {item.tag}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.spec}</p>
                                <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button
                                        onClick={() => setSelectedItem(item)}
                                        className="flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Eye size={16} /> Specs
                                    </button>

                                    <Link
                                        to="/contact"
                                        state={{ interest: `Quote: ${item.name}` }}
                                        className="flex items-center justify-center gap-2 py-3 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-colors"
                                    >
                                        Get Quote
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- STANDARDIZED MODAL --- */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            // ▼▼▼ UNIFIED CONTAINER CLASSES ▼▼▼
                            className="relative w-full max-w-4xl bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
                                <X size={20} />
                            </button>

                            {/* Left: Image (Standardized Width/Height) */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-800">
                                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">{selectedItem.name}</h2>
                                </div>
                            </div>

                            {/* Right: Specs (Standardized Padding/Scroll) */}
                            <div className="w-full md:w-3/5 p-8 text-gray-900 dark:text-white overflow-y-auto">
                                <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-[#d97706]">Technical Datasheet</h3>

                                <div className="grid grid-cols-1 gap-6 mb-8">
                                    {Object.entries(selectedItem.specs).map(([key, value]) => (
                                        <div key={key} className="flex gap-4 border-b border-gray-100 dark:border-white/5 pb-4 last:border-0">
                                            <div className="bg-gray-100 dark:bg-white/5 p-2 rounded-full h-fit text-[#d97706]">
                                                {key === 'core' || key === 'filler' ? <Layers size={18} /> :
                                                    key === 'glue' || key === 'treatment' ? <Droplets size={18} /> :
                                                        key === 'density' || key === 'strength' ? <Hammer size={18} /> : <Ruler size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase text-stone-500 mb-1">{key}</p>
                                                <p className="font-medium text-lg capitalize">{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/contact"
                                    state={{ interest: `Order: ${selectedItem.name}` }}
                                    className="block w-full py-4 bg-[#d97706] text-white text-center font-bold uppercase tracking-widest text-sm hover:bg-[#b45309] rounded transition-colors shadow-lg"
                                >
                                    Request Bulk Pricing
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <MiniCTA />
            <Footer />
        </div>
    );
};

export default Plywood;