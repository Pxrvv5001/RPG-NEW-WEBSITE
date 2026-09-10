import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — Desktop only (pointer: fine devices).
 * Uses mix-blend-mode: difference so the cursor is always visible
 * regardless of background — black bg → white cursor, white bg → black cursor.
 * No theme detection needed.
 */
const CustomCursor = () => {
    const [isFine] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(pointer: fine)").matches
            : false
    );

    const [visible,  setVisible]  = useState(false);
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);

    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    const ringX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.4 });
    const ringY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.4 });

    useEffect(() => {
        if (!isFine) return;

        const isInteractive = (el) => {
            if (!el || typeof el.closest !== "function") return false;
            return Boolean(
                el.closest("a, button, [data-cursor], input, select, textarea, label, [role='button']")
            );
        };

        const move = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setVisible(true);
            setHovering(isInteractive(e.target));
        };

        const onScroll = () => {
            const x = mouseX.get();
            const y = mouseY.get();
            if (x >= 0 && y >= 0) {
                const el = document.elementFromPoint(x, y);
                setHovering(isInteractive(el));
            }
        };

        const down  = () => setClicking(true);
        const up    = () => setClicking(false);
        const leave = () => { setVisible(false); setHovering(false); };
        const enter = () => setVisible(true);

        window.addEventListener("mousemove",  move, { passive: true });
        window.addEventListener("scroll",     onScroll, { passive: true });
        window.addEventListener("mousedown",  down);
        window.addEventListener("mouseup",    up);
        window.addEventListener("blur",       leave);
        document.documentElement.addEventListener("mouseleave", leave);
        document.documentElement.addEventListener("mouseenter", enter);

        return () => {
            window.removeEventListener("mousemove",  move);
            window.removeEventListener("scroll",     onScroll);
            window.removeEventListener("mousedown",  down);
            window.removeEventListener("mouseup",    up);
            window.removeEventListener("blur",       leave);
            document.documentElement.removeEventListener("mouseleave", leave);
            document.documentElement.removeEventListener("mouseenter", enter);
        };
    }, [isFine]);

    if (!isFine) return null;

    return (
        <>
            {/* ── RING — spring lag, mix-blend-mode: difference ── */}
            <motion.div
                className="fixed top-0 left-0 rounded-full border-2 border-white pointer-events-none z-[9999]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 38,
                    height: 38,
                    mixBlendMode: "difference",
                    viewTransitionName: "cursor-ring",
                }}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale: clicking ? 0.6 : hovering ? 1.7 : 1,
                }}
                transition={{
                    opacity: { duration: 0.18 },
                    scale: { type: "spring", stiffness: 300, damping: 22 },
                }}
            />

            {/* ── DOT — exact position, mix-blend-mode: difference ── */}
            <motion.div
                className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 8,
                    height: 8,
                    mixBlendMode: "difference",
                    viewTransitionName: "cursor-dot",
                }}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale: clicking ? 0.4 : hovering ? 3.5 : 1,
                }}
                transition={{
                    opacity: { duration: 0.18 },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
            />
        </>
    );
};

export default CustomCursor;
