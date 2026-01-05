import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
    return (
        <section className="py-24 bg-[#1c1c1c] relative overflow-hidden border-t border-white/5">
            {/* Subtle Background Glows (Optional) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d97706] rounded-full blur-[128px] opacity-10"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-900 rounded-full blur-[128px] opacity-10"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                    Ready to Build Something <span className="text-[#d97706]">Legendary?</span>
                </h2>

                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Whether you need a single truckload or a long-term supply contract,
                    we are ready to serve you with premium global timber.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    {/* Primary Button: Orange */}
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-[#d97706] text-white px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-[#b45309] transition-all shadow-lg hover:shadow-orange-500/20"
                    >
                        Get a Quote <ArrowRight size={18} />
                    </Link>

                    {/* Secondary Button: Outline */}
                    <Link
                        to="/catalog"
                        className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-700 text-gray-300 px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
                    >
                        View Catalog
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;