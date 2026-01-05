import { useState } from "react";
import { Calculator as CalcIcon, RefreshCw, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Calculator = () => {
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [thickness, setThickness] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("");

    const [result, setResult] = useState(null);

    const calculateCFT = (e) => {
        e.preventDefault();
        // Formula: (Length (ft) * Width (in) * Thickness (in)) / 144
        const cftPerPiece = (parseFloat(length) * parseFloat(width) * parseFloat(thickness)) / 144;
        const totalCft = cftPerPiece * parseInt(quantity);
        const totalPrice = price ? totalCft * parseFloat(price) : 0;

        setResult({
            cft: totalCft.toFixed(2),
            totalPrice: totalPrice.toFixed(2)
        });
    };

    const clearForm = () => {
        setLength(""); setWidth(""); setThickness(""); setQuantity(1); setPrice("");
        setResult(null);
    };

    return (
        <div className="bg-[#f9f8f4] dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Timber CFT Calculator | R.P. Goyal & Sons</title>
                <meta name="description" content="Calculate wood volume in Cubic Feet (CFT) instantly. Free tool for carpenters and contractors." />
            </Helmet>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Timber <span className="text-[#d97706]">Calculator</span>
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400">
                        Calculate the exact volume (CFT) and estimated cost of your wood.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* CALCULATOR FORM */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-xl border-t-4 border-[#d97706]"
                    >
                        <form onSubmit={calculateCFT} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Length (Feet)</label>
                                    <input type="number" step="0.1" required value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 focus:border-[#d97706] outline-none dark:text-white" placeholder="e.g. 8" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Quantity (Pcs)</label>
                                    <input type="number" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 focus:border-[#d97706] outline-none dark:text-white" placeholder="1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Width (Inch)</label>
                                    <input type="number" step="0.1" required value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 focus:border-[#d97706] outline-none dark:text-white" placeholder="e.g. 4" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Thickness (Inch)</label>
                                    <input type="number" step="0.1" required value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 focus:border-[#d97706] outline-none dark:text-white" placeholder="e.g. 3" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price per CFT (Optional)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 focus:border-[#d97706] outline-none dark:text-white" placeholder="e.g. 2500" />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={clearForm} className="px-4 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors">
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
                        className="bg-[#1c1c1c] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden h-full flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <CalcIcon size={120} />
                        </div>

                        {!result ? (
                            <div className="text-center opacity-50">
                                <p className="text-sm uppercase tracking-widest mb-2">Ready to Calculate</p>
                                <p className="text-xs">Enter dimensions to see the volume.</p>
                            </div>
                        ) : (
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <p className="text-sm text-[#d97706] font-bold uppercase tracking-widest mb-1">Total Volume</p>
                                    <p className="text-6xl font-serif font-bold">{result.cft} <span className="text-2xl text-gray-500">cft</span></p>
                                </div>

                                {parseFloat(result.totalPrice) > 0 && (
                                    <div className="pt-8 border-t border-white/10">
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Estimated Cost</p>
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