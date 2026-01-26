import { useState, useEffect } from "react";
import { Calculator as CalcIcon, RefreshCw, ChevronRight, Info, Download, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
// PDF Imports
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Calculator = () => {
    // --- 1. STATE FOR CLIENT DETAILS ---
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const [unit, setUnit] = useState("imperial");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [thickness, setThickness] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => { setResult(null); }, [unit]);

    const calculateCBM = (e) => {
        e.preventDefault();

        let lenM = 0;
        let widM = 0;
        let thkM = 0;

        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thickness);

        // Convert everything to METERS first
        if (unit === "imperial") {
            // Length is Feet -> Meters
            lenM = l * 0.3048;
            // Width & Thickness are Inches -> Meters
            widM = w * 0.0254;
            thkM = t * 0.0254;
        } else if (unit === "mm") {
            lenM = l / 1000;
            widM = w / 1000;
            thkM = t / 1000;
        } else if (unit === "cm") {
            lenM = l / 100;
            widM = w / 100;
            thkM = t / 100;
        } else if (unit === "meter") {
            lenM = l;
            widM = w;
            thkM = t;
        }

        const cbmPerPiece = lenM * widM * thkM;
        const totalCbm = cbmPerPiece * parseInt(quantity);
        const totalPrice = price ? totalCbm * parseFloat(price) : 0;

        // CBM needs more precision (4 decimal places)
        setResult({ cbm: totalCbm.toFixed(4), totalPrice: totalPrice.toFixed(2) });
    };

    // --- PDF GENERATION ---
    const downloadPDF = () => {
        if (!result) return;
        const doc = new jsPDF();

        // 1. BRAND HEADER
        doc.setFillColor(217, 119, 6);
        doc.rect(0, 0, 210, 45, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.setFont("helvetica", "bold");
        doc.text("R.P. GOYAL & SONS", 105, 20, null, null, "center");

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Imam Bara, Timber Market, Railway Road, Karnal - 132001 (Haryana)", 105, 28, null, null, "center");
        doc.text("Phone: +91 70276 02201 | Email: rpgtimber@gmail.com", 105, 34, null, null, "center");

        // 2. CLIENT & DOC DETAILS
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Quotation For:", 14, 60);
        doc.line(14, 62, 80, 62);

        doc.setFont("helvetica", "normal");

        const nameText = clientName ? clientName : "__________________________";
        const phoneText = clientPhone ? clientPhone : "_________________________";

        doc.text(`Name:  ${nameText}`, 14, 70);
        doc.text(`Phone: ${phoneText}`, 14, 78);

        const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        doc.setFont("helvetica", "bold");
        doc.text("Estimate Details:", 140, 60);
        doc.line(140, 62, 196, 62);
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${date}`, 140, 70);
        doc.text("Valid Until: 7 Days", 140, 78);

        // 3. TABLE
        autoTable(doc, {
            startY: 90,
            head: [['Description / Dimensions', 'Unit', 'Qty', 'Vol (CBM)', 'Rate', 'Amount']],
            body: [[
                `${length} x ${width} x ${thickness}`,
                unit.toUpperCase(),
                quantity,
                result.cbm,
                price ? `Rs. ${price}` : '-',
                result.totalPrice > 0 ? `Rs. ${result.totalPrice}` : '-'
            ]],
            theme: 'grid',
            headStyles: { fillColor: [28, 28, 28], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
            bodyStyles: { halign: 'center', fontSize: 10, cellPadding: 6 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } }
        });

        // 4. TOTAL
        if (parseFloat(result.totalPrice) > 0) {
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.setFillColor(245, 245, 245);
            doc.rect(130, finalY - 6, 66, 20, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("Grand Total:", 135, finalY + 5);
            doc.setFontSize(14);
            doc.setTextColor(217, 119, 6);
            doc.text(`Rs. ${result.totalPrice}`, 190, finalY + 5, null, null, "right");
        }

        // 5. FOOTER
        const pageHeight = doc.internal.pageSize.height;
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Terms & Conditions:", 14, pageHeight - 50);
        doc.setFont("helvetica", "normal");
        doc.text("1. Prices are subject to market fluctuation.", 14, pageHeight - 45);
        doc.text("2. Goods once sold will not be taken back.", 14, pageHeight - 41);
        doc.text("3. Loading and Transport charges extra as applicable.", 14, pageHeight - 37);

        doc.setFont("helvetica", "bold");
        doc.text("For R.P. GOYAL & SONS PVT. LTD.", 150, pageHeight - 30);
        doc.line(150, pageHeight - 15, 196, pageHeight - 15);
        doc.setFont("helvetica", "normal");
        doc.text("Authorized Signatory", 173, pageHeight - 10, null, null, "center");

        doc.save(`Estimate_${clientName || 'Client'}.pdf`);
    };

    const clearForm = () => {
        setLength(""); setWidth(""); setThickness(""); setQuantity(1); setPrice(""); setResult(null);
        setClientName(""); setClientPhone("");
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
                <title>Timber CBM Calculator | R.P. Goyal & Sons</title>
                <meta name="description" content="Calculate wood volume in Cubic Meters (CBM) instantly." />
            </Helmet>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Timber <span className="text-[#d97706]">Calculator</span>
                    </h1>
                    <p className="text-gray-500 dark:text-stone-400">
                        Calculate exact volume (CBM) from any unit (MM, CM, Feet).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white dark:bg-[#292524] p-8 rounded-2xl shadow-xl border-t-4 border-[#d97706]"
                    >
                        <form onSubmit={calculateCBM} className="space-y-5">

                            {/* --- CLIENT INPUTS SECTION --- */}
                            <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-gray-200 dark:border-white/5 mb-4">
                                <label className="block text-xs font-bold uppercase text-[#d97706] mb-3 tracking-widest">Client Details (Optional)</label>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            className="w-full pl-10 p-2.5 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded text-sm text-gray-900 dark:text-white focus:border-[#d97706] outline-none"
                                            placeholder="Client Name"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            value={clientPhone}
                                            onChange={(e) => setClientPhone(e.target.value)}
                                            className="w-full pl-10 p-2.5 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded text-sm text-gray-900 dark:text-white focus:border-[#d97706] outline-none"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                            </div>

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
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-stone-400 mb-1">Price per CBM (Optional)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#1c1c1c] rounded border border-gray-200 dark:border-white/10 focus:border-[#d97706] outline-none dark:text-white transition-colors" placeholder="e.g. 50000" />
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
                                    <p className="text-6xl font-serif font-bold">{result.cbm} <span className="text-2xl text-stone-500">cbm</span></p>
                                    <div className="flex items-center gap-2 mt-2 text-white/40 text-xs">
                                        <Info size={14} />
                                        <span>Formula: L(m) × W(m) × T(m)</span>
                                    </div>
                                </div>

                                {parseFloat(result.totalPrice) > 0 && (
                                    <div className="pt-8 border-t border-white/10">
                                        <p className="text-sm text-stone-400 font-bold uppercase tracking-widest mb-1">Estimated Cost</p>
                                        <p className="text-4xl font-serif">₹ {result.totalPrice}</p>
                                    </div>
                                )}

                                <button
                                    onClick={downloadPDF}
                                    className="mt-8 w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded shadow hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download size={18} /> Download Official Quote
                                </button>
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