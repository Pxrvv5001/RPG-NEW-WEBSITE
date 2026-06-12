const items = [
    "Teak Wood", "Meranti", "Pine Wood", "Veneers", "Door Frames",
    "Decking", "Cladding", "Sawmill Services", "Wholesale Timber"
];

const InfiniteMarquee = () => {
    // Duplicate the list so the second half seamlessly replaces the first
    const doubled = [...items, ...items];

    return (
        <div className="bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309] py-5 overflow-hidden relative z-20">
            <div className="flex whitespace-nowrap marquee-track" style={{ width: 'max-content' }}>
                {doubled.map((item, i) => (
                    <div key={i} className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
                        <span className="text-white font-serif font-bold text-lg md:text-2xl uppercase tracking-wider">
                            {item}
                        </span>
                        <span className="text-white/20 text-xl">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;