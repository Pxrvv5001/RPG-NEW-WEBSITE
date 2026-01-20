import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] text-white pt-20 pb-10 border-t border-white/5 font-sans">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP SECTION: Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-serif font-bold tracking-tight block mb-6">
                            R.P. Goyal <span className="text-[#d97706]">& Sons</span>
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed mb-6">
                            Premier timber importers and sawmill specialists serving Northern India since 2020. Quality you can trust, wood you can build on.
                        </p>

                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li><Link to="/" className="hover:text-[#d97706] transition-colors flex items-center gap-2">Home</Link></li>
                            <li><Link to="/catalog" className="hover:text-[#d97706] transition-colors flex items-center gap-2">Timber Catalog</Link></li>
                            <li><Link to="/plywood" className="hover:text-[#d97706] transition-colors flex items-center gap-2">Plywood Collection</Link></li>
                            <li><Link to="/calculator" className="hover:text-[#d97706] transition-colors flex items-center gap-2">CFT Calculator</Link></li>
                            <li><Link to="/contact" className="hover:text-[#d97706] transition-colors flex items-center gap-2">Get a Quote</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li className="hover:text-[#d97706] transition-colors cursor-pointer">Custom Sawing</li>
                            <li className="hover:text-[#d97706] transition-colors cursor-pointer">Logistics & Delivery</li>
                            <li className="hover:text-[#d97706] transition-colors cursor-pointer">Wholesale Supply</li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#d97706] shrink-0 mt-1" />
                                <span>Imam Bara, Timber Market,<br />Railway Road, Karnal - 132001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#d97706] shrink-0" />
                                <span>+91 70276 02201</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#d97706] shrink-0" />
                                <span>rpgtimber@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM SECTION: Copyright & Signature */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>© {new Date().getFullYear()} R.P. Goyal & Sons. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>

                    {/* ▼▼▼ YOUR SIGNATURE ▼▼▼ */}
                    <div className="group flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
                        <span>Engineered by</span>
                        <span className="text-white font-bold group-hover:text-[#d97706] transition-colors">Parv</span>
                        <span className="group-hover:animate-pulse">⚡</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;