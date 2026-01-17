import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingWA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // --- YOUR SPECIFIC DETAILS ---
    const phoneNumber = "917027602201";
    const message = "Hi, I am interested in your timber products.";
    // ----------------------------

    // 1. Show button only after scrolling down 300px to avoid Hero overlap
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false); // Close chat if we go back to top
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

                    {/* Chat Window Popup */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-[#1c1c1c] w-72 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
                            >
                                <div className="bg-[#128C7E] p-4 flex justify-between items-center">
                                    <h3 className="text-white font-serif font-bold">Chat with Us</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-white/80 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-[#292524] min-h-[100px]">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Hello! 👋 <br/>
                                        Need help with timber or pricing? Click below to chat on WhatsApp.
                                    </p>
                                </div>
                                <div className="p-3 bg-white dark:bg-[#1c1c1c] border-t border-gray-100 dark:border-white/5">
                                    <a
                                        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-medium transition-colors"
                                    >
                                        <MessageCircle size={18} />
                                        Start Chat
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Floating Button */}
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center hover:shadow-2xl transition-all focus:outline-none z-50"
                    >
                        {/* Ping Animation Layer */}
                        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping z-0" />

                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </motion.button>

                </div>
            )}
        </AnimatePresence>
    );
};

export default FloatingWA;