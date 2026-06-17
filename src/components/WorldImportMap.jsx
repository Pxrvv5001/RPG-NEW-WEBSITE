import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";

/* ─── TOPOLOGY URL (Natural Earth 110m) ─── */
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ─── IMPORT ROUTES DATA (real geo coordinates [lng, lat]) ─── */
export const importRoutes = [
    {
        id: "tanzania",
        country: "Tanzania",
        wood: "Teak",
        flag: "🇹🇿",
        color: "#d97706",
        coords: [34.89, -6.37],
    },
    {
        id: "ecuador",
        country: "Ecuador",
        wood: "Teak",
        flag: "🇪🇨",
        color: "#f59e0b",
        coords: [-78.18, -1.83],
    },
    {
        id: "malaysia",
        country: "Malaysia",
        wood: "Meranti & Resak",
        flag: "🇲🇾",
        color: "#10b981",
        coords: [101.98, 4.21],
    },
    {
        id: "usa",
        country: "USA",
        wood: "American Pine",
        flag: "🇺🇸",
        color: "#3b82f6",
        coords: [-98.58, 39.83],
    },
    {
        id: "germany",
        country: "Germany",
        wood: "Spruce",
        flag: "🇩🇪",
        color: "#8b5cf6",
        coords: [10.45, 51.17],
    },
    {
        id: "russia",
        country: "Russia",
        wood: "Spruce (Picea Abies)",
        flag: "🇷🇺",
        color: "#ef4444",
        coords: [90.0, 60.0],
    },
];

// Gandhidham / Kandla Port, India
const INDIA_COORDS = [70.13, 23.08];

// ─── DESKTOP PROJECTION CONFIG ───
const desktopProjConfig = {
    scale: 155,
    center: [10, 5],
};

