import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiniCTA from "../components/MiniCTA"; // <--- IMPORT

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
        fit: "object-cover"
    },
    {
        id: 2,
        name: "Vertical Band Saw",
        capacity: "Resawing & Sizing",
        desc: "High-speed vertical splitting. Ideal for resizing heavy flitches and cutting beams to custom structural sizes.",
        image: verticalImg,
        fit: "object-contain p-2 bg-white"
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
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Sawmill Services | R.P. Goyal & Sons</title>
                <meta name="description" content="Professional wood processing services: Horizontal & Vertical Band Saws, Log Peeling, and Custom Sizing." />
            </Helmet>

            <Header />

            {/* Header: Dark Stone Border */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Sawmill Services</h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">Processing Facility & Treatment Plant</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            // Card BG: Dark Stone (#292524)
                            className="group bg-[#f9f8f4] dark:bg-[#292524] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            <div className="h-64 overflow-hidden relative bg-white dark:bg-gray-800">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.fit}`}
                                />
                                <div className="absolute top-4 left-4 bg-[#1c1c1c] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow-md">
                                    Service
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.capacity}</p>
                                <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                <Link
                                    to="/contact"
                                    state={{ interest: "Sawmill Services" }}
                                    className="block text-center w-full py-3 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    Book Service
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

export default Services;