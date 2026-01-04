import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BusinessGrid from "../components/BusinessGrid";
import ProductAtelier from "../components/ProductAtelier";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Helmet>
                <title>R.P. Goyal & Sons | Premier Timber Importers & Sawmill</title>
                <meta name="description" content="Importers of Burma Teak, Pine, and Meranti in Karnal, Haryana. We offer timber supply, plywood manufacturing, and sawmill services." />
            </Helmet>

            <Header />
            <Hero />
            <BusinessGrid />
            <ProductAtelier />
            <Footer />
        </div>
    );
};

export default Home;