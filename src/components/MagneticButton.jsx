import { useRef, useState } from "react";

/**
 * MagneticButton — wraps any children.
 * On hover within `radius` px of the element center,
 * the element gently pulls toward the cursor (magnetic snap).
 * Desktop only — touch events are ignored.
 */
const MagneticButton = ({ children, radius = 80, strength = 0.38, className = "", ...props }) => {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const onMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
            setActive(true);
            setPos({ x: dx * strength, y: dy * strength });
        } else {
            setActive(false);
            setPos({ x: 0, y: 0 });
        }
    };

    const onLeave = () => {
        setActive(false);
        setPos({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                transition: active
                    ? "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)"
                    : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                display: "inline-block",
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default MagneticButton;
