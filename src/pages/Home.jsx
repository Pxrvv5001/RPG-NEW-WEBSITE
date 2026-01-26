import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import OurStory from "../components/OurStory";
import BusinessGrid from "../components/BusinessGrid";
import InfiniteMarquee from "../components/InfiniteMarquee";
import ProductAtelier from "../components/ProductAtelier";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Helmet>
                <title>R.P. Goyal & Sons | Premier Timber Importers & Sawmill</title>
                <meta name="description" content="Importers of Teak, Pine, and Meranti in Karnal, Haryana. We offer timber supply, plywood manufacturing, and sawmill services." />
            </Helmet>

            <Header />

            <Hero />

            {/* 1. Dark Strip: Adds credibility immediately */}
            <Stats />

            {/* 2. White Section: Split Layout (Image Left/Text Right) */}
            <OurStory />

            {/* 3. Off-White Section: The Core Business Grid */}
            <BusinessGrid />

            {/* 4. Orange Accent Strip: Adds horizontal movement */}
            <InfiniteMarquee />

            {/* 5. Dark Section: Premium Products */}
            <ProductAtelier />

            {/* 6. White Section: Features Grid */}
            <WhyChooseUs />

            {/* 7. CTA & Footer */}
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;