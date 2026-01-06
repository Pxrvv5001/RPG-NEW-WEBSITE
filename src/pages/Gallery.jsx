import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Local Images
import loadingImg from "../assets/Loading.jpeg";
import finishedTeakImg from "../assets/FinishedTeak.jpeg";
import machineryImg from "../assets/Machinery.jpeg";
import yardStockImg from "../assets/YardStock.jpeg";

const galleryImages = [
    { id: 1, src: loadingImg, category: "Loading Operations" },
    { id: 2, src: finishedTeakImg, category: "Finished Teak" },
    { id: 3, src: machineryImg, category: "Machinery" },
    { id: 4, src: yardStockImg, category: "Yard Stock" },
    { id: 5, src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800", category: "Pine Logs" }
];

const Gallery = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [index, setIndex] = useState(0);

    const openLightbox = (i) => {
        setIndex(i);
        setSelectedId(galleryImages[i].id);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const newIndex = (index + 1) % galleryImages.length;
        setIndex(newIndex);
        setSelectedId(galleryImages[newIndex].id);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const newIndex = (index - 1 + galleryImages.length) % galleryImages.length;
        setIndex(newIndex);
        setSelectedId(galleryImages[newIndex].id);
    };

    return (
        // Theme: Charcoal BG
        <div className="bg-white dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Header />

            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center border-b border-white/5">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-white font-bold mb-4"
                >
                    Our <span className="text-[#d97706]">Gallery</span>
                </motion.h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase">
                    A glimpse into our yard & operations
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, i) => (
                        <motion.div
                            key={image.id}
                            layoutId={`gallery-card-${image.id}`} // Ensure unique ID
                            onClick={() => openLightbox(i)}
                            className={`group relative h-72 cursor-pointer overflow-hidden rounded-lg shadow-lg ${i === 0 ? "md:col-span-2" : ""}`}
                            whileHover={{ y: -5 }}
                        >
                            <img
                                src={image.src}
                                alt={image.category}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center">
                                    <ZoomIn className="text-[#d97706] mx-auto mb-2" />
                                    <p className="text-white font-bold uppercase tracking-wider text-sm">{image.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Controls remain the same */}
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50" onClick={() => setSelectedId(null)}>
                            <X size={40} />
                        </button>
                        <button onClick={prevImage} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#d97706] transition-colors p-2 z-50">
                            <ChevronLeft size={48} />
                        </button>
                        <button onClick={nextImage} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#d97706] transition-colors p-2 z-50">
                            <ChevronRight size={48} />
                        </button>

                        <motion.img
                            key={index}
                            layoutId={`gallery-card-${galleryImages[index].id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            src={galleryImages[index].src}
                            className="max-h-[85vh] max-w-full rounded shadow-2xl object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
                            <p className="text-white/80 font-serif text-lg">{galleryImages[index].category}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;