import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ▼▼▼ IMPORT YOUR IMAGES HERE ▼▼▼
import bandsawImg from "../assets/bandsaw.jpg";
import chemicalImg from "../assets/chemical.jpg";
import seasoningImg from "../assets/seasoning.jpg";
import planingImg from "../assets/planing.jpg";
import peelingImg from "../assets/peeling.jpg";
import sizingImg from "../assets/sizing.jpg";

const services = [
    {
        id: 1,
        name: "Horizontal Band Saw",
        capacity: "Precision Cutting",
        desc: "Advanced horizontal cutting for massive logs. Ensures minimum wastage and precise thickness.",
        image: bandsawImg
    },
    {
        id: 2,
        name: "Chemical Treatment",
        capacity: "Termite Proofing",
        desc: "Vacuum pressure impregnation plant to treat wood against termites, fungus, and borers.",
        image: chemicalImg
    },
    {
        id: 3,
        name: "Kiln Seasoning",
        capacity: "Moisture Control",
        desc: "Computerized steam seasoning chambers to reduce wood moisture content to standard levels.",
        image: seasoningImg
    },
    {
        id: 4,
        name: "Surface Planing",
        capacity: "Finishing",
        desc: "High-speed planing machines to smooth rough timber surfaces for immediate joinery use.",
        image: planingImg
    },
    {
        id: 5,
        name: "Log Peeling",
        capacity: "Veneer Making",
        desc: "Rotary peeling setup for converting logs into thin veneer sheets for plywood manufacturing.",
        image: peelingImg
    },
    {
        id: 6,
        name: "Custom Sizing",
        capacity: "Order to Size",
        desc: "We cut timber to your exact architectural specifications for bulk construction orders.",
        image: sizingImg
    }
];

const Services = () => {
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Header />

            {/* Hero Header */}
            <div className="bg-[#1e293b] pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Sawmill Services</h1>
                <p className="text-blue-200 text-sm tracking-widest uppercase">Processing Facility & Treatment Plant</p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-[#f9f8f4] dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#d97706]"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                <div className="absolute top-4 left-4 bg-[#1e293b] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
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