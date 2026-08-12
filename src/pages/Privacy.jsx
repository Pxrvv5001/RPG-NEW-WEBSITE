import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy = () => {
    return (
        <div className="bg-[#f9f8f4] dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Privacy Policy | R.P. Goyal &amp; Sons Private Limited</title>
                <meta name="description" content="Read the Privacy Policy for R.P. Goyal & Sons Private Limited — how we collect, use, and protect your personal information." />
            </Helmet>

            <Header />

            {/* Page Banner */}
            <div className="bg-[#1c1c1c] pt-32 pb-12 px-6 text-center border-b border-white/5">
                <div className="inline-flex items-center gap-2 bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                    <Shield size={13} />
                    Legal
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-3">Privacy Policy</h1>
                <p className="text-stone-500 text-xs tracking-widest uppercase">Last updated: January 2026</p>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="bg-white dark:bg-[#232120] border border-gray-200 dark:border-white/8 rounded-2xl px-8 py-10 shadow-sm space-y-10 text-sm text-gray-600 dark:text-stone-400 leading-relaxed">

                    <p>
                        At R.P. Goyal &amp; Sons Private Limited, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy outlines the types of information we collect and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                    </p>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Information We Collect
                        </h2>
                        <p>
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide it. If you contact us directly, we may receive additional information such as your name, email address, phone number, and the contents of your message.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            How We Use Your Information
                        </h2>
                        <p>We use the information we collect to:</p>
                        <ul className="space-y-1.5 pl-4">
                            {[
                                "Provide, operate, and maintain our website",
                                "Respond to your enquiries and send you quotes",
                                "Improve, personalize, and expand our services",
                                "Communicate with you about products and promotions",
                                "Find and prevent fraud",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#d97706] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Log Files
                        </h2>
                        <p>
                            R.P. Goyal &amp; Sons Private Limited follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date and time stamp, and referring/exit pages. This is not linked to any personally identifiable information and is used solely for analyzing trends and administering the site.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Data Security
                        </h2>
                        <p>
                            We take the security of your data seriously. Your enquiry data is transmitted securely and is only accessible to authorized members of our sales team. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:rpgtimber@gmail.com" className="text-[#d97706] hover:underline font-medium">rpgtimber@gmail.com</a>{" "}
                            or call us at <span className="text-gray-800 dark:text-stone-300 font-medium">+91 70276 02201</span>.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;