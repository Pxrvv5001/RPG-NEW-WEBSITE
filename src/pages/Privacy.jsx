import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
    return (
        // Fixed: Changed dark:bg-[#0f172a] to dark:bg-[#1c1c1c]
        <div className="bg-[#f9f8f4] dark:bg-[#1c1c1c] min-h-screen font-sans transition-colors duration-500">
            <Helmet>
                <title>Privacy Policy | R.P. Goyal & Sons</title>
            </Helmet>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-300">
                <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <p>Last updated: January 2025</p>

                    <p>
                        At R.P. Goyal & Sons, accessible from our website, one of our main priorities is the privacy of our visitors.
                        This Privacy Policy document contains types of information that is collected and recorded by R.P. Goyal & Sons and how we use it.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Information We Collect</h2>
                    <p>
                        The personal information that you are asked to provide, and the reasons why you are asked to provide it,
                        will be made clear to you at the point we ask you to provide your personal information.
                    </p>
                    <p>
                        If you contact us directly, we may receive additional information about you such as your name, email address,
                        phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Communicate with you, either directly or through one of our partners</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Log Files</h2>
                    <p>
                        R.P. Goyal & Sons follows a standard procedure of using log files. These files log visitors when they visit websites.
                        All hosting companies do this and a part of hosting services' analytics.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;