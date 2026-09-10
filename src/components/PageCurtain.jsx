import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * PageCurtain
 *
 * Flow on EVERY page mount:
 *  1. Curtain starts at y=0 (covering the entire screen)
 *  2. After 120ms delay → slides up to y=-110% revealing the page (650ms)
 *  3. RPG monogram pulses briefly while curtain is covering
 *  4. Page content fades in while curtain is lifting
 *
 * Flow on EXIT (mode="wait"):
 *  - Content instantly fades out (300ms)
 *  - New page mounts → starts from step 1 above (curtain covering)
 *
 * This gives a cinematic ~750ms reveal on every navigation.
 */
const PageCurtain = ({ children }) => {
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const [curtainGone, setCurtainGone] = useState(false);

    // Home page has its own branding splash — no curtain needed
    if (isHome) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className="relative">

            {/* ── CURTAIN ── starts covering, slides upward to reveal */}
            {!curtainGone && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#0a0a0a] pointer-events-none flex items-center justify-center"
                    initial={{ y: "0%" }}
                    animate={{ y: "-110%" }}
                    transition={{
                        duration: 0.75,
                        delay: 0.15,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    onAnimationComplete={() => setCurtainGone(true)}
                >
                    {/* RPG monogram — pulses while curtain is up */}
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.15em" }}
                        animate={{ opacity: [0, 1, 1, 0], letterSpacing: ["0.15em", "0.28em", "0.28em", "0.28em"] }}
                        transition={{ times: [0, 0.25, 0.65, 1], duration: 0.75 }}
                        className="text-[#d97706] font-serif font-bold text-3xl md:text-5xl select-none"
                    >
                        RPG
                    </motion.span>
                </motion.div>
            )}

            {/* ── CONTENT ── fades in timed with curtain lifting */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
                transition={{ duration: 0.45, delay: 0.55 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default PageCurtain;
