import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { catalogData } from "../data/catalogData";

// ▼▼▼ IMPORTING LOCAL IMAGES ▼▼▼
import teakImg from "../assets/teak.jpg";
import merantiImg from "../assets/meranti.jpg";
import pineImg from "../assets/pine.jpg";
import spruceImg from "../assets/spruce.jpg";
import walnutImg from "../assets/walnut.jpg";
import ashImg from "../assets/ash.jpg";

// Map keys from data to actual imported images
const imageMap = {
    teak: teakImg,
    meranti: merantiImg,
    pine: pineImg,
    spruce: spruceImg,
    walnut: walnutImg,
    ash: ashImg
};

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // Filter Logic
    const filteredProducts = catalogData.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen font-sans transition-colors duration-500">
            {/* SEO TAGS */}
            <Helmet>
                <title>Timber Catalog | R.P. Goyal & Sons</title>
                <meta name="description" content="Browse our premium selection of Burma Teak, Pine, Meranti, and global hardwoods available for wholesale." />
            </Helmet>

            <Header />

            {/* Hero Header */}
            <div className="bg-[#1c1c1c] pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Timber Catalog</h1>
                <p className="text-slate-400 text-sm tracking-widest uppercase">Explore our collection of premium global woods</p>
            </div>

            {/* Search & Filter Section */}
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search timber..."
                        className="w-full md:w-1/3 p-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-gray-900 dark:text-white focus:outline-none focus:border-[#d97706]"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        {['All', 'Hardwood', 'Softwood'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded transition-colors ${
                                    filterCategory === cat
                                        ? 'bg-[#d97706] text-white'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredProducts.map((item, index) => (
                            <InfoCard
                                key={item.id}
                                delay={index}
                                image={imageMap[item.imageKey]}
                                title={item.name}
                                subtitle={item.origin}
                                tag={item.grade}
                                description={item.desc}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 dark:text-slate-500">
                        <p>No products match your search criteria.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Catalog;