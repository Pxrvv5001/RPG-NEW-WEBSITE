import { Helmet } from "react-helmet-async";
import { Scale } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms = () => {
    return (
        <div className="bg-[#f9f8f4] dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Terms of Service | R.P. Goyal &amp; Sons Private Limited</title>
                <meta name="description" content="Read the Terms of Service for R.P. Goyal &amp; Sons Private Limited — the rules and regulations governing the use of our website." />
            </Helmet>

            <Header />

            {/* Page Banner */}
            <div className="bg-[#1c1c1c] pt-32 pb-12 px-6 text-center border-b border-white/5">
                <div className="inline-flex items-center gap-2 bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                    <Scale size={13} />
                    Legal
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-3">Terms of Service</h1>
                <p className="text-stone-500 text-xs tracking-widest uppercase">Last updated: January 2026</p>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="bg-white dark:bg-[#232120] border border-gray-200 dark:border-white/8 rounded-2xl px-8 py-10 shadow-sm space-y-10 text-sm text-gray-600 dark:text-stone-400 leading-relaxed">

                    <p>
                        These terms and conditions outline the rules and regulations for the use of R.P. Goyal &amp; Sons Private Limited's website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use our website if you do not agree to all of the terms and conditions stated on this page.
                    </p>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            License
                        </h2>
                        <p>
                            Unless otherwise stated, R.P. Goyal &amp; Sons Private Limited and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from our website for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            You Must Not
                        </h2>
                        <ul className="space-y-1.5 pl-4">
                            {[
                                "Republish material from R.P. Goyal & Sons Private Limited",
                                "Sell, rent, or sub-license material from our website",
                                "Reproduce, duplicate, or copy material for commercial purposes",
                                "Redistribute content from this website",
                                "Use this website in any unlawful or harmful manner",
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
                            Disclaimer
                        </h2>
                        <p>
                            To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury resulting from negligence, fraud, or fraudulent misrepresentation.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Governing Law
                        </h2>
                        <p>
                            These terms and conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts located in Karnal, Haryana.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d97706] rounded-full inline-block" />
                            Contact Us
                        </h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at{" "}
                            <a href="mailto:rpgtimber@gmail.com" className="text-[#d97706] hover:underline font-medium">rpgtimber@gmail.com</a>{" "}
                            or call <span className="text-gray-800 dark:text-stone-300 font-medium">+91 70276 02201</span>.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;