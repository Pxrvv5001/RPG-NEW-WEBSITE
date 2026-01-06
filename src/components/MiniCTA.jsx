import { Link } from "react-router-dom";
import { ArrowRight, Ruler } from "lucide-react";

const MiniCTA = () => {
    return (
        <section className="py-10 bg-[#1c1c1c] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

                {/* Text Side */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d97706]/10 flex items-center justify-center text-[#d97706] shrink-0">
                        <Ruler size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-white">
                            Looking for Custom Sizes?
                        </h3>
                        <p className="text-stone-400 text-sm">
                            We cut to order. Contact us for bulk rates and specifications.
                        </p>
                    </div>
                </div>

                {/* Action Side */}
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#d97706] text-white px-6 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#b45309] transition-colors"
                >
                    Get a Quote <ArrowRight size={16} />
                </Link>

            </div>
        </section>
    );
};

export default MiniCTA;