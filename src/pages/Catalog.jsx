import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Data for the Catalog
const products = [
    {
        id: 1,
        name: "Burma Teak",
        origin: "Tanzania & Benin",
        grade: "Premium Hardwood",
        desc: "The gold standard for furniture. Rich golden-brown color with excellent weather resistance.",
        image: "https://images.unsplash.com/photo-1543445884-25cb48197771?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Red Meranti",
        origin: "Malaysia",
        grade: "Structural Grade",
        desc: "Reddish-brown hardwood ideal for window frames, molding, and interior joinery.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Southern Yellow Pine",
        origin: "USA",
        grade: "Grade A Softwood",
        desc: "Strong, dense pine with a distinctive grain pattern. Perfect for flooring and decking.",
        image: "https://images.unsplash.com/photo-1513161455079-7dc1bad1501c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "German Spruce",
        origin: "Germany",
        grade: "Construction Grade",
        desc: "Lightweight and light-colored. Widely used for packaging, pallets, and framing.",
        image: "https://images.unsplash.com/photo-1610505466046-5c654d245050?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "American Walnut",
        origin: "North America",
        grade: "Luxury Hardwood",
        desc: "Dark, chocolate brown heartwood. The preferred choice for high-end furniture and veneers.",
        image: "https://images.unsplash.com/photo-1620121474677-4402eb6b345a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "White Ash",
        origin: "Europe",
        grade: "Joinery Grade",
        desc: "Light creamy color with straight grain. Excellent shock resistance, used in sports equipment.",
        image: "https://images.unsplash.com/photo-1558618007-8e6fa303780a?q=80&w=800&auto=format&fit=crop"
    }
];

const Catalog = () => {
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Header />

            {/* Hero Header */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Timber Catalog</h1>
                <p className="text-slate-400 text-sm tracking-widest uppercase">Explore our collection of premium global woods</p>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-[#f9f8f4] dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            {/* Image */}
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                                    {item.grade}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.origin}</p>
                                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>

                                <button className="w-full py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                    Inquire Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Catalog;