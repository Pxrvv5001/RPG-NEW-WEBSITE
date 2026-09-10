import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Local Images
import loadingImg from "../assets/Loading.jpeg";
import finishedTeakImg from "../assets/FinishedTeak.jpeg";
import machineryImg from "../assets/Machinery.jpeg";
import yardStockImg from "../assets/YardStock.jpg";
import pineLogsImg from "../assets/PineLogs.jpeg";

const galleryImages = [
    { id: 1, src: loadingImg, category: "Loading Operations" },
    { id: 2, src: finishedTeakImg, category: "Finished Teak" },
    { id: 3, src: machineryImg, category: "Machinery" },
    { id: 4, src: yardStockImg, category: "Yard Stock" },
    { id: 5, src: pineLogsImg, category: "Pine Logs" },
];

const Gallery = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const openLightbox = (i) => setOpenIndex(i);
    const closeLightbox = () => setOpenIndex(null);

    const nextImage = useCallback((e) => {
        if (e) e.stopPropagation();
        setOpenIndex((prev) => (prev + 1) % galleryImages.length);
    }, []);

    const prevImage = useCallback((e) => {
        if (e) e.stopPropagation();
        setOpenIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }, []);

    // Keyboard navigation and background scroll lock
    useEffect(() => {
        if (openIndex === null) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [openIndex, nextImage, prevImage]);

    const currentImage = openIndex !== null ? galleryImages[openIndex] : null;

    return (
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Our Gallery | R.P. Goyal & Sons Timber & Sawmill</title>
                <meta
                    name="description"
                    content="A glimpse into R.P. Goyal & Sons yard, stock, and timber processing operations in Karnal and Gandhidham."
                />
            </Helmet>

            <Header />

            {/* Header Banner */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-serif text-white font-bold mb-4"
                >
                    Our <span className="text-[#d97706]">Gallery</span>
                </motion.h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">
                    A glimpse into our yard &amp; operations
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, i) => (
                        <motion.div
                            key={image.id}
                            onClick={() => openLightbox(i)}
                            className={`group relative h-72 cursor-pointer overflow-hidden rounded-lg shadow-lg bg-stone-900 ${
                                i === 0 ? "md:col-span-2" : ""
                            }`}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.25 }}
                        >
                            <img
                                src={image.src}
                                alt={image.category}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <ZoomIn className="text-[#d97706] mx-auto mb-2" size={28} />
                                    <p className="text-white font-bold uppercase tracking-wider text-sm">
                                        {image.category}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal — Bug-free without layoutId conflict */}
            <AnimatePresence>
                {openIndex !== null && currentImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white hover:rotate-90 transition-all p-2 z-50 cursor-pointer"
                            onClick={closeLightbox}
                            aria-label="Close image preview"
                        >
                            <X size={36} />
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#d97706] hover:scale-110 transition-all p-3 z-50 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#d97706] hover:scale-110 transition-all p-3 z-50 cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image */}
                        <div
                            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={currentImage.id}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                src={currentImage.src}
                                alt={currentImage.category}
                                className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain select-none"
                            />

                            {/* Caption */}
                            <div className="mt-4 text-center pointer-events-none">
                                <p className="text-white/90 font-serif text-lg tracking-wide">
                                    {currentImage.category}
                                </p>
                                <p className="text-stone-400 text-xs mt-1 font-mono">
                                    {openIndex + 1} / {galleryImages.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;