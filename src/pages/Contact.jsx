import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, Trash2, ShoppingBag, Factory } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Contact = () => {
    const [state, handleSubmit] = useForm("mykgkgjq");
    const { cart, removeFromCart } = useCart();

    // Toggle between maps
    const [activeMap, setActiveMap] = useState("karnal");

    const location = useLocation();
    const initialInterest = location.state?.interest || "Bulk Timber Supply";

    const cartMessage = cart.length > 0
        ? `I am interested in a quote for the following items:\n${cart.map(i => `- ${i.name} (${i.category})`).join('\n')}`
        : "";

    useEffect(() => {
        if (state.succeeded) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [state.succeeded]);

    if (state.succeeded) {
        return (
            <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
                <Header />
                <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-12 shadow-lg"
                    >
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-green-800 dark:text-green-400 mb-4">Message Received!</h2>
                        <p className="text-green-700 dark:text-green-300 text-lg mb-8">
                            Thank you for contacting R.P. Goyal & Sons. We have received your inquiry and will respond within 24 hours.
                        </p>
                        <a href="/" className="px-8 py-3 bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded hover:bg-[#d97706] transition-colors">
                            Return Home
                        </a>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Contact Us | R.P. Goyal & Sons</title>
                <meta name="description" content="Visit us at our Karnal Head Office or Gandhidham Manufacturing Unit. Get a quote for timber and plywood today." />
            </Helmet>

            <Header />

            <div className="bg-[#1c1c1c] pt-32 pb-12 px-6 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Contact Us</h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">We are here to help with your timber needs</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT COLUMN: Contact Info & Maps */}
                <div className="space-y-8">
                    <div className="bg-[#f9f8f4] dark:bg-[#292524] dark:border-white/5 p-8 rounded-xl border border-gray-200 transition-colors duration-500">
                        <h3 className="text-2xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-6">Our Locations</h3>

                        <div className="space-y-6">
                            {/* LOCATION 1: KARNAL */}
                            <div
                                onClick={() => setActiveMap("karnal")}
                                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border ${activeMap === 'karnal' ? 'bg-white dark:bg-black/20 border-[#d97706] shadow-sm' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <div className={`p-3 rounded-full ${activeMap === 'karnal' ? 'bg-[#d97706] text-white' : 'bg-[#d97706]/10 text-[#d97706]'}`}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        Head Office (Karnal)
                                        {activeMap === 'karnal' && <span className="text-[10px] bg-[#d97706] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Active Map</span>}
                                    </h4>
                                    <p className="text-gray-600 dark:text-stone-400 text-sm mt-1">Imam Bara, Timber Market, Railway Road,<br />Karnal, Haryana - 132001</p>
                                </div>
                            </div>

                            {/* LOCATION 2: GANDHIDHAM */}
                            <div
                                onClick={() => setActiveMap("gandhidham")}
                                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border ${activeMap === 'gandhidham' ? 'bg-white dark:bg-black/20 border-[#d97706] shadow-sm' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <div className={`p-3 rounded-full ${activeMap === 'gandhidham' ? 'bg-[#d97706] text-white' : 'bg-[#d97706]/10 text-[#d97706]'}`}>
                                    <Factory size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        Manufacturing Unit
                                        {activeMap === 'gandhidham' && <span className="text-[10px] bg-[#d97706] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Active Map</span>}
                                    </h4>
                                    {/* UPDATED PIN CODE HERE */}
                                    <p className="text-gray-600 dark:text-stone-400 text-sm mt-1">
                                        Survey No. 361, Mithi Rohar, <br />Gandhidham, Gujarat - 370240
                                    </p>
                                </div>
                            </div>

                            {/* CONTACT DETAILS */}
                            <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <Phone size={20} className="text-[#d97706]" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">+91 70276 02201</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail size={20} className="text-[#d97706]" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">rpgtimber@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC MAP CONTAINER */}
                    <div className="h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 transition-all duration-500 relative bg-gray-100">
                        {/* MAP FOR KARNAL */}
                        <iframe
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeMap === 'karnal' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            title="Karnal Map"
                            src="https://maps.google.com/maps?q=R.P.+Goyal+and+Sons+Timber+Market+Karnal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* MAP FOR GANDHIDHAM - Includes the WORKING EMBED LINK */}
                        <iframe
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeMap === 'gandhidham' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            title="Gandhidham Map"
                            // This is the generic working link for Gandhidham.
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.512247553416!2d70.14704957531653!3d23.114944379109218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950bb00501fa16d%3A0xd164b322ed090fa1!2sR%20P%20Goyal%20%26%20Sons%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1769755218413!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* RIGHT COLUMN: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-[#292524] p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-[#d97706] transition-colors duration-500"
                >
                    <h3 className="text-2xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-2">Send an Inquiry</h3>
                    <p className="text-gray-500 dark:text-stone-400 text-sm mb-8">Fill out the form below and our sales team will get back to you within 24 hours.</p>

                    {/* CART DISPLAY SECTION */}
                    {cart.length > 0 && (
                        <div className="mb-8 bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-[#d97706]/30">
                            <div className="flex items-center gap-2 mb-3 text-[#d97706]">
                                <ShoppingBag size={16} />
                                <h4 className="font-bold uppercase text-xs tracking-widest">Selected Items for Quote</h4>
                            </div>
                            <div className="space-y-2 mb-2 max-h-40 overflow-y-auto pr-2">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-2 last:border-0">
                                        <span>{item.name} <span className="text-xs text-stone-500">({item.grade})</span></span>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                                            <Trash2 size={14}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-stone-400 mb-2">Your Name</label>
                                <input id="name" type="text" name="name" required className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="Enter Your Name" />
                                <ValidationError prefix="Name" field="name" errors={state.errors} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-stone-400 mb-2">Phone Number</label>
                                <input id="phone" type="tel" name="phone" required className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="+91 98..." />
                                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-stone-400 mb-2">Email Address</label>
                            <input id="email" type="email" name="email" required className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="john@company.com" />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-stone-400 mb-2">Interested In</label>
                            <select id="interest" name="interest" defaultValue={initialInterest} className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all">
                                <option value="Bulk Timber Supply">Bulk Timber Supply</option>
                                <option value="Plywood & Laminates">Plywood & Laminates</option>
                                <option value="Sawmill Services">Sawmill Services</option>
                                <option value="Other Inquiry">Other Inquiry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-stone-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                defaultValue={cartMessage}
                                className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                                placeholder="Tell us about your requirements..."
                            ></textarea>
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </div>

                        <button type="submit" disabled={state.submitting} className="w-full bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                            {state.submitting ? "Sending..." : (<>Send Message <Send size={18} /></>)}
                        </button>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;