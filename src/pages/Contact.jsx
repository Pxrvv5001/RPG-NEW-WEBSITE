// 1. IMPORT useEffect
import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
    // ▼▼▼ PASTE YOUR FORMSPREE ID HERE AGAIN ▼▼▼
    const [state, handleSubmit] = useForm("mykgkgjq");

    // 2. ADD THIS "SCROLL WATCHER"
    useEffect(() => {
        if (state.succeeded) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [state.succeeded]);

    // 3. SUCCESS MESSAGE VIEW
    if (state.succeeded) {
        return (
            <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
                <Header />
                <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-12 shadow-lg"
                    >
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
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

    // 4. NORMAL FORM VIEW
    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Header />

            {/* Page Header */}
            <div className="bg-[#1c1c1c] pt-32 pb-12 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Contact Us</h1>
                <p className="text-slate-400 text-sm tracking-widest uppercase">We are here to help with your timber needs</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LEFT COLUMN: Contact Info */}
                <div className="space-y-8">
                    <div className="bg-[#f9f8f4] dark:bg-[#1e293b] dark:border-slate-700 p-8 rounded-xl border border-gray-200 transition-colors duration-500">
                        <h3 className="text-2xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-6">Get in Touch</h3>

                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Head Office</h4>
                                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                                        Imam Bara, Timber Market, Railway Road,<br />
                                        Karnal, Haryana - 132001
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Phone</h4>
                                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">+91 98765 43210</p>
                                    <p className="text-gray-500 dark:text-slate-500 text-xs mt-1">Mon-Sat, 9am - 8pm</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#d97706]/10 p-3 rounded-full text-[#d97706]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
                                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">rpgtimber@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Embed - Fixed Grayscale */}
                    <div className="h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.087943713134!2d76.98218497533058!3d29.688229875104927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e7022e3722017%3A0x42af99a573aa933!2s1493%2C%20Sadar%20Bazar%20Rd%2C%20Ramesh%20Nagar%2C%20Karnal%2C%20Haryana%20132001!5e0!3m2!1sen!2sin!4v1766591456771!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* RIGHT COLUMN: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-[#1e293b] p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-[#d97706] transition-colors duration-500"
                >
                    <h3 className="text-2xl font-serif font-bold text-[#1c1c1c] dark:text-white mb-2">Send an Inquiry</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">Fill out the form below and our sales team will get back to you within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">Your Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                                    placeholder="Parv Goyal"
                                />
                                <ValidationError prefix="Name" field="name" errors={state.errors} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                                    placeholder="+91 98..."
                                />
                                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                                placeholder="john@company.com"
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">Interested In</label>
                            <select
                                id="interest"
                                name="interest"
                                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                            >
                                <option>Bulk Timber Supply</option>
                                <option>Plywood & Laminates</option>
                                <option>Sawmill Services</option>
                                <option>Other Inquiry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded p-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all"
                                placeholder="Tell us about your requirements..."
                            ></textarea>
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </div>

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full bg-[#1c1c1c] dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-[#d97706] dark:hover:bg-[#d97706] dark:hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {state.submitting ? "Sending..." : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;