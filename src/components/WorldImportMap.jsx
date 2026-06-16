import { useState } from "react";
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

// Shared projection config
const projConfig = {
    scale: 155,
    center: [10, 5],
};

// Create a standalone projection instance to calculate curved path coordinates
const projection = geoNaturalEarth1()
    .scale(projConfig.scale)
    .center(projConfig.center)
    .translate([960 / 2, 500 / 2]);

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

const WorldImportMap = () => {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
    const [hoveredRoute, setHoveredRoute] = useState(null);

    return (
        <div ref={ref} className="relative w-full max-w-6xl mx-auto">
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
                    const origin = projection(route.coords);
                    const dest = projection(INDIA_COORDS);
                    const midX = (origin[0] + dest[0]) / 2;
                    const midY = (origin[1] + dest[1]) / 2;

                    // Calculate distance to determine curve height
                    const dx = dest[0] - origin[0];
                    const dy = dest[1] - origin[1];
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Curve the path upwards
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
                                strokeWidth={2}
                                strokeLinecap="round"
                                style={{
                                    opacity: inView ? 1 : 0,
                                    strokeDasharray: 1000,
                                    strokeDashoffset: inView ? 0 : 1000,
                                    transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                                }}
                            />
                            {/* Glow line (thicker, lower opacity) */}
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
                        {/* Pulse ring */}
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
                        {/* Solid dot */}
                        <circle
                            r={4}
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
                    {/* Glow */}
                    <circle
                        r={18}
                        fill="#d97706"
                        opacity={0.12}
                        style={{
                            opacity: inView ? 0.12 : 0,
                            transition: "opacity 0.8s 1.5s",
                        }}
                    />
                    {/* Pulse */}
                    <circle
                        r={8}
                        fill="#d97706"
                        opacity={0.3}
                        className={inView ? "map-destination-dot" : ""}
                    />
                    {/* Solid center */}
                    <circle
                        r={5}
                        fill="#d97706"
                        style={{
                            opacity: inView ? 1 : 0,
                            transition: "opacity 0.5s 1s",
                        }}
                    />
                    {/* Label */}
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

export default WorldImportMap;
