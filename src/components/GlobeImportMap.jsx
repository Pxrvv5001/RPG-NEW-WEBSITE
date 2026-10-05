import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import * as d3 from "d3";
import { importRoutes } from "./WorldImportMap";
import { useTheme } from "../context/ThemeContext";

// Gandhidham / Mundra Port, India
const INDIA_COORDS = [70.13, 23.08];

// Optimal responsive globe size helper: larger, bold, and fills mobile screens cleanly
const getOptimalGlobeSize = (custom) => {
  if (custom) return custom;
  if (typeof window === "undefined") return 360;
  const w = window.innerWidth;
  if (w < 360) return Math.max(280, w - 24);
  if (w < 400) return w - 28;
  if (w < 768) return Math.min(380, w - 32);
  return 420;
};

// Theme-aware color palette aligned with site's Orange / Black / White theme
const getColors = (isDark) => ({
  ocean: isDark ? "#09090b" : "#ffffff",
  oceanBorder: isDark ? "rgba(245,158,11,0.35)" : "rgba(217,119,6,0.35)",
  graticule: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
  land: isDark ? "#1c1c21" : "#e5e7eb",
  landStroke: isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)",
  label: isDark ? "#ffffff" : "#09090b",
  labelAlpha: isDark ? 0.95 : 0.95,
  hintText: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
  tooltipBg: isDark ? "rgba(18,18,22,0.96)" : "rgba(255,255,255,0.96)",
  tooltipBorder: isDark ? "rgba(245,158,11,0.35)" : "rgba(217,119,6,0.35)",
  tooltipText: isDark ? "#ffffff" : "#09090b",
  mundraLabel: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
});

