import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";

import pineImg from "../assets/newpine.jpg";
import veneerImg from "../assets/newgurjan.jpg";
import teakImg from "../assets/teak.jpg";

const products = [
    {
        id: "teak",
        name: "Sagwan Teak", // <--- UPDATED NAME
        origin: "Tanzania / Ecuador",
        desc: "The gold standard. Known for rich oil content and weather resistance.",
        image: teakImg,
        accent: "from-amber-700 to-amber-900",
        fallbackColor: "bg-[#5D4037]"
    },
    {
        id: "pine",
        name: "Yellow Pine",
        origin: "USA / Canada",
        desc: "Robust softwood with bold grain patterns. Ideal for heavy construction.",
        image: pineImg,
        accent: "from-yellow-600 to-orange-800",
        fallbackColor: "bg-[#E2C290]"
    },
    {
        id: "veneer",
        name: "Exotic Veneer",
        origin: "Global Select",
        desc: "Precision-sliced hardwood for luxury cabinetry and paneling.",
        image: veneerImg,
        accent: "from-stone-600 to-stone-800",
        fallbackColor: "bg-[#4E342E]"
    }
];

const ProductAtelier = () => {
    return (
        <section id="atelier" className="scroll-mt-32 py-24 bg-[#1a120b] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 text-white">
                    <h2 className="text-4xl font-serif mb-4">
                        The Material <span className="text-[#d97706] italic">Atelier</span>
                    </h2>
                    <p className="text-slate-400 font-light">
                        Inspect the grain quality of our premium imports.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Card = ({ product }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-[#261f18] border-b-2 border-[#d97706]/20 hover:border-[#d97706] transition-all duration-500 overflow-hidden"
        >
            <div className={`relative h-80 overflow-hidden ${imgError ? product.fallbackColor : 'bg-black'}`}>
                {!imgError ? (
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.25 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                        <AlertCircle className="text-white w-12 h-12 mb-2" />
                        <span className="text-white text-xs uppercase tracking-widest">Image Not Found</span>
                    </div>
                )}

                {!imgError && (
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500"></div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/20">
                        <Search className="text-white w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className={`h-1 w-12 mb-4 bg-gradient-to-r ${product.accent}`}></div>
                <h4 className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-2">
                    {product.origin}
                </h4>
                <h3 className="text-2xl font-serif text-white mb-3">
                    {product.name}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                    {product.desc}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductAtelier;