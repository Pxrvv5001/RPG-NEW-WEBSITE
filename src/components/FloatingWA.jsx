import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingWA = () => {
    return (
        <motion.a
            /* ▼▼▼ REPLACE WITH YOUR PHONE NUMBER ▼▼▼ */
            href="https://wa.me/917027602201?text=Hi,%20I%20am%20interested%20in%20your%20timber%20products."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center hover:shadow-green-500/30 border-2 border-white/20"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} fill="white" className="text-white" />
        </motion.a>
    );
};

export default FloatingWA;