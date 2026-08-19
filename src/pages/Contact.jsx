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
    const { cart, removeFromCart, clearCart } = useCart();

    // Toggle between maps
    const [activeMap, setActiveMap] = useState("karnal");

    const location = useLocation();
    const initialInterest = location.state?.interest || "Bulk Timber Supply";

    const cartMessage = cart.length > 0
        ? `I am interested in a quote for the following items:\n${cart.map(i => `- ${i.name} (${i.category})`).join('\n')}`
        : "";

    useEffect(() => {
        if (state.succeeded) {
            clearCart();
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.512247553416!2d70.14704957531653!3d23.114944379109218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950bb00501fa16d%3A0xd164b322ed090fa1!2sR%20P%20Goyal%20%26%20Sons%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1769755218413!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* RIGHT COLUMN: Premium Enquiry Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-[#232120] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-500"
                >
                    {/* Form Header Banner */}
                    <div className="bg-gradient-to-r from-[#1c1c1c] to-[#2e2b28] px-8 py-7 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-white tracking-tight">Send an Enquiry</h3>
                            <p className="text-stone-400 text-xs mt-1 tracking-wide">Our sales team responds within 24 hours</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#d97706]/15 border border-[#d97706]/30 flex items-center justify-center shrink-0">
                            <Send size={18} className="text-[#d97706]" />
                        </div>
                    </div>

                    <div className="px-8 py-8">

                        {/* CART DISPLAY SECTION */}
                        {cart.length > 0 && (
                            <div className="mb-6 bg-amber-50 dark:bg-[#d97706]/10 p-4 rounded-xl border border-[#d97706]/30">
                                <div className="flex items-center gap-2 mb-3 text-[#d97706]">
                                    <ShoppingBag size={15} />
                                    <h4 className="font-bold uppercase text-xs tracking-widest">Selected Items for Quote</h4>
                                </div>
                                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 border-b border-[#d97706]/10 pb-2 last:border-0">
                                            <span>{item.name} <span className="text-xs text-stone-400">({item.grade})</span></span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1 rounded transition-colors">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Row 1: Name + Phone — floating labels */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Full Name */}
                                <div className="relative">
                                    <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-400 dark:text-stone-500 transition-all duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </span>
                                    <input
                                        id="name" type="text" name="name" required
                                        placeholder=" "
                                        className="peer w-full pt-5 pb-2 pl-9 pr-4 text-sm bg-gray-50 dark:bg-[#1a1918] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all"
                                    />
                                    <label htmlFor="name" className="absolute left-9 top-2 text-[10px] font-bold uppercase tracking-widest text-[#d97706] opacity-0 peer-focus:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-100 transition-all duration-200 pointer-events-none">
                                        Full Name <span>*</span>
                                    </label>
                                    <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-stone-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#d97706] peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:text-[#d97706] transition-all duration-200 pointer-events-none">
                                        Full Name
                                    </span>
                                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-400 dark:text-stone-500 transition-all duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0">
                                        <Phone size={15} />
                                    </span>
                                    <input
                                        id="phone" type="tel" name="phone" required
                                        placeholder=" "
                                        className="peer w-full pt-5 pb-2 pl-9 pr-4 text-sm bg-gray-50 dark:bg-[#1a1918] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all"
                                    />
                                    <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-stone-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#d97706] peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:text-[#d97706] transition-all duration-200 pointer-events-none">
                                        Phone *
                                    </span>
                                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                                </div>
                            </div>

                            {/* Email — floating label */}
                            <div className="relative">
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-400 dark:text-stone-500 transition-all duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0">
                                    <Mail size={15} />
                                </span>
                                <input
                                    id="email" type="email" name="email" required
                                    placeholder=" "
                                    className="peer w-full pt-5 pb-2 pl-9 pr-4 text-sm bg-gray-50 dark:bg-[#1a1918] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all"
                                />
                                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-stone-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#d97706] peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:text-[#d97706] transition-all duration-200 pointer-events-none">
                                    Email Address *
                                </span>
                                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Interested In — floating label on select */}
                            <div className="relative">
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-400 dark:text-stone-500">
                                    <ShoppingBag size={15} />
                                </span>
                                <select
                                    id="interest" name="interest" defaultValue={initialInterest}
                                    className="peer w-full pt-5 pb-2 pl-9 pr-8 text-sm bg-gray-50 dark:bg-[#1a1918] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Bulk Timber Supply">Bulk Timber Supply</option>
                                    <option value="Plywood & Laminates">Plywood &amp; Laminates</option>
                                    <option value="Sawmill Services">Sawmill Services</option>
                                    <option value="Other Inquiry">Other Inquiry</option>
                                </select>
                                {/* Always-floated label for select (it always has a value) */}
                                <span className="absolute left-9 top-2 text-[10px] font-bold uppercase tracking-widest text-[#d97706] pointer-events-none">
                                    Interested In
                                </span>
                                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 dark:text-stone-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                                </span>
                            </div>

                            {/* Section Divider */}
                            <div className="flex items-center gap-3 py-1">
                                <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
                                <span className="text-[10px] text-gray-400 dark:text-stone-600 uppercase tracking-widest font-semibold whitespace-nowrap">Your Message</span>
                                <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
                            </div>

                            {/* Message — floating label on textarea */}
                            <div className="relative">
                                <textarea
                                    id="message" name="message" required rows="4"
                                    defaultValue={cartMessage}
                                    placeholder=" "
                                    className="peer w-full pt-6 pb-3 px-4 text-sm bg-gray-50 dark:bg-[#1a1918] border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all resize-none leading-relaxed"
                                />
                                <span className="absolute left-4 top-3.5 text-sm text-gray-400 dark:text-stone-500 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#d97706] peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:text-[#d97706] transition-all duration-200 pointer-events-none">
                                    Message *
                                </span>
                                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="btn-enquiry w-full py-3.5 rounded-lg font-bold uppercase tracking-widest text-sm text-white flex items-center justify-center gap-2.5"
                            >
                                {state.submitting ? (
                                    <>
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>Send Enquiry <Send size={15} /></>
                                )}
                            </button>

                            {/* Trust Badge */}
                            <p className="text-center text-[11px] text-gray-400 dark:text-stone-600 flex items-center justify-center gap-1.5 pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                Your information is confidential and never shared.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;