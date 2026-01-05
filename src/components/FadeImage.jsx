import { useState } from "react";
import { motion } from "framer-motion";

const FadeImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className} bg-gray-200 dark:bg-gray-800`}>
            {/* Placeholder Pulse (Visible while loading) */}
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 z-10" />
            )}

            {/* Actual Image (Hidden until loaded) */}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'scale-100' : 'scale-110'}`}
            />
        </div>
    );
};

export default FadeImage;