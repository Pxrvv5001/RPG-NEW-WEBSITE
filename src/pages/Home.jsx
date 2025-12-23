import Header from "../components/Header";
import Hero from "../components/Hero";
import BusinessGrid from "../components/BusinessGrid";
import ProductAtelier from "../components/ProductAtelier";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Header />
            <Hero />
            <BusinessGrid />
            <ProductAtelier />
            <Footer />
        </div>
    );
};

export default Home;