import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingWA = () => {
    return (
        <motion.a
            href="https://wa.me/917027602201?text=Hi,%20I%20am%20interested%20in%20your%20timber%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-14 right-6 z-[100] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />

            <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 rounded-full shadow-xl shadow-green-500/40 border border-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle size={28} color="white" fill="white" />
            </div>
        </motion.a>
    );
};

export default FloatingWA;