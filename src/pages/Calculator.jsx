import { useState, useEffect } from "react";
import { Calculator as CalcIcon, RefreshCw, ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Calculator = () => {
    const [unit, setUnit] = useState("imperial"); // Options: imperial, mm, cm, meter
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [thickness, setThickness] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("");
    const [result, setResult] = useState(null);

    // Reset fields when unit changes
    useEffect(() => {
        setResult(null);
    }, [unit]);

    const calculateCFT = (e) => {
        e.preventDefault();

        let lenFt = parseFloat(length);
        let widIn = parseFloat(width);
        let thkIn = parseFloat(thickness);

        // Conversion Logic to Standard (L=Ft, W=In, T=In)
        if (unit === "mm") {
            lenFt = parseFloat(length) / 304.8;  // mm to ft
            widIn = parseFloat(width) / 25.4;    // mm to in
            thkIn = parseFloat(thickness) / 25.4; // mm to in
        } else if (unit === "cm") {
            lenFt = parseFloat(length) / 30.48;  // cm to ft
            widIn = parseFloat(width) / 2.54;    // cm to in
            thkIn = parseFloat(thickness) / 2.54; // cm to in
        } else if (unit === "meter") {
            lenFt = parseFloat(length) * 3.28084; // m to ft
            widIn = parseFloat(width) * 39.3701;  // m to in
            thkIn = parseFloat(thickness) * 39.3701; // m to in
        }

        const cftPerPiece = (lenFt * widIn * thkIn) / 144;
        const totalCft = cftPerPiece * parseInt(quantity);
        const totalPrice = price ? totalCft * parseFloat(price) : 0;

        setResult({ cft: totalCft.toFixed(2), totalPrice: totalPrice.toFixed(2) });
    };

    const clearForm = () => {
        setLength(""); setWidth(""); setThickness(""); setQuantity(1); setPrice(""); setResult(null);
    };

    const getPlaceholders = () => {
        switch(unit) {
            case "mm": return { l: "e.g. 2400", w: "e.g. 100", t: "e.g. 75" };
            case "cm": return { l: "e.g. 240", w: "e.g. 10", t: "e.g. 7.5" };
            case "meter": return { l: "e.g. 2.4", w: "e.g. 0.1", t: "e.g. 0.075" };
            default: return { l: "e.g. 8", w: "e.g. 4", t: "e.g. 3" };
        }
    };

    const placeholders = getPlaceholders();

    return (
        <div className="bg-[#f9f8f4] dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Timber CFT Calculator | R.P. Goyal & Sons</title>
                <meta name="description" content="Calculate wood volume in Cubic Feet (CFT) instantly using MM, CM, or Inches." />
            </Helmet>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Timber <span className="text-[#d97706]">Calculator</span>
                    </h1>
                    <p className="text-gray-500 dark:text-stone-400">
                        Calculate exact volume (CFT) from any unit (MM, CM, Feet).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* CALCULATOR FORM */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white dark:bg-[#292524] p-8 rounded-2xl shadow-xl border-t-4 border-[#d97706]"
                    >
                        <form onSubmit={calculateCFT} className="space-y-5">

                            {/* UNIT SELECTOR */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-2">Input Unit</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['imperial', 'mm', 'cm', 'meter'].map((u) => (
                                        <button
                                            key={u}
                                            type="button"
                                            onClick={() => setUnit(u)}
                                            className={`py-2 text-xs font-bold uppercase rounded border transition-all ${
                                                unit === u
                                                    ? "bg-[#d97706] text-white border-[#d97706]"
                                                    : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
                                            }`}
                                        >
                                            {u === 'imperial' ? 'Ft / In' : u}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">
                                        Length {unit === 'imperial' ? '(Ft)' : `(${unit})`}
                                    </label>
                                    <input type="number" step="any" required value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder={placeholders.l} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">Quantity</label>
                                    <input type="number" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder="1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">
                                        Width {unit === 'imperial' ? '(In)' : `(${unit})`}
                                    </label>
                                    <input type="number" step="any" required value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder={placeholders.w} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">
                                        Thickness {unit === 'imperial' ? '(In)' : `(${unit})`}
                                    </label>
                                    <input type="number" step="any" required value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder={placeholders.t} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">Price per CFT (Optional)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder="e.g. 2500" />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={clearForm} className="px-4 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1c1c1c] rounded transition-colors">
                                    <RefreshCw size={20} />
                                </button>
                                <button type="submit" className="flex-1 bg-[#d97706] text-white font-bold uppercase tracking-widest rounded shadow-lg hover:bg-[#b45309] transition-all flex items-center justify-center gap-2">
                                    Calculate <ChevronRight size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* RESULTS PANEL */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-[#171717] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-white/5"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <CalcIcon size={120} />
                        </div>

                        {!result ? (
                            <div className="text-center opacity-50">
                                <p className="text-sm uppercase tracking-widest mb-2">Ready to Calculate</p>
                                <p className="text-xs">Enter dimensions in {unit === 'imperial' ? 'Feet & Inches' : unit.toUpperCase()}.</p>
                            </div>
                        ) : (
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <p className="text-sm text-[#d97706] font-bold uppercase tracking-widest mb-1">Total Volume</p>
                                    <p className="text-6xl font-serif font-bold">{result.cft} <span className="text-2xl text-stone-500">cft</span></p>
                                    <div className="flex items-center gap-2 mt-2 text-white/40 text-xs">
                                        <Info size={14} />
                                        <span>Formula: (L_ft × W_in × T_in) / 144</span>
                                    </div>
                                </div>

                                {parseFloat(result.totalPrice) > 0 && (
                                    <div className="pt-8 border-t border-white/10">
                                        <p className="text-sm text-stone-400 font-bold uppercase tracking-widest mb-1">Estimated Cost</p>
                                        <p className="text-4xl font-serif">₹ {result.totalPrice}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Calculator;