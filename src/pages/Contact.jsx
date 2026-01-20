import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, Trash2, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Import Cart
import { useCart } from "../context/CartContext";

const Contact = () => {
    // PASTE YOUR FORMSPREE ID HERE
    const [state, handleSubmit] = useForm("mykgkgjq");

    // Get Cart Data
    const { cart, removeFromCart } = useCart();

    const location = useLocation();
    const initialInterest = location.state?.interest || "Bulk Timber Supply";

    // Auto-generate message from cart
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
                <meta name="description" content="Get in touch for timber inquiries, sawmill services, or plywood orders. Located in Karnal, Haryana." />
            </Helmet>

            <Header />

            <div className="bg-[#1c1c1c] pt-32 pb-12 px-6 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Contact Us</h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">We are here to help with your timber needs</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT COLUMN: Contact Info */}
                <div className="space-y-8">
                    <div className="bg-[#f9f8f4] dark:bg-[#292524] dark:border-white/5 p-8 rounded-xl border border-gray-200 transition-colors duration-500">
                        <h3 className="text-2xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]"><MapPin size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Head Office</h4>
                                    <p className="text-gray-600 dark:text-stone-400 text-sm mt-1">Imam Bara, Timber Market, Railway Road,<br />Karnal, Haryana - 132001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]"><Phone size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Phone</h4>
                                    <p className="text-gray-600 dark:text-stone-400 text-sm mt-1">+91 70276 02201</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]"><Mail size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
                                    <p className="text-gray-600 dark:text-stone-400 text-sm mt-1">rpgtimber@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 transition-all duration-500">
                        <iframe title="Karnal Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216.63054829712888!2d76.9847227033182!3d29.688205837308004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e7022e3089c75%3A0x278c784abefd48a3!2sR%20P%20Goyal%20%26%20Sons%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1766596304282!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
                                <input id="name" type="text" name="name" required className="w-full bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="Parv Goyal" />
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
                                // PRE-FILL LOGIC HERE
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