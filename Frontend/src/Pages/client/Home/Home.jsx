import React from "react";
import Header from "../../../Components/client/layout/Header";
import HeroSection from "../../../Components/client/Home/HeroSection";
// import FeaturedProducts from "../../../Components/client/Home/FeaturedProducts";
// import Testimonials from "../../../Components/client/Home/Testimonials";
// import CakeCategories from "../../../Components/client/Home/CakeCategories";
import { useSelector } from "react-redux";
// import SpinnerLoader from "../../../Components/comman/SpinnerLoader";
import ProductCategories from "../../../Components/client/ProductCategories";
import Footer from "../../../Components/client/Footer";

const Home = () => {
    const { user, isLoggedIn } = useSelector(state => state.user);
    // console.log("User: ", user);
    // console.log("Status: ", isLoggedIn);
    return (
        <>
            {/* <SpinnerLoader /> */}
            <Header />
            <HeroSection />
            <ProductCategories />
            <Footer />
            {/* <FeaturedProducts />
            <Testimonials />
            <CakeCategories /> */}
        </>
    );
};

export default Home;