export default function GlobeImportMap({ className = "", size: customSize }) {
  const canvasRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [globeSize, setGlobeSize] = useState(() => getOptimalGlobeSize(customSize));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, route: null });

  // Handle window resizing
  useEffect(() => {
    if (customSize) {
      setGlobeSize(customSize);
      return;
    }
    const onResize = () => {
      setGlobeSize(getOptimalGlobeSize());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [customSize]);

  // Ref so render loop always reads latest theme without re-mounting
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentSize = globeSize;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = currentSize * dpr;
    canvas.height = currentSize * dpr;
    canvas.style.width = `${currentSize}px`;
    canvas.style.height = `${currentSize}px`;

    const context = canvas.getContext("2d");
    context.scale(dpr, dpr);

    // Matches the canvas circle outline edge-to-edge
    const radius = currentSize / 2 - 1.5;

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([currentSize / 2, currentSize / 2])
      .clipAngle(90)
      .rotate([-30, -15]);

    const path = d3.geoPath().projection(projection).context(context);

    // Pre-build great-circle arc coordinates
    const arcFeatures = importRoutes.map((r) => ({
      ...r,
      arcCoords: (() => {
        const pts = [];
        const interp = d3.geoInterpolate(r.coords, INDIA_COORDS);
        for (let i = 0; i <= 60; i++) pts.push(interp(i / 60));
        return pts;
      })(),
    }));

    let landFeatures = null;
    let animFrame;
    let arcProgress = 0;
    let arcStartTime = null;
    const ARC_DURATION = 3000;

    const rotation = [-30, -15];
    let autoRotate = true;
    let dragging = false;
    let dragStart = null;
    let dragRotStart = null;

    // -- Main render loop ------------------------------------------------------
    const render = (ts) => {
      const C = getColors(isDarkRef.current);

      if (inView) {
        if (arcStartTime === null) arcStartTime = ts;
        arcProgress = Math.min((ts - arcStartTime) / ARC_DURATION, 1);
      }

      context.clearRect(0, 0, currentSize, currentSize);

      // Ocean sphere
      context.beginPath();
      context.arc(currentSize / 2, currentSize / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = C.ocean;
      context.fill();

      // Border ring
      context.beginPath();
      context.arc(currentSize / 2, currentSize / 2, radius, 0, 2 * Math.PI);
      context.strokeStyle = C.oceanBorder;
      context.lineWidth = 1.5;
      context.stroke();

      if (landFeatures) {
        // Graticule grid
        context.beginPath();
        path(d3.geoGraticule()());
        context.strokeStyle = C.graticule;
        context.lineWidth = 0.6;
        context.stroke();

        // Land fill
        context.beginPath();
        landFeatures.features.forEach((f) => path(f));
        context.fillStyle = C.land;
        context.fill();

        // Land outline
        context.beginPath();
        landFeatures.features.forEach((f) => path(f));
        context.strokeStyle = C.landStroke;
        context.lineWidth = 0.6;
        context.stroke();

        // -- Great-circle arcs ----------------------------------------------
        arcFeatures.forEach((r, i) => {
          const stagger = i / arcFeatures.length;
          const prog = Math.max(0, Math.min(1, (arcProgress - stagger) / (1 - stagger + 0.001)));
          if (prog <= 0) return;

          const coords = r.arcCoords;
          const sliceEnd = Math.max(2, Math.floor(prog * coords.length));
          const sliced = {
            type: "Feature",
            geometry: { type: "LineString", coordinates: coords.slice(0, sliceEnd) },
          };
          const isHov = hoveredRoute === r.id;

          // Glow layer
          context.save();
          context.beginPath();
          path(sliced);
          context.strokeStyle = r.color;
          context.lineWidth = isHov ? 10 : 6;
          context.globalAlpha = isHov ? 0.35 : 0.18;
          context.stroke();
          context.restore();

          // Solid line
          context.save();
          context.beginPath();
          path(sliced);
          context.strokeStyle = r.color;
          context.lineWidth = isHov ? 2.5 : 1.8;
          context.globalAlpha = isHov ? 1 : 0.85;
          context.stroke();
          context.restore();

          // Moving tip dot while drawing
          if (prog < 1) {
            const tip = coords[sliceEnd - 1];
            const pp = projection(tip);
            if (pp && pp[0] >= 0 && pp[0] <= currentSize && pp[1] >= 0 && pp[1] <= currentSize) {
              context.beginPath();
              context.arc(pp[0], pp[1], 3, 0, 2 * Math.PI);
              context.fillStyle = r.color;
              context.globalAlpha = 1;
              context.fill();
            }
          }
        });

        // -- Origin markers -------------------------------------------------
        arcFeatures.forEach((r, i) => {
          const stagger = i / arcFeatures.length;
          const prog = Math.max(0, Math.min(1, (arcProgress - stagger) / (1 - stagger + 0.001)));
          if (prog <= 0) return;

          const pp = projection(r.coords);
          if (!pp) return;
          const [px, py] = pp;
          if (px < 0 || px > currentSize || py < 0 || py > currentSize) return;

          const isHov = hoveredRoute === r.id;
          const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 600 + i);

          // Pulse ring
          context.beginPath();
          context.arc(px, py, (isHov ? 10 : 7) + pulse * 4, 0, 2 * Math.PI);
          context.strokeStyle = r.color;
          context.lineWidth = 1;
          context.globalAlpha = 0.3 * (1 - pulse);
          context.stroke();
          context.globalAlpha = 1;

          // Dot
          context.beginPath();
          context.arc(px, py, isHov ? 5 : 3.5, 0, 2 * Math.PI);
          context.fillStyle = r.color;
          context.fill();

          // Label
          context.font = `bold ${isHov ? 10 : 9}px Inter, sans-serif`;
          context.textAlign = "center";
          context.fillStyle = C.label;
          context.globalAlpha = C.labelAlpha;
          const labelY = py < 18 ? py + 14 : py - 10;
          context.fillText(`${r.flag} ${r.country}`, px, labelY);
          context.globalAlpha = 1;
        });

        // -- India / Mundra destination -------------------------------------
        const ip = projection(INDIA_COORDS);
        if (ip) {
          const [ix, iy] = ip;
          if (ix >= 0 && ix <= currentSize && iy >= 0 && iy <= currentSize) {
            const glow = 0.5 + 0.5 * Math.sin(Date.now() / 500);

            for (let g = 0; g < 3; g++) {
              context.beginPath();
              context.arc(ix, iy, 8 + g * 5 + glow * 3, 0, 2 * Math.PI);
              context.strokeStyle = "#d97706";
              context.lineWidth = 1;
              context.globalAlpha = (0.4 - g * 0.12) * arcProgress;
              context.stroke();
            }
            context.globalAlpha = 1;

            context.beginPath();
            context.arc(ix, iy, 6, 0, 2 * Math.PI);
            context.fillStyle = "#d97706";
            context.fill();

            context.font = "bold 10px Inter, sans-serif";
            const isNearRightEdge = ix > currentSize - 65;
            context.textAlign = isNearRightEdge ? "right" : "left";
            context.fillStyle = "#d97706";
            const lx = isNearRightEdge ? ix - 10 : ix + 10;
            context.fillText("INDIA", lx, iy - 2);

            context.font = "9px Inter, sans-serif";
            context.fillStyle = C.mundraLabel;
            context.fillText("Mundra Port", lx, iy + 9);
          }
        }
      }

      // Auto-rotate
      if (autoRotate && !dragging) {
        rotation[0] += 0.5;
        projection.rotate(rotation);
      }

      animFrame = requestAnimationFrame(render);
    };

    // -- Load land data --------------------------------------------------------
    fetch(
      "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
    )
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => {
        landFeatures = data;
        setIsLoading(false);
        animFrame = requestAnimationFrame(render);
      })
      .catch(() => {
        setError("Failed to load globe data");
        setIsLoading(false);
      });

    // -- Drag interaction (rotate only, NO zoom) -------------------------------
    const onMouseDown = (e) => {
      dragging = true;
      autoRotate = false;
      dragStart = { x: e.clientX, y: e.clientY };
      dragRotStart = [...rotation];
    };
    const onDocMouseMove = (e) => {
      if (!dragging) return;
      rotation[0] = dragRotStart[0] + (e.clientX - dragStart.x) * 0.5;
      rotation[1] = Math.max(-80, Math.min(80, dragRotStart[1] - (e.clientY - dragStart.y) * 0.5));
      projection.rotate(rotation);
    };
    const onMouseUp = () => {
      dragging = false;
      setTimeout(() => { autoRotate = true; }, 800);
    };

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      dragging = true;
      autoRotate = false;
      dragStart = { x: t.clientX, y: t.clientY };
      dragRotStart = [...rotation];
    };
    const onTouchMove = (e) => {
      if (!dragging || e.touches.length !== 1) return;
      e.preventDefault();
      const t = e.touches[0];
      rotation[0] = dragRotStart[0] + (t.clientX - dragStart.x) * 0.5;
      rotation[1] = Math.max(-80, Math.min(80, dragRotStart[1] - (t.clientY - dragStart.y) * 0.5));
      projection.rotate(rotation);
    };
    const onTouchEnd = () => {
      dragging = false;
      setTimeout(() => { autoRotate = true; }, 800);
    };

    // -- Hover detection -------------------------------------------------------
    const onCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found = null;
      arcFeatures.forEach((r) => {
        const pp = projection(r.coords);
        if (!pp) return;
        if (Math.hypot(mx - pp[0], my - pp[1]) < 14) {
          found = r.id;
          setTooltip({ visible: true, x: mx, y: my - 36, route: r });
        }
      });
      setHoveredRoute(found);
      if (!found) setTooltip((t) => ({ ...t, visible: false }));
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    document.addEventListener("mousemove", onDocMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onCanvasMouseMove);
      document.removeEventListener("mousemove", onDocMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [inView, globeSize]);

  const C = getColors(isDark);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{ width: globeSize, height: globeSize, maxWidth: "100%", background: C.ocean }}
      >
        <p className="text-sm text-center text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div ref={inViewRef} className={`relative flex flex-col items-center max-w-full ${className}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div
          className="absolute z-10 flex flex-col items-center justify-center gap-3"
          style={{ width: globeSize, height: globeSize, maxWidth: "100%" }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <p className="text-xs" style={{ color: C.hintText }}>Loading globe...</p>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="rounded-full shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/20 max-w-full"
        style={{ touchAction: "none", display: "block", width: globeSize, height: globeSize }}
      />

      {/* Hover tooltip */}
      {tooltip.visible && tooltip.route && (
        <div
          className="absolute pointer-events-none z-20 px-3 py-2 rounded-lg shadow-xl text-center border backdrop-blur-sm"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateX(-50%)",
            background: C.tooltipBg,
            borderColor: C.tooltipBorder,
          }}
        >
          <p className="font-bold text-xs" style={{ color: C.tooltipText }}>
            {tooltip.route.flag} {tooltip.route.country}
          </p>
          <p className="text-xs mt-0.5" style={{ color: tooltip.route.color }}>
            {tooltip.route.wood}
          </p>
        </div>
      )}

      {/* Hint */}
      <p className="mt-3 text-[10px] flex items-center gap-1.5" style={{ color: C.hintText }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9l4-4 4 4M9 5v14M15 15l4 4 4-4M19 19V5" />
        </svg>
        Drag to rotate
      </p>
    </div>
  );
}
