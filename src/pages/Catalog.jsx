import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ▼▼▼ IMPORTING LOCAL IMAGES ▼▼▼
// Ensure these files exist in your src/assets folder!
import teakImg from "../assets/teak.jpg";
import merantiImg from "../assets/meranti.jpg";
import pineImg from "../assets/pine.jpg";
import spruceImg from "../assets/spruce.jpg";
import walnutImg from "../assets/walnut.jpg";
import ashImg from "../assets/ash.jpg";

const products = [
    {
        id: 1,
        name: "Burma Teak",
        origin: "Tanzania & Benin",
        grade: "Premium Hardwood",
        desc: "The gold standard for furniture. Rich golden-brown color with excellent weather resistance.",
        image: teakImg // <--- Using the imported variable
    },
    {
        id: 2,
        name: "Red Meranti",
        origin: "Malaysia",
        grade: "Structural Grade",
        desc: "Reddish-brown hardwood ideal for window frames, molding, and interior joinery.",
        image: merantiImg // <--- Using the imported variable
    },
    {
        id: 3,
        name: "Southern Yellow Pine",
        origin: "USA",
        grade: "Grade A Softwood",
        desc: "Strong, dense pine with a distinctive grain pattern. Perfect for flooring and decking.",
        image: pineImg // <--- Using the imported variable
    },
    {
        id: 4,
        name: "German Spruce",
        origin: "Germany",
        grade: "Construction Grade",
        desc: "Lightweight and light-colored. Widely used for packaging, pallets, and framing.",
        image: spruceImg // <--- Using the imported variable
    },
    {
        id: 5,
        name: "American Walnut",
        origin: "North America",
        grade: "Luxury Hardwood",
        desc: "Dark, chocolate brown heartwood. The preferred choice for high-end furniture and veneers.",
        image: walnutImg // <--- Using the imported variable
    },
    {
        id: 6,
        name: "White Ash",
        origin: "Europe",
        grade: "Joinery Grade",
        desc: "Light creamy color with straight grain. Excellent shock resistance, used in sports equipment.",
        image: ashImg // <--- Using the imported variable
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
                            {/* Image Section */}
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

                            {/* Content Section */}
                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.origin}</p>
                                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>

                                {/* Button -> Contact Page */}
                                <Link
                                    to="/contact"
                                    className="block text-center w-full py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    Inquire Now
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

export default Catalog;