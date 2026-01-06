import { MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        // Changed bg-[#0f172a] -> bg-[#1c1c1c] and text-slate -> text-stone
        <footer id="contact" className="bg-[#1c1c1c] text-stone-300 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Column 1: Brand */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif text-white tracking-wide">
                        R.P. GOYAL <span className="text-[#d97706]">&</span> SONS
                    </h2>
                    <p className="text-sm text-stone-400 opacity-80 leading-relaxed">
                        Private Limited · Est. 2020<br/>
                        Premier Importers of Global Hardwood and Softwood.
                    </p>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#d97706] text-xs font-bold uppercase">
                            <ShieldCheck size={16} />
                            <span>Govt. Registered</span>
                        </div>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Divisions</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/catalog" className="text-stone-400 hover:text-[#d97706] transition-colors">Timber Imports</Link></li>
                        <li><Link to="/plywood" className="text-stone-400 hover:text-[#d97706] transition-colors">Plywood Manufacturing</Link></li>
                        <li><Link to="/services" className="text-stone-400 hover:text-[#d97706] transition-colors">Sawmill Services</Link></li>
                        <li><Link to="/calculator" className="text-stone-400 hover:text-[#d97706] transition-colors">CFT Calculator</Link></li>
                        <li><Link to="/gallery" className="text-stone-400 hover:text-[#d97706] transition-colors">Gallery</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="md:col-span-2">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-sm font-light">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-[#d97706] shrink-0" size={18} />
                            <a href="https://maps.app.goo.gl/YourGoogleMapLink" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors leading-relaxed">
                                Imam Bara, Timber Market,<br />Railway Road, Karnal, Haryana - 132001
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-[#d97706] shrink-0" size={18} />
                            <a href="mailto:rpgtimber@gmail.com" className="text-stone-400 hover:text-white transition-colors">rpgtimber@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-[#d97706] shrink-0" size={18} />
                            <a href="tel:+917027602201" className="text-stone-400 hover:text-white transition-colors">+91 7027602201</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                <p>© 2025 R.P. Goyal & Sons Pvt. Ltd.</p>
                <div className="flex gap-4">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
export default Footer;