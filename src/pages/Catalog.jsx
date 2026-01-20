import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FilterX, X, Hammer, Droplets, Scale, Layers, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom"; // Keep this for other links
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import MiniCTA from "../components/MiniCTA";
import { catalogData } from "../data/catalogData";

// ▼▼▼ IMPORT THE CART HOOK ▼▼▼
import { useCart } from "../context/CartContext";

// Local Images
import teakImg from "../assets/teak.jpg";
import merantiImg from "../assets/meranti.jpg";
import pineImg from "../assets/pine.jpg";
import spruceImg from "../assets/spruce.jpg";
import resakImg from "../assets/resak.jpeg";
import ecuadorImg from "../assets/ecuador.jpg";

const imageMap = {
    teak: teakImg,
    meranti: merantiImg,
    pine: pineImg,
    spruce: spruceImg,
    resak: resakImg,
    ecuador: ecuadorImg
};

const Catalog = () => {
    // ▼▼▼ USE THE HOOK ▼▼▼
    const { addToCart } = useCart();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = catalogData.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Timber Catalog | R.P. Goyal & Sons</title>
                <meta name="description" content="Browse our premium selection of Burma Teak, Pine, Meranti, and global hardwoods available for wholesale." />
            </Helmet>

            <Header />

            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                {/* RESTORE TITLE */}
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Timber Catalog</h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">Explore our collection of premium global woods</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <input
                        type="text"
                        placeholder="Search timber..."
                        className="w-full md:w-1/3 p-3 bg-gray-100 dark:bg-[#292524] border border-gray-200 dark:border-white/10 rounded text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] transition-colors"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex gap-2">
                        {['All', 'Hardwood', 'Softwood'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded transition-colors ${
                                    filterCategory === cat
                                        ? 'bg-[#d97706] text-white'
                                        : 'bg-gray-100 dark:bg-[#292524] text-gray-600 dark:text-stone-400 hover:bg-gray-200 dark:hover:bg-black'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={item.id}
                                    className="h-full"
                                >
                                    <InfoCard
                                        delay={0}
                                        image={imageMap[item.imageKey]}
                                        title={item.name}
                                        subtitle={item.origin}
                                        tag={item.grade}
                                        description={item.desc}
                                        onViewSpecs={() => setSelectedProduct(item)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <div className="inline-block p-4 bg-gray-100 dark:bg-[#292524] rounded-full mb-4">
                                    <FilterX className="text-gray-400 w-12 h-12" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Match Found</h3>
                                <p className="text-gray-500 dark:text-stone-400 mb-6">We couldn't find any timber matching your search.</p>
                                <button onClick={() => {setSearchTerm(""); setFilterCategory("All");}} className="text-[#d97706] font-bold uppercase text-xs tracking-widest hover:underline cursor-pointer">
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
                                <X size={20} />
                            </button>

                            {/* Left: Image */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={imageMap[selectedProduct.imageKey]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <div className="text-white">
                                        <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-1">{selectedProduct.origin}</p>
                                        <h2 className="text-3xl font-serif font-bold leading-tight">{selectedProduct.name}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Specs */}
                            <div className="w-full md:w-3/5 p-8 text-gray-900 dark:text-white overflow-y-auto">
                                <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-[#d97706]">Technical Specifications</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div className="flex gap-3">
                                        <Scale className="text-stone-400 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase text-stone-500">Density</p>
                                            <p className="font-medium">{selectedProduct.specs?.density || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Droplets className="text-stone-400 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase text-stone-500">Moisture Content</p>
                                            <p className="font-medium">{selectedProduct.specs?.moisture || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Hammer className="text-stone-400 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase text-stone-500">Durability</p>
                                            <p className="font-medium">{selectedProduct.specs?.durability || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Layers className="text-stone-400 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase text-stone-500">Grain</p>
                                            <p className="font-medium">{selectedProduct.specs?.grain || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-xs font-bold uppercase text-stone-500 mb-2">Primary Uses</p>
                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-stone-300">
                                        {selectedProduct.specs?.uses || "General construction and joinery."}
                                    </p>
                                </div>

                                {/* ▼▼▼ THIS IS THE BUTTON WE WANT ▼▼▼ */}
                                <button
                                    onClick={() => {
                                        addToCart(selectedProduct);
                                        setSelectedProduct(null); // Close modal
                                    }}
                                    className="w-full py-4 bg-[#d97706] text-white text-center font-bold uppercase tracking-widest text-sm hover:bg-[#b45309] rounded transition-colors shadow-lg flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} /> Add to Quote Request
                                </button>
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

export default Catalog;