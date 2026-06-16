import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Award, Globe, Handshake, TreePine, Ship, Factory } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiniCTA from "../components/MiniCTA";

/* ─── TOPOLOGY URL (Natural Earth 110m) ─── */
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ─── TIMELINE DATA ─── */
const milestones = [
    {
        year: "2004",
        title: "The Foundation",
        desc: "R.P. Goyal & Sons was established at Imam Bara, Timber Market, Railway Road in Karnal, Haryana — starting as a timber trading firm supplying quality hardwood to builders and contractors across Northern India.",
        icon: TreePine,
    },
    {
        year: "2010",
        title: "Direct Import Channels",
        desc: "Began importing Teak directly from East African plantations in Tanzania, cutting out middlemen and securing premium-grade logs at competitive prices for the North Indian market.",
        icon: Ship,
    },
    {
        year: "2014",
        title: "Gandhidham Processing Unit",
        desc: "Established a dedicated manufacturing and processing facility at Survey No. 361, Mithi Rohar, Gandhidham (Kutch), Gujarat — strategically located near Kandla Port for direct port-side operations.",
        icon: Factory,
    },
    {
        year: "2017",
        title: "Global Sourcing Network",
        desc: "Expanded imports to five countries — Teak from Tanzania & Ecuador, Meranti & Resak from Malaysia, American Pine from the USA, and Spruce from Germany. Also entered plywood manufacturing.",
        icon: Globe,
    },
    {
        year: "2020",
        title: "Pvt. Ltd. Incorporation",
        desc: "Formally incorporated as R.P. Goyal & Sons Private Limited on July 20, 2020 (CIN: U74999DL2020PTC366501, ROC-Delhi) with an authorized capital of ₹80 Lakhs — transitioning from a proprietorship to a structured corporate entity.",
        icon: Handshake,
    },
    {
        year: "2024",
        title: "20 Years & Growing",
        desc: "Celebrating two decades in the timber industry — serving 2,500+ clients across Northern India with a vertically integrated ecosystem spanning direct imports, sawmill processing, and plywood manufacturing.",
        icon: Award,
    },
];



/* ─── CORE VALUES ─── */
const values = [
    {
        icon: Award,
        title: "Quality First",
        desc: "Every log is hand-graded and inspected before dispatch. We reject what doesn't meet our standards — so you never have to.",
    },
    {
        icon: Ship,
        title: "Direct Sourcing",
        desc: "We import directly from forests and plantations across five countries — no middlemen, no markups, just pure value.",
    },
    {
        icon: Handshake,
        title: "Client Partnership",
        desc: "Many of our buyers have been with us for over 15 years. We don't just supply timber — we build lasting relationships.",
    },
];

/* ─── WORLD MAP COMPONENT ─── */
const WorldImportMap = () => {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
    const [hoveredRoute, setHoveredRoute] = useState(null);

    return (
        <div ref={ref} className="relative w-full max-w-6xl mx-auto">
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{
                    scale: 155,
                    center: [10, 5],
                }}
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
                                fill="#1a1a2e"
                                stroke="#2a2a4a"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none", fill: "#222244" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Animated route lines */}
                {importRoutes.map((route, i) => (
                    <Line
                        key={route.id}
                        from={route.coords}
                        to={INDIA_COORDS}
                        stroke={route.color}
                        strokeWidth={2}
                        strokeLinecap="round"
                        style={{
                            opacity: inView ? 1 : 0,
                            strokeDasharray: "1000",
                            strokeDashoffset: inView ? 0 : 1000,
                            transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                        }}
                    />
                ))}

                {/* Glow lines (thicker, lower opacity) */}
                {importRoutes.map((route, i) => (
                    <Line
                        key={`glow-${route.id}`}
                        from={route.coords}
                        to={INDIA_COORDS}
                        stroke={route.color}
                        strokeWidth={6}
                        strokeLinecap="round"
                        style={{
                            opacity: inView ? 0.15 : 0,
                            strokeDasharray: "1000",
                            strokeDashoffset: inView ? 0 : 1000,
                            transition: `stroke-dashoffset 2.5s ease-out ${i * 0.4}s, opacity 0.5s ease ${i * 0.4}s`,
                        }}
                    />
                ))}

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
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fill: "white",
                                fontSize: "10px",
                                fontWeight: 700,
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
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fill: "rgba(255,255,255,0.5)",
                            fontSize: "9px",
                            fontWeight: 500,
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1c1c1c]/95 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-lg shadow-2xl text-center pointer-events-none z-20">
                    {(() => {
                        const r = importRoutes.find((rt) => rt.id === hoveredRoute);
                        return (
                            <>
                                <p className="text-white font-bold text-sm">{r.flag} {r.country}</p>
                                <p className="text-xs mt-1" style={{ color: r.color }}>{r.wood}</p>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

/* ─── MAIN ABOUT PAGE ─── */
const About = () => {
    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>About Us | R.P. Goyal &amp; Sons — Our Legacy Since 2004</title>
                <meta name="description" content="Discover the story of R.P. Goyal & Sons — from a humble timber trading firm in 2004 to a leading importer and sawmill company serving Northern India. See our global sourcing network." />
            </Helmet>

            <Header />

            {/* ━━━ HERO BANNER ━━━ */}
            <section className="relative bg-[#1c1c1c] pt-32 pb-20 px-6 text-center border-b border-white/5 overflow-hidden">
                {/* Subtle radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(217,119,6,0.08)_0%,_transparent_60%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <p className="text-[#d97706] font-bold uppercase tracking-[0.3em] text-xs mb-4">
                        Est. 2004
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-5 leading-tight">
                        Our Legacy
                    </h1>
                    <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        From a small timber trading desk in Karnal to a vertically integrated import &amp; processing powerhouse — this is our story.
                    </p>

                    {/* Decorative line */}
                    <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#d97706] to-transparent" />
                </motion.div>
            </section>

            {/* ━━━ TIMELINE ━━━ */}
            <section className="py-24 bg-gradient-to-b from-[#f9f8f4] to-white dark:from-[#171717] dark:to-[#1c1c1c] transition-colors duration-500 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h4 className="text-[#d97706] font-bold uppercase tracking-widest text-xs mb-4">
                            Two Decades of Growth
                        </h4>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
                            Our Journey
                        </h2>
                    </motion.div>

                    {/* Timeline container */}
                    <div className="relative">
                        {/* Center line */}
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d97706] via-[#d97706]/50 to-transparent" />

                        {milestones.map((item, index) => {
                            const isEven = index % 2 === 0;
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className={`relative flex items-start mb-16 last:mb-0 ${
                                        isEven
                                            ? "md:flex-row flex-row"
                                            : "md:flex-row-reverse flex-row"
                                    }`}
                                >
                                    {/* Year badge on center line */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                                        <div className="w-10 h-10 rounded-full bg-[#d97706] flex items-center justify-center shadow-lg shadow-[#d97706]/20 border-4 border-[#f9f8f4] dark:border-[#171717]">
                                            <Icon size={16} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <div
                                        className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                                            isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                                        }`}
                                    >
                                        <div className="group bg-white dark:bg-[#292524] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-[#d97706]/30 transition-all duration-300">
                                            <span className="inline-block bg-[#d97706]/10 text-[#d97706] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest">
                                                {item.year}
                                            </span>
                                            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ━━━ CORE VALUES ━━━ */}
            <section className="py-24 bg-gradient-to-b from-white to-[#f9f8f4] dark:from-[#1c1c1c] dark:to-[#171717] transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h4 className="text-[#d97706] font-bold uppercase tracking-widest text-xs mb-4">
                            What Drives Us
                        </h4>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
                            Our Core Values
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, i) => {
                            const Icon = val.icon;
                            return (
                                <motion.div
                                    key={val.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="group bg-white dark:bg-[#292524] rounded-xl p-8 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-[#d97706]/30 hover:-translate-y-1 transition-all duration-300 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#d97706]/10 flex items-center justify-center text-[#d97706] mx-auto mb-6 group-hover:bg-[#d97706] group-hover:text-white transition-colors duration-300">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">
                                        {val.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-stone-400 text-sm leading-relaxed">
                                        {val.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ━━━ CTA & FOOTER ━━━ */}
            <MiniCTA />
            <Footer />
        </div>
    );
};

export default About;
