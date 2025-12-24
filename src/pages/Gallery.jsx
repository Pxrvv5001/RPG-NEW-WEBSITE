import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// REPLACE THESE URLs WITH YOUR OWN IMAGES LATER
const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1610505466013-399ea40fa782?q=80&w=800", category: "Yard Stock" },
    { id: 2, src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800", category: "Machinery" },
    { id: 3, src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800", category: "Pine Logs" },
    { id: 4, src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", category: "Finished Teak" },
    { id: 5, src: "https://images.unsplash.com/photo-1505409627996-76e8a2910c79?q=80&w=800", category: "Warehouse" },
    { id: 6, src: "https://images.unsplash.com/photo-1621260650965-021966589334?q=80&w=800", category: "Loading" },
];

const Gallery = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            <Header />

            {/* Page Header */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-white font-bold mb-4"
                >
                    Our <span className="text-[#d97706]">Gallery</span>
                </motion.h1>
                <p className="text-slate-400 text-sm tracking-widest uppercase">
                    A glimpse into our yard & operations
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image) => (
                        <motion.div
                            key={image.id}
                            layoutId={`card-${image.id}`}
                            onClick={() => setSelectedId(image.id)}
                            className="group relative h-72 cursor-pointer overflow-hidden rounded-lg shadow-lg"
                            whileHover={{ y: -5 }}
                        >
                            <img
                                src={image.src}
                                alt={image.category}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
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

            {/* Lightbox Modal (Click to Expand) */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedId(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                            <X size={40} />
                        </button>

                        {galleryImages.map((image) => {
                            if (image.id === selectedId) {
                                return (
                                    <motion.img
                                        layoutId={`card-${image.id}`}
                                        key={image.id}
                                        src={image.src}
                                        className="max-h-[85vh] max-w-full rounded shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                );
                            }
                            return null;
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;