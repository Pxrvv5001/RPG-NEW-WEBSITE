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
    // ── HARDWOOD ORIGINS ──
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
    // ── SOFTWOOD ORIGINS (NEW) ──
    {
        id: "new-zealand",
        country: "New Zealand",
        wood: "Radiata Pine",
        flag: "🇳🇿",
        color: "#0ea5e9",
        coords: [172.5, -41.5],
    },
    {
        id: "uruguay",
        country: "Uruguay",
        wood: "Radiata Pine",
        flag: "🇺🇾",
        color: "#a3e635",
        coords: [-56.0, -32.5],
    },
    {
        id: "australia",
        country: "Australia",
        wood: "Cypress Pine",
        flag: "🇦🇺",
        color: "#fb923c",
        coords: [133.78, -25.27],
    },
];

// Gandhidham / Mundra Port, India
const INDIA_COORDS = [70.13, 23.08];

// ─── PROJECTION CONFIGS ───
const desktopConfig = { scale: 155, center: [10, 5] };
const mobileConfig  = { scale: 155, center: [10, 5] };

// Desktop projection for route path calculations
const desktopProjection = geoNaturalEarth1()
    .scale(desktopConfig.scale)
    .center(desktopConfig.center)
    .translate([960 / 2, 500 / 2]);

// Mobile projection for route path calculations (same viewBox 960×500)
const mobileProjection = geoNaturalEarth1()
    .scale(mobileConfig.scale)
    .center(mobileConfig.center)
    .translate([960 / 2, 500 / 2]);

const WorldImportMap = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [hoveredRoute, setHoveredRoute] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const projConfig = isMobile ? mobileConfig : desktopConfig;
    const proj = isMobile ? mobileProjection : desktopProjection;

    return (
        <div ref={ref} className="relative w-full max-w-6xl mx-auto overflow-hidden">
            {/* On mobile: horizontally scrollable container so map stays readable */}
            <div
                className={
                    isMobile
                        ? "overflow-x-auto overflow-y-hidden pb-2 w-full"
                        : "w-full"
                }
                style={isMobile ? { WebkitOverflowScrolling: "touch", maxWidth: "100vw" } : undefined}
            >
                <div
                    style={isMobile ? { minWidth: "640px", width: "100%" } : { width: "100%" }}
                >
                    <ComposableMap
                        projection="geoNaturalEarth1"
                        projectionConfig={projConfig}
                        width={960}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                    >
                        {/* Country shapes */}
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
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
                            const origin = proj(route.coords);
                            const dest = proj(INDIA_COORDS);
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
                                    {/* Main colored line */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke={route.color}
                                        strokeWidth={isMobile ? 2.5 : 2}
                                        strokeLinecap="round"
                                        style={{
                                            opacity: inView ? 1 : 0,
                                            strokeDasharray: 1000,
                                            strokeDashoffset: inView ? 0 : 1000,
                                            transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                                        }}
                                    />
                                    {/* Glow line */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke={route.color}
                                        strokeWidth={isMobile ? 8 : 6}
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
                                {/* Pulse ring */}
                                <circle
                                    r={isMobile ? 8 : 6}
                                    fill={route.color}
                                    opacity={0.25}
                                    className={inView ? "map-origin-dot" : ""}
                                    style={{
                                        animationDelay: `${i * 0.3}s`,
                                        opacity: inView ? undefined : 0,
                                        transition: `opacity 0.5s ${i * 0.4}s`,
                                    }}
                                />
                                {/* Solid dot */}
                                <circle
                                    r={isMobile ? 5 : 4}
                                    fill={route.color}
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transition: `opacity 0.5s ${i * 0.4}s`,
                                        cursor: "pointer",
                                    }}
                                />
                                {/* Country label */}
                                <text
                                    textAnchor="middle"
                                    y={isMobile ? -16 : -14}
                                    className="fill-gray-800 dark:fill-white font-bold"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: isMobile ? "11px" : "10px",
                                        opacity: inView ? 1 : 0,
                                        transition: `opacity 0.6s ${0.8 + i * 0.3}s`,
                                    }}
                                >
                                    {route.flag} {route.country}
                                </text>
                                {/* Wood type sub-label — hidden on mobile to reduce clutter */}
                                {!isMobile && (
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
                                )}
                            </Marker>
                        ))}

                        {/* India destination marker */}
                        <Marker coordinates={INDIA_COORDS}>
                            {/* Glow */}
                            <circle
                                r={isMobile ? 22 : 18}
                                fill="#d97706"
                                opacity={0.12}
                                style={{
                                    opacity: inView ? 0.12 : 0,
                                    transition: "opacity 0.8s 1.5s",
                                }}
                            />
                            {/* Pulse */}
                            <circle
                                r={isMobile ? 10 : 8}
                                fill="#d97706"
                                opacity={0.3}
                                className={inView ? "map-destination-dot" : ""}
                            />
                            {/* Solid center */}
                            <circle
                                r={isMobile ? 6 : 5}
                                fill="#d97706"
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transition: "opacity 0.5s 1s",
                                }}
                            />
                            {/* Label */}
                            <text
                                textAnchor="start"
                                x={isMobile ? 16 : 14}
                                y={-4}
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fill: "#d97706",
                                    fontSize: isMobile ? "14px" : "12px",
                                    fontWeight: 800,
                                    opacity: inView ? 1 : 0,
                                    transition: "opacity 0.8s 2s",
                                }}
                            >
                                🇮🇳 INDIA
                            </text>
                            <text
                                textAnchor="start"
                                x={isMobile ? 16 : 14}
                                y={9}
                                className="fill-gray-500 dark:fill-white/50 font-medium"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: isMobile ? "10px" : "9px",
                                    opacity: inView ? 1 : 0,
                                    transition: "opacity 0.8s 2s",
                                }}
                            >
                                Mundra Port, Gujarat
                            </text>
                        </Marker>
                    </ComposableMap>
                </div>
            </div>

            {/* Mobile: swipe hint that fades out */}
            {isMobile && (
                <div
                    className="flex items-center justify-center gap-2 mt-2 text-[11px] text-gray-400 dark:text-white/30"
                    style={{
                        opacity: inView ? 1 : 0,
                        transition: "opacity 1s 2.5s",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Swipe to explore
                </div>
            )}

            {/* Floating tooltip on hover (desktop) */}
            {!isMobile && hoveredRoute && (
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

export default WorldImportMap;
