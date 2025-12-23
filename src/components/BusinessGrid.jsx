import { useState } from "react";
import { Link } from "react-router-dom"; // <--- IMPORT ADDED
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Layers, Settings, X, CheckCircle2, ArrowRight } from "lucide-react";

// --- DATA ---
const businesses = [
    {
        id: 1,
        title: "Timber Supply",
        subtitle: "Global Import & Wholesale",
        icon: <Trees size={40} />,
        desc: "Direct import of premium logs from Tanzania, Malaysia, and USA.",
        details: {
            heading: "Premium Hardwoods & Softwoods",
            points: [
                "Burma Teak (CP Teak) - Tanzania & Benin Origin",
                "Meranti Wood - Malaysian Red & Yellow",
                "Southern Yellow Pine (SYP) - USA Grade A",
                "German Pine & Spruce for Packaging",
                "Custom Sizing for Bulk Orders"
            ],
            cta: "View Timber Catalog",
            link: "/catalog" // <--- Points to Catalog Page
        },
        color: "bg-[#1a2f23]",
        accent: "text-green-400"
    },
    {
        id: 2,
        title: "Plywood Manufacturing",
        subtitle: "R P Goyal Laminates",
        icon: <Layers size={40} />,
        desc: "High-grade commercial and marine ply for interior architecture.",
        details: {
            heading: "Engineered for Durability",
            points: [
                "Marine Grade Plywood (IS:710) - Waterproof",
                "Commercial MR Grade (IS:303)",
                "Gurjan Face Veneer Plywood",
                "Block Boards & Flush Doors",
                "Calibrated Plywood for Modular Kitchens"
            ],
            cta: "Check Plywood Specs",
            link: "/plywood" // <--- Points to Plywood Page
        },
        color: "bg-[#451a03]",
        accent: "text-amber-400"
    },
    {
        id: 3,
        title: "Sawmill Services",
        subtitle: "Processing Unit",
        icon: <Settings size={40} />,
        desc: "Precision cutting, seasoning, and chemical treatment facility.",
        details: {
            heading: "Advanced Wood Processing",
            points: [
                "Horizontal Band Saw Cutting (Precision Sizing)",
                "Chemical Impregnation (Termite Proofing)",
                "Kiln Seasoning (Moisture Control)",
                "Planing & Surface Finishing",
                "Log Peeling for Veneers"
            ],
            cta: "Book Service",
            link: "/services" // <--- Points to Services Page
        },
        color: "bg-[#1e293b]",
        accent: "text-blue-400"
    }
];

const BusinessGrid = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section id="divisions" className="py-16 md:py-24 bg-[#f9f8f4] dark:bg-[#0f172a] relative transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION HEADER */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-4 transition-colors">
                        Our Core Divisions
                    </h2>
                    <div className="h-1 w-20 bg-[#d97706] mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base transition-colors">
                        Click on any division below to explore our specific products and processing capabilities.
                    </p>
                </div>

                {/* THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {businesses.map((biz) => (
                        <motion.div
                            layoutId={`card-${biz.id}`}
                            key={biz.id}
                            onClick={() => setSelectedId(biz.id)}
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-lg cursor-pointer border-t-4 border-transparent hover:border-[#d97706] transition-all relative overflow-hidden group active:scale-95"
                        >
                            <motion.div layoutId={`icon-${biz.id}`} className="mb-6 text-[#1c1c1c] dark:text-white group-hover:text-[#d97706] transition-colors">
                                {biz.icon}
                            </motion.div>

                            <motion.h3 layoutId={`title-${biz.id}`} className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                                {biz.title}
                            </motion.h3>

                            <motion.p layoutId={`desc-${biz.id}`} className="text-gray-600 dark:text-slate-400 text-sm mb-6 leading-relaxed transition-colors">
                                {biz.desc}
                            </motion.p>

                            <div className="flex items-center gap-2 text-[#d97706] font-bold text-xs tracking-widest uppercase mt-auto">
                                <span>View Details</span>
                                <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* EXPANDED OVERLAY (MODAL) */}
                <AnimatePresence>
                    {selectedId && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/80 md:bg-black/60 md:backdrop-blur-sm z-50"
                            />

                            {/* Modal Container */}
                            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-8">
                                {businesses.map((biz) => (
                                    biz.id === selectedId && (
                                        <motion.div
                                            layoutId={`card-${biz.id}`}
                                            key={biz.id}
                                            className={`w-full max-w-2xl ${biz.color} text-white rounded-2xl shadow-2xl pointer-events-auto relative flex flex-col md:flex-row max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible`}
                                        >
                                            {/* Close Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                                            >
                                                <X size={20} className="text-white" />
                                            </button>

                                            {/* Left Side */}
                                            <div className="p-8 md:p-10 flex flex-col justify-between md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                                                <div>
                                                    <motion.div layoutId={`icon-${biz.id}`} className={`mb-6 ${biz.accent}`}>
                                                        {biz.icon}
                                                    </motion.div>
                                                    <motion.h3 layoutId={`title-${biz.id}`} className="text-2xl md:text-3xl font-serif font-bold mb-2">
                                                        {biz.title}
                                                    </motion.h3>
                                                    <p className="text-white/60 text-sm">{biz.subtitle}</p>
                                                </div>
                                                <div className="hidden md:block mt-12">
                                                    <div className="h-1 w-12 bg-[#d97706]"></div>
                                                </div>
                                            </div>

                                            {/* Right Side */}
                                            <div className="p-8 md:p-10 md:w-3/5 bg-black/20">
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h4 className="text-lg font-bold mb-6 text-[#d97706] uppercase tracking-widest text-xs">
                                                        {biz.details.heading}
                                                    </h4>

                                                    <ul className="space-y-4 mb-8">
                                                        {biz.details.points.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                                                                <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${biz.accent}`} />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* ▼▼▼ THE FIXED BUTTON ▼▼▼
                              Using <Link> to navigate and onClick to close modal
                          */}
                                                    <Link
                                                        to={biz.details.link}
                                                        onClick={() => setSelectedId(null)}
                                                        className="block text-center w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#d97706] hover:text-white transition-colors duration-300 cursor-pointer"
                                                    >
                                                        {biz.details.cta}
                                                    </Link>

                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default BusinessGrid;