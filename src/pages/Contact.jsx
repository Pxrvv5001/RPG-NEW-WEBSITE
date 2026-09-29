import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, Trash2, ShoppingBag, Factory, Clock, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const SERVICE_ID  = "service_33iigy8";
const TEMPLATE_ID = "template_6tupee8";
const PUBLIC_KEY  = "2CAJVqXD57f_dKxP8";

const Contact = () => {
    const formRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [activeMap, setActiveMap] = useState("karnal");
    const { cart, removeFromCart, clearCart } = useCart();
    const location = useLocation();
    const initialInterest = location.state?.interest || "Bulk Timber Supply";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSendError(null);
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
            setSucceeded(true);
            clearCart();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            setSendError("Something went wrong. Please call us directly.");
        } finally {
            setSubmitting(false);
        }
    };

    if (succeeded) {
        return (
            <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
                <Header />
                <div className="min-h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center max-w-md"
                    >
                        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8">
                            <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h2>
                        <p className="text-gray-500 dark:text-stone-400 text-lg mb-10 leading-relaxed">
                            Thank you for reaching out. Our team at R.P. Goyal &amp; Sons will get back to you within 24 hours.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d97706] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#b45309] transition-all shadow-lg hover:-translate-y-1"
                        >
                            Return Home
                        </a>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#f5f4f0] dark:bg-[#161514] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Contact Us | R.P. Goyal &amp; Sons</title>
                <meta name="description" content="Get in touch with R.P. Goyal & Sons for timber and plywood enquiries." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Header />

            <div className="bg-[#1c1c1c] pt-36 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, #d97706 0, #d97706 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
                />
                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-[#d97706] text-xs font-bold uppercase tracking-[4px] mb-4">
                        Get In Touch
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        Let&apos;s Talk Business
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="text-stone-400 text-lg max-w-xl mx-auto">
                        Whether it&apos;s a bulk order or a custom requirement - we respond within 24 hours.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT PANEL */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-6">

                        <div className="bg-[#1c1c1c] rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-serif font-bold mb-8 text-white">Contact Information</h3>
                            <div className="space-y-6">
                                <a href="tel:+917027602201" className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] group-hover:bg-[#d97706] group-hover:text-white transition-all">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-0.5">Phone</p>
                                        <p className="text-white font-semibold group-hover:text-[#d97706] transition-colors">+91 70276 02201</p>
                                    </div>
                                </a>
                                <a href="mailto:rpgtimber@gmail.com" className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] group-hover:bg-[#d97706] group-hover:text-white transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-0.5">Email</p>
                                        <p className="text-white font-semibold group-hover:text-[#d97706] transition-colors">rpgtimber@gmail.com</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 border border-[#d97706]/20 flex items-center justify-center text-[#d97706]">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-0.5">Business Hours</p>
                                        <p className="text-white font-semibold">Mon - Sat, 9AM - 6PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-4">Our Locations</p>
                                <div className="space-y-3">
                                    <button onClick={() => setActiveMap("karnal")}
                                        className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${activeMap === "karnal" ? "bg-[#d97706]/15 border border-[#d97706]/30" : "hover:bg-white/5 border border-transparent"}`}>
                                        <MapPin size={16} className="text-[#d97706] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-white text-sm font-semibold">Head Office - Karnal</p>
                                            <p className="text-stone-500 text-xs mt-0.5">Imam Bara, Timber Market, Railway Road, Karnal - 132001</p>
                                        </div>
                                    </button>
                                    <button onClick={() => setActiveMap("gandhidham")}
                                        className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${activeMap === "gandhidham" ? "bg-[#d97706]/15 border border-[#d97706]/30" : "hover:bg-white/5 border border-transparent"}`}>
                                        <Factory size={16} className="text-[#d97706] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-white text-sm font-semibold">Manufacturing - Gandhidham</p>
                                            <p className="text-stone-500 text-xs mt-0.5">Survey No. 361, Mithi Rohar, Gandhidham - 370240</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 rounded-2xl overflow-hidden shadow-lg relative bg-gray-200 dark:bg-gray-800">
                            <iframe
                                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeMap === "karnal" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                title="Karnal Map"
                                src="https://maps.google.com/maps?q=R.P.+Goyal+and+Sons+Timber+Market+Karnal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                            <iframe
                                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeMap === "gandhidham" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                title="Gandhidham Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.512247553416!2d70.14704957531653!3d23.114944379109218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950bb00501fa16d%3A0xd164b322ed090fa1!2sR%20P%20Goyal%20%26%20Sons%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1769755218413!5m2!1sen!2sin"
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-3">
                        <div className="bg-white dark:bg-[#1e1d1b] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden">

                            <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Send an Enquiry</h2>
                                    <p className="text-gray-500 dark:text-stone-500 text-sm mt-1">Fill in the details and we will get back to you shortly.</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center text-[#d97706]">
                                    <Send size={20} />
                                </div>
                            </div>

                            <div className="px-8 py-8">
                                <AnimatePresence>
                                    {cart.length > 0 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                            className="mb-6 bg-amber-50 dark:bg-[#d97706]/10 rounded-xl border border-[#d97706]/25 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-[#d97706]/15 flex items-center gap-2">
                                                <ShoppingBag size={14} className="text-[#d97706]" />
                                                <span className="text-[#d97706] text-xs font-bold uppercase tracking-widest">Items Selected for Quote</span>
                                            </div>
                                            <div className="p-4 space-y-2 max-h-36 overflow-y-auto">
                                                {cart.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                                        <span>{item.name} <span className="text-xs text-stone-400">({item.grade})</span></span>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1 rounded transition-colors">
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="contact_name" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-stone-500">Full Name *</label>
                                            <input id="contact_name" type="text" name="from_name" required placeholder="e.g. Ramesh Kumar"
                                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-[#141312] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="contact_phone" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-stone-500">Phone *</label>
                                            <input id="contact_phone" type="tel" name="phone" required placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-[#141312] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="contact_email" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-stone-500">Email Address *</label>
                                        <input id="contact_email" type="email" name="from_email" required placeholder="yourmail@example.com"
                                            className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-[#141312] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all" />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="contact_interest" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-stone-500">Interested In</label>
                                        <div className="relative">
                                            <select id="contact_interest" name="interest" defaultValue={initialInterest}
                                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-[#141312] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all appearance-none cursor-pointer">
                                                <option value="Bulk Timber Supply">Bulk Timber Supply</option>
                                                <option value="Core Veneer">Core Veneer</option>
                                                <option value="Plywood & Laminates">Plywood &amp; Laminates</option>
                                                <option value="Sawmill Services">Sawmill Services</option>
                                                <option value="Other Inquiry">Other Inquiry</option>
                                            </select>
                                            <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="contact_message" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-stone-500">Your Message *</label>
                                        <textarea id="contact_message" name="message" required rows="4"
                                            placeholder="Tell us about your requirements - species, volume, thickness, etc."
                                            defaultValue={cart.length > 0 ? `I am interested in a quote for:\n${cart.map(i => `- ${i.name} (${i.category})`).join("\n")}` : ""}
                                            className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-[#141312] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 transition-all resize-none leading-relaxed" />
                                    </div>

                                    {sendError && (
                                        <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg py-2 px-4">
                                            {sendError}
                                        </p>
                                    )}

                                    <button type="submit" disabled={submitting}
                                        className="w-full py-4 bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-lg hover:shadow-[#d97706]/30 hover:-translate-y-0.5 flex items-center justify-center gap-3">
                                        {submitting ? (
                                            <>
                                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <><Send size={16} /> Send Enquiry</>
                                        )}
                                    </button>

                                    <p className="text-center text-[11px] text-gray-400 dark:text-stone-600 flex items-center justify-center gap-1.5">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        Your information is confidential and never shared.
                                    </p>

                                </form>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;

