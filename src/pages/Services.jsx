import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ▼▼▼ IMPORT IMAGES ▼▼▼
import bandsawImg from "../assets/bandsaw.jpg";
import peelingImg from "../assets/peeling.jpg";
import sizingImg from "../assets/sizing.jpg";
import verticalImg from "../assets/vertical.jpg";

const services = [
    {
        id: 1,
        name: "Horizontal Band Saw",
        capacity: "Heavy Log Cutting",
        desc: "Advanced horizontal cutting for massive logs. Ensures minimum wastage and precise thickness for base production.",
        image: bandsawImg,
        fit: "object-cover" // Standard landscape fit
    },
    {
        id: 2,
        name: "Vertical Band Saw",
        capacity: "Resawing & Sizing",
        desc: "High-speed vertical splitting. Ideal for resizing heavy flitches and cutting beams to custom structural sizes.",
        image: verticalImg,
        fit: "object-contain p-2 bg-white" // <--- FIXED: Shows full vertical image with padding
    },
    {
        id: 5,
        name: "Log Peeling",
        capacity: "Veneer Making",
        desc: "Rotary peeling setup for converting logs into thin veneer sheets for plywood manufacturing.",
        image: peelingImg,
        fit: "object-cover"
    },
    {
        id: 6,
        name: "Custom Sizing",
        capacity: "Order to Size",
        desc: "We cut timber to your exact architectural specifications for bulk construction orders.",
        image: sizingImg,
        fit: "object-cover"
    }
];

const Services = () => {
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Sawmill Services | R.P. Goyal & Sons</title>
                <meta name="description" content="Professional wood processing services: Horizontal & Vertical Band Saws, Log Peeling, and Custom Sizing." />
            </Helmet>

            <Header />

            {/* Hero Header */}
            <div className="bg-[#1e293b] pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Sawmill Services</h1>
                <p className="text-blue-200 text-sm tracking-widest uppercase">Processing Facility & Treatment Plant</p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-[#f9f8f4] dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            {/* Image Container */}
                            <div className="h-64 overflow-hidden relative bg-white dark:bg-gray-800">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    // ▼▼▼ FIXED: Uses dynamic 'fit' class per item ▼▼▼
                                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.fit}`}
                                />
                                <div className="absolute top-4 left-4 bg-[#1e293b] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow-md">
                                    Service
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">{item.capacity}</p>
                                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                {/* Button -> Contact Page */}
                                <Link
                                    to="/contact"
                                    state={{ interest: "Sawmill Services" }}
                                    className="block text-center w-full py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1e293b] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    Book Service
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

export default Services;