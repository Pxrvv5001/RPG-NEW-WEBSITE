import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
    return (
        // Fixed: Changed dark:bg-[#0f172a] to dark:bg-[#1c1c1c]
        <div className="bg-[#f9f8f4] dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Terms of Service | R.P. Goyal & Sons</title>
            </Helmet>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-300">
                <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <p>
                        These terms and conditions outline the rules and regulations for the use of R.P. Goyal & Sons' Website.
                    </p>
                    <p>
                        By accessing this website we assume you accept these terms and conditions. Do not continue to use our website
                        if you do not agree to take all of the terms and conditions stated on this page.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">License</h2>
                    <p>
                        Unless otherwise stated, R.P. Goyal & Sons and/or its licensors own the intellectual property rights for all material on this website.
                        All intellectual property rights are reserved. You may access this from R.P. Goyal & Sons for your own personal use subjected to restrictions set in these terms and conditions.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">You must not:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Republish material from R.P. Goyal & Sons</li>
                        <li>Sell, rent or sub-license material from R.P. Goyal & Sons</li>
                        <li>Reproduce, duplicate or copy material from R.P. Goyal & Sons</li>
                        <li>Redistribute content from R.P. Goyal & Sons</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Disclaimer</h2>
                    <p>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;