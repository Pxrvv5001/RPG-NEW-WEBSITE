import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTopButton — replaces the old no-op ScrollToTop.
 * Shows after 400px scroll. Has a circular SVG progress ring
 * that fills as you scroll down the page.
 */
const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // SVG circle math
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = useTransform(
        smoothProgress,
        [0, 1],
        [circumference, 0]
    );

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-to-top"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-24 right-6 z-50 w-14 h-14 flex items-center justify-center focus:outline-none"
                    aria-label="Scroll to top"
                >
            {/* Progress ring SVG */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 56 56"
            >
                {/* Track */}
                <circle
                    cx="28" cy="28" r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/20 dark:text-white/10"
                />
                {/* Progress */}
                <motion.circle
                    cx="28" cy="28" r={radius}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                />
            </svg>

            {/* Inner button face */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-[#1c1c1c] dark:bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center shadow-lg"
            >
                <ArrowUp size={16} className="text-white" />
            </motion.div>
        </motion.button>
    )}
</AnimatePresence>
    );
};

export default ScrollToTopButton;
