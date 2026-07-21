import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Layers, Settings, X, ArrowRight, ArrowUpRight } from "lucide-react";

// --- DATA ---
const businesses = [
    {
        id: 1,
        title: "Timber Supply",
        subtitle: "Global Import & Wholesale",
        icon: <Trees size={40} />,
        desc: "Direct import of premium logs from Tanzania, Malaysia, USA, New Zealand, Uruguay and Australia.",
        details: {
            heading: "Premium Hardwoods & Softwoods",
            points: [
                "Tanzania Teak (Sagwan) - Premium Grade",
                "Meranti Wood - Malaysian Red & Yellow",
                "Resak Sawn Timber (Structural Heavy)",
                "Ecuador Sagwan (Plantation Teak)",
                "Southern Yellow Pine (SYP) & German Spruce",
                "Radiata Pine — New Zealand & Uruguay",
                "Cypress Pine — Australia",
            ],
            cta: "View Timber Catalog",
            link: "/catalog",
        },
        accentColor: "#22c55e",
        iconBg: "bg-green-500/10",
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
                "Calibrated Plywood for Modular Kitchens",
            ],
            cta: "Check Plywood Specs",
            link: "/plywood",
        },
        accentColor: "#d97706",
        iconBg: "bg-amber-500/10",
    },
    {
        id: 3,
        title: "Sawmill Services",
        subtitle: "Processing Unit — Gandhidham",
        icon: <Settings size={40} />,
        desc: "Precision cutting with Horizontal & Vertical Band Saws at our Gandhidham plant.",
        details: {
            heading: "Advanced Wood Processing",
            points: [
                "Horizontal Band Saw (Heavy Log Cutting)",
                "Vertical Band Saw (Resizing & Splitting)",
                "Log Peeling for Veneers",
                "Custom Sawing for Bulk Orders",
            ],
            cta: "Book Service",
            link: "/services",
        },
        accentColor: "#a8a29e",
        iconBg: "bg-stone-500/10",
    },
];

// ── MODAL ──
const DivisionModal = ({ biz, onClose }) => {
    if (!biz) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-[#1c1c1c] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
                >
                    {/* Accent bar */}
                    <div className="h-1 w-full" style={{ background: biz.accentColor }} />

                    <div className="flex flex-col md:flex-row">

                        {/* LEFT */}
                        <div className="md:w-[200px] shrink-0 bg-gray-50 dark:bg-[#141414] border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5 p-7 flex flex-col gap-6">
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${biz.iconBg}`}
                                style={{ color: biz.accentColor }}
                            >
                                {biz.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white leading-snug mb-1">
                                    {biz.title}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-stone-500">
                                    {biz.subtitle}
                                </p>
                            </div>
                            <div className="mt-auto h-px w-8" style={{ background: biz.accentColor }} />
                        </div>

                        {/* RIGHT */}
                        <div className="flex-1 p-7">

                            {/* Header row */}
                            <div className="flex items-center justify-between mb-5">
                                <span
                                    className="text-[11px] font-bold uppercase tracking-widest"
                                    style={{ color: biz.accentColor }}
                                >
                                    {biz.details.heading}
                                </span>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            {/* List */}
                            <ul className="space-y-3 mb-7">
                                {biz.details.points.map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.04 + i * 0.055, duration: 0.25 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div
                                            className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ background: biz.accentColor }}
                                        />
                                        <span className="text-sm text-gray-600 dark:text-stone-300 leading-relaxed">
                                            {point}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                to={biz.details.link}
                                onClick={onClose}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:gap-3"
                                style={{ background: biz.accentColor }}
                            >
                                {biz.details.cta}
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ── MAIN ──
const BusinessGrid = () => {
    const [selectedId, setSelectedId] = useState(null);
    const selectedBiz = businesses.find((b) => b.id === selectedId) ?? null;

    return (
        <section id="divisions" className="scroll-mt-32 py-16 md:py-24 bg-gradient-to-b from-[#f9f8f4] to-[#f0ede6] dark:from-[#1c1c1c] dark:to-[#151515] relative transition-colors duration-500 grain-overlay">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-4 transition-colors">
                        Our Core Divisions
                    </h2>
                    <div className="h-1 w-20 bg-[#d97706] mx-auto mb-6" />
                    <p className="text-gray-600 dark:text-stone-400 max-w-2xl mx-auto text-sm md:text-base transition-colors">
                        Click on any division below to explore our specific products and processing capabilities.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
                    {businesses.map((biz, index) => (
                        <motion.div
                            key={biz.id}
                            onClick={() => setSelectedId(biz.id)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="flex flex-col h-full bg-white dark:bg-[#292524] p-8 rounded-xl shadow-lg cursor-pointer border-t-4 border-transparent hover:border-[#d97706] transition-all relative overflow-hidden group active:scale-95"
                        >
                            <div className="mb-6 text-[#1c1c1c] dark:text-white group-hover:text-[#d97706] transition-colors duration-300">
                                {biz.icon}
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1 transition-colors">
                                {biz.title}
                            </h3>
                            <p className="text-xs text-gray-400 dark:text-stone-500 mb-4 font-medium">
                                {biz.subtitle}
                            </p>
                            <p className="text-gray-600 dark:text-stone-400 text-sm mb-6 leading-relaxed transition-colors flex-grow">
                                {biz.desc}
                            </p>

                            <div className="flex items-center gap-2 text-[#d97706] font-bold text-xs tracking-widest uppercase mt-auto group-hover:gap-3 transition-all">
                                <span>View Details</span>
                                <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {selectedBiz && (
                <DivisionModal biz={selectedBiz} onClose={() => setSelectedId(null)} />
            )}
        </section>
    );
};

export default BusinessGrid;