import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../../Pages/client/Home/Home";
import Registration from "../../../Pages/client/Home/Registration";
import Login from "../../../Pages/client/Home/Login";
import SomeComponent from "../../testingComponnet/SomeComponent";
import { useFetchCurrentAuth } from "../../../Hooks/useFetchCurrentAuth";
import SpinnerLoader from "../../comman/SpinnerLoader";
import { useSelector } from "react-redux";
import AuthSuccess from "../../client/AuthSuccess";
import ShopListPage from "../../../Pages/client/ShopListPage/ShopListPage";
import Header from "../../client/layout/Header";
import ShoppingCartCheckout from "../../../Pages/client/ShoppingCartCheckout/ShoppingCartCheckout";

const ClientRouter = () => {
    useFetchCurrentAuth();
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />

            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/sign-up" element={<Registration />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/testing" element={<SomeComponent />} />
            <Route path="/loader" element={<SpinnerLoader />} />
            <Route path="/cart" element={<ShoppingCartCheckout />} />
            <Route path="/shop" element={
                <>
                    <Header />
                    <ShopListPage />
                </>
            } />


        </Routes>
    );
};

export const PrivateRoute = ({ children }) => {
    const { isLoading, isLoggedIn } = useSelector(state => state.user);

    if (isLoading) return <SpinnerLoader />;
    if (!isLoggedIn) return <Navigate to="/sign-in" replace />;
    return children;
}

export default React.memo(ClientRouter);