const desktopProjection = geoNaturalEarth1()
    .scale(desktopProjConfig.scale)
    .center(desktopProjConfig.center)
    .translate([960 / 2, 500 / 2]);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MOBILE CARD-BASED LAYOUT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const MobileImportView = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <div ref={ref} className="w-full">
            {/* Animated route cards */}
            <div className="grid grid-cols-2 gap-3">
                {importRoutes.map((route, i) => (
                    <div
                        key={route.id}
                        className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 transition-all duration-500"
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(20px)",
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                        }}
                    >
                        {/* Color accent bar at top */}
                        <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{ background: route.color }}
                        />

                        {/* Subtle glow in background */}
                        <div
                            className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.06] dark:opacity-[0.08] blur-2xl"
                            style={{ background: route.color }}
                        />

                        {/* Flag */}
                        <div className="text-2xl mb-2">{route.flag}</div>

                        {/* Country */}
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {route.country}
                        </h4>

                        {/* Wood type */}
                        <p
                            className="text-[11px] font-semibold mt-1"
                            style={{ color: route.color }}
                        >
                            {route.wood}
                        </p>

                        {/* Animated connection line */}
                        <div className="mt-3 flex items-center gap-1.5">
                            <div
                                className="h-[3px] rounded-full flex-1"
                                style={{
                                    background: `linear-gradient(90deg, ${route.color}, ${route.color}00)`,
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? "scaleX(1)" : "scaleX(0)",
                                    transformOrigin: "left",
                                    transition: `all 1s ease-out ${0.5 + i * 0.15}s`,
                                }}
                            />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transition: `opacity 0.5s ${0.8 + i * 0.15}s`,
                                }}
                            >
                                <path d="M0 4H10M10 4L7 1M10 4L7 7" stroke={route.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* India destination card */}
            <div
                className="mt-4 relative overflow-hidden rounded-xl border-2 border-[#d97706]/30 bg-gradient-to-r from-[#d97706]/5 to-transparent dark:from-[#d97706]/10 p-4 text-center"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
                }}
            >
                <div className="flex items-center justify-center gap-3">
                    {/* Pulsing dot */}
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97706] opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d97706]"></span>
                    </span>
                    <span className="text-lg">🇮🇳</span>
                    <div className="text-left">
                        <p className="text-sm font-extrabold text-[#d97706]">INDIA</p>
                        <p className="text-[11px] text-gray-500 dark:text-white/50">
                            Kandla Port, Gujarat
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DESKTOP MAP LAYOUT (Full SVG Map)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DesktopMapView = () => {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
    const [hoveredRoute, setHoveredRoute] = useState(null);

    return (
        <div ref={ref} className="relative w-full max-w-6xl mx-auto">
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={desktopProjConfig}
                width={960}
                height={500}
                style={{ width: "100%", height: "auto" }}
            >
                {/* Country shapes */}
                <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rpiKey}
                                geography={geo}
                                strokeWidth={0.5}
                                className="fill-gray-200 dark:fill-[#1a1a2e] stroke-white dark:stroke-[#2a2a4a] hover:fill-gray-300 dark:hover:fill-[#222244] outline-none transition-colors duration-300"
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Animated curved route lines */}
                {importRoutes.map((route, i) => {
                    const origin = desktopProjection(route.coords);
                    const dest = desktopProjection(INDIA_COORDS);
                    const midX = (origin[0] + dest[0]) / 2;
                    const midY = (origin[1] + dest[1]) / 2;

                    const dx = dest[0] - origin[0];
                    const dy = dest[1] - origin[1];
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const curveOffset = Math.max(50, distance * 0.25);
                    const controlX = midX;
                    const controlY = midY - curveOffset;

                    const pathD = `M ${origin[0]},${origin[1]} Q ${controlX},${controlY} ${dest[0]},${dest[1]}`;

                    return (
                        <g key={`route-group-${route.id}`}>
                            <path
                                d={pathD}
                                fill="none"
                                stroke={route.color}
                                strokeWidth={2}
                                strokeLinecap="round"
                                style={{
                                    opacity: inView ? 1 : 0,
                                    strokeDasharray: 1000,
                                    strokeDashoffset: inView ? 0 : 1000,
                                    transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                                }}
                            />
                            <path
                                d={pathD}
                                fill="none"
                                stroke={route.color}
                                strokeWidth={6}
                                strokeLinecap="round"
                                style={{
                                    opacity: inView ? 0.15 : 0,
                                    strokeDasharray: 1000,
                                    strokeDashoffset: inView ? 0 : 1000,
                                    transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                                }}
                            />
                        </g>
                    );
                })}

                {/* Origin markers */}
                {importRoutes.map((route, i) => (
                    <Marker
                        key={`marker-${route.id}`}
                        coordinates={route.coords}
                        onMouseEnter={() => setHoveredRoute(route.id)}
                        onMouseLeave={() => setHoveredRoute(null)}
                    >
                        <circle
                            r={6}
                            fill={route.color}
                            opacity={0.25}
                            className={inView ? "map-origin-dot" : ""}
                            style={{
                                animationDelay: `${i * 0.3}s`,
                                opacity: inView ? undefined : 0,
                                transition: `opacity 0.5s ${i * 0.4}s`,
                            }}
                        />
                        <circle
                            r={4}
                            fill={route.color}
                            style={{
                                opacity: inView ? 1 : 0,
                                transition: `opacity 0.5s ${i * 0.4}s`,
                                cursor: "pointer",
                            }}
                        />
                        <text
                            textAnchor="middle"
                            y={-14}
                            className="fill-gray-800 dark:fill-white font-bold text-[10px]"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                opacity: inView ? 1 : 0,
                                transition: `opacity 0.6s ${0.8 + i * 0.3}s`,
                            }}
                        >
                            {route.flag} {route.country}
                        </text>
                        <text
                            textAnchor="middle"
                            y={-4}
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fill: route.color,
                                fontSize: "8px",
                                fontWeight: 500,
                                opacity: inView ? 0.9 : 0,
                                transition: `opacity 0.6s ${0.8 + i * 0.3}s`,
                            }}
                        >
                            {route.wood}
                        </text>
                    </Marker>
                ))}

                {/* India destination marker */}
                <Marker coordinates={INDIA_COORDS}>
                    <circle
                        r={18}
                        fill="#d97706"
                        opacity={0.12}
                        style={{
                            opacity: inView ? 0.12 : 0,
                            transition: "opacity 0.8s 1.5s",
                        }}
                    />
                    <circle
                        r={8}
                        fill="#d97706"
                        opacity={0.3}
                        className={inView ? "map-destination-dot" : ""}
                    />
                    <circle
                        r={5}
                        fill="#d97706"
                        style={{
                            opacity: inView ? 1 : 0,
                            transition: "opacity 0.5s 1s",
                        }}
                    />
                    <text
                        textAnchor="start"
                        x={14}
                        y={-4}
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fill: "#d97706",
                            fontSize: "12px",
                            fontWeight: 800,
                            opacity: inView ? 1 : 0,
                            transition: "opacity 0.8s 2s",
                        }}
                    >
                        🇮🇳 INDIA
                    </text>
                    <text
                        textAnchor="start"
                        x={14}
                        y={9}
                        className="fill-gray-500 dark:fill-white/50 font-medium text-[9px]"
                        style={{
                            fontFamily: "Inter, sans-serif",
                            opacity: inView ? 1 : 0,
                            transition: "opacity 0.8s 2s",
                        }}
                    >
                        Kandla Port, Gujarat
                    </text>
                </Marker>
            </ComposableMap>

            {/* Floating tooltip on hover */}
            {hoveredRoute && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-sm border border-gray-200 dark:border-white/10 px-5 py-3 rounded-lg shadow-xl dark:shadow-2xl text-center pointer-events-none z-20 transition-colors">
                    {(() => {
                        const r = importRoutes.find((rt) => rt.id === hoveredRoute);
                        return (
                            <>
                                <p className="text-gray-900 dark:text-white font-bold text-sm">{r.flag} {r.country}</p>
                                <p className="text-xs mt-1" style={{ color: r.color }}>{r.wood}</p>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN COMPONENT — Switches between layouts
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const WorldImportMap = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return isMobile ? <MobileImportView /> : <DesktopMapView />;
};

export default WorldImportMap;
