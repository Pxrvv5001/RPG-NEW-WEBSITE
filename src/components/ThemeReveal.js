import { useEffect, useRef } from "react";

/**
 * ThemeReveal — call this utility function from the theme toggle button.
 * It creates a View Transition API circular reveal from the button's position.
 * Falls back gracefully to instant toggle if browser doesn't support it.
 *
 * Usage:
 *   import { triggerThemeReveal } from "./ThemeReveal";
 *   <button ref={btnRef} onClick={() => triggerThemeReveal(btnRef, toggleTheme)} />
 */

export const triggerThemeReveal = (buttonRef, toggleFn) => {
    // Check for View Transitions support
    if (!document.startViewTransition || !buttonRef?.current) {
        toggleFn();
        return;
    }

    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width  / 2;
    const y = rect.top  + rect.height / 2;

    // Furthest corner from the button — so the circle covers the entire viewport
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth  - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
        toggleFn();
    });

    transition.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    });
};
