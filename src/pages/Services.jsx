import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, ArrowRight, X, Settings, Zap, Ruler, Clock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiniCTA from "../components/MiniCTA";

import bandsawImg from "../assets/bandsaw.jpg";
import peelingImg from "../assets/peeling.jpg";
import sizingImg from "../assets/sizing.jpg";
import verticalImg from "../assets/vertical.jpg";

const services = [
    {
        id: 1,
        name: "Horizontal Band Saw",
        capacity: "Heavy Log Cutting",
        desc: "Advanced horizontal cutting for massive logs. Ensures minimum wastage and precise thickness.",
        image: bandsawImg,
        fit: "object-cover",
        specs: {
            "Max Log Diameter": "60 Inches (5 Feet)",
            "Motor Power": "60 HP High Torque",
            "Cutting Accuracy": "+/- 1mm Precision",
            "Output": "Heavy Structural Beams"
        }
    },
    {
        id: 2,
        name: "Vertical Band Saw",
        capacity: "Resawing & Sizing",
        desc: "High-speed vertical splitting. Ideal for resizing heavy flitches and cutting beams to size.",
        image: verticalImg,
        fit: "object-contain p-2 bg-white",
        specs: {
            "Max Cutting Height": "36 Inches",
            "Blade Type": "Stellite Tipped / Bi-Metal",
            "Feed Speed": "High Speed Manual Feed",
            "Application": "Planks, Batons, Door Frames"
        }
    },
    {
        id: 5,
        name: "Log Peeling",
        capacity: "Veneer Making",
        desc: "Rotary peeling setup for converting logs into thin veneer sheets for plywood manufacturing.",
        image: peelingImg,
        fit: "object-cover",
        specs: {
            "Veneer Thickness": "0.3mm to 2.5mm",
            "Log Length": "Up to 8 Feet",
            "Core Type": "Face, Back, and Core Veneer",
            "Efficiency": "High Yield Rotary Peeling"
        }
    },
    {
        id: 6,
        name: "Custom Sizing",
        capacity: "Order to Size",
        desc: "We cut timber to your exact architectural specifications for bulk construction orders.",
        image: sizingImg,
        fit: "object-cover",
        specs: {
            "Turnaround Time": "24-48 Hours (Bulk)",
            "Minimum Order": "50 CFT",
            "Services": "Planing, Sizing, Grooving",
            "Delivery": "Direct to Site"
        }
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Sawmill Services | R.P. Goyal & Sons</title>
                {/* UPDATED META DESCRIPTION */}
                <meta name="description" content="Professional wood processing services including Band Saws & Log Peeling. Manufacturing & Processing Unit located in Gandhidham, Gujarat." />
            </Helmet>

            <Header />

            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Sawmill Services</h1>
                {/* UPDATED SUBTITLE */}
                <p className="text-stone-400 text-sm tracking-widest uppercase">State-of-the-art Processing Unit: Gandhidham, Gujarat</p>
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
                            className="group bg-[#f9f8f4] dark:bg-[#292524] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706] flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative cursor-pointer bg-white dark:bg-gray-800" onClick={() => setSelectedService(item)}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.fit}`}
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                                <div className="absolute top-4 left-4 bg-[#1c1c1c] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow-md">
                                    Service
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                <p className="text-[#d97706] text-xs font-bold uppercase tracking-widest mb-4">{item.capacity}</p>
                                <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button
                                        onClick={() => setSelectedService(item)}
                                        className="flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Eye size={16} /> Specs
                                    </button>

                                    <Link
                                        to="/contact"
                                        state={{ interest: `Book Service: ${item.name}` }}
                                        className="flex items-center justify-center gap-2 py-3 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- STANDARDIZED MODAL --- */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
                                <X size={20} />
                            </button>

                            {/* Left: Image (Standardized Size) */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-800">
                                <img src={selectedService.image} alt={selectedService.name} className={`w-full h-full ${selectedService.fit}`}/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">{selectedService.name}</h2>
                                </div>
                            </div>

                            {/* Right: Specs (Standardized Padding/Scroll) */}
                            <div className="w-full md:w-3/5 p-8 text-gray-900 dark:text-white overflow-y-auto">
                                <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-[#d97706]">Machine Specifications</h3>

                                <div className="grid grid-cols-1 gap-6 mb-8">
                                    {Object.entries(selectedService.specs).map(([key, value]) => (
                                        <div key={key} className="flex gap-4 border-b border-gray-100 dark:border-white/5 pb-4 last:border-0">
                                            <div className="bg-gray-100 dark:bg-white/5 p-2 rounded-full h-fit text-[#d97706]">
                                                {key.includes('Power') || key.includes('Efficiency') ? <Zap size={18} /> :
                                                    key.includes('Time') || key.includes('Speed') ? <Clock size={18} /> :
                                                        key.includes('Services') ? <Settings size={18} /> : <Ruler size={18} />}
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
                                    state={{ interest: `Book Service: ${selectedService.name}` }}
                                    className="block w-full py-4 bg-[#d97706] text-white text-center font-bold uppercase tracking-widest text-sm hover:bg-[#b45309] rounded transition-colors shadow-lg"
                                >
                                    Book This Service
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

export default Services;