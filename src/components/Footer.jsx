import { MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (id) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="contact" className="bg-white dark:bg-[#0f172a] text-gray-600 dark:text-slate-300 pt-20 pb-8 border-t border-gray-200 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Column 1: Brand Identity */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif text-[#1c1c1c] dark:text-white tracking-wide transition-colors">
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
                    <h3 className="text-[#1c1c1c] dark:text-white font-bold uppercase tracking-widest text-sm mb-6 transition-colors">Divisions</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <button onClick={() => handleScroll('divisions')} className="hover:text-[#d97706] transition text-left bg-transparent border-none cursor-pointer text-gray-600 dark:text-slate-300">
                                Timber Imports
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleScroll('divisions')} className="hover:text-[#d97706] transition text-left bg-transparent border-none cursor-pointer text-gray-600 dark:text-slate-300">
                                Plywood Manufacturing
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleScroll('divisions')} className="hover:text-[#d97706] transition text-left bg-transparent border-none cursor-pointer text-gray-600 dark:text-slate-300">
                                Sawmill Services
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Information */}
                <div className="md:col-span-2">
                    <h3 className="text-[#1c1c1c] dark:text-white font-bold uppercase tracking-widest text-sm mb-6 transition-colors">Contact Us</h3>
                    <ul className="space-y-4 text-sm font-light">
                        {/* ADDRESS LINK - NOW CLICKABLE */}
                        <li className="flex items-start gap-3">
                            <MapPin className="text-[#d97706] shrink-0" size={18} />
                            <a
                                href="https://www.google.com/maps/place/R+P+Goyal+%26+Sons+Pvt.+Ltd./@29.6881906,76.9821432,17z/data=!3m1!4b1!4m6!3m5!1s0x390e7022e3089c75:0x278c784abefd48a3!8m2!3d29.6881906!4d76.9847181!16s%2Fg%2F11g6btb7yc?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-slate-300 hover:text-[#d97706] dark:hover:text-[#d97706] transition-colors"
                            >
                                Imam Bara, Timber Market,<br />
                                Railway Road, Karnal,<br />
                                Haryana - 132001
                            </a>
                        </li>

                        <li className="flex items-center gap-3">
                            <Mail className="text-[#d97706] shrink-0" size={18} />
                            <a href="mailto:rpgtimber@gmail.com" className="hover:text-[#d97706] dark:hover:text-white transition text-gray-600 dark:text-slate-300">
                                rpgtimber@gmail.com
                            </a>
                        </li>

                        <li className="flex items-center gap-3">
                            <Phone className="text-[#d97706] shrink-0" size={18} />
                            <a href="tel:+917027602201" className="hover:text-[#d97706] dark:hover:text-white transition text-gray-600 dark:text-slate-300">
                                +91 7027602201
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-slate-800 pt-8 text-center text-xs text-gray-500 dark:text-slate-600 transition-colors">
                <p>&copy; 2025 R.P. Goyal & Sons Pvt. Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;