import React from "react";
import Header from "../../../Components/client/layout/Header";
import HeroSection from "../../../Components/client/Home/HeroSection";
import { useSelector } from "react-redux";
import ProductCategories from "../../../Components/client/ProductCategories";
import Footer from "../../../Components/client/Footer";

const Home = () => {
    const { user, isLoggedIn } = useSelector(state => state.user);
    // console.log("User: ", user);
    // console.log("Status: ", isLoggedIn);
    return (
        <>
            <Header />
            <HeroSection />
            <ProductCategories />
            <Footer />
        </>
    );
};

export default Home;
