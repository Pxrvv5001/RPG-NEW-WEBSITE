import { MapPin, Mail, Phone, ShieldCheck } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#0f172a] text-slate-300 pt-20 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Column 1: Brand Identity */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif text-white tracking-wide">
                        R.P. GOYAL <span className="text-[#d97706]">&</span> SONS
                    </h2>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Private Limited · Est. 2020<br/>
                        Premier Importers of Global Hardwood and Softwood.
                    </p>
                    <div className="flex items-center gap-2 text-[#d97706] text-xs font-bold uppercase">
                        <ShieldCheck size={16} />
                        <span>Govt. Registered</span>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Divisions</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#divisions" className="hover:text-[#d97706] transition">Timber Imports</a></li>
                        <li><a href="#divisions" className="hover:text-[#d97706] transition">Plywood Manufacturing</a></li>
                        <li><a href="#divisions" className="hover:text-[#d97706] transition">Sawmill Services</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact Information */}
                <div className="md:col-span-2">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-sm font-light">
                        {/* Address */}
                        <li className="flex items-start gap-3">
                            <MapPin className="text-[#d97706] shrink-0" size={18} />
                            <span>
                Imam Bara, Timber Market,<br />
                Railway Road, Karnal,<br />
                Haryana - 132001
              </span>
                        </li>

                        {/* Email */}
                        <li className="flex items-center gap-3">
                            <Mail className="text-[#d97706] shrink-0" size={18} />
                            <a href="mailto:rpgtimber@gmail.com" className="hover:text-white transition">
                                rpgtimber@gmail.com
                            </a>
                        </li>

                        {/* Phone Number (New) */}
                        <li className="flex items-center gap-3">
                            <Phone className="text-[#d97706] shrink-0" size={18} />
                            {/* ▼ CHANGE THIS NUMBER TO YOUR DAD'S REAL NUMBER ▼ */}
                            <a href="tel:+917027602201" className="hover:text-white transition">
                                +91 7027602201
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
                <p>&copy; 2025 R.P. Goyal & Sons Pvt. Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;