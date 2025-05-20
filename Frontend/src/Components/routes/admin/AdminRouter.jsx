import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../../../Pages/admin/DashboardPage";
import DashboardLayout from "../../admin/DashboardLayout";
import SignIn from "../../admin/auth/Component/SignIn";
import DataTableExample from "../../comman/dashboard/DataTableExample";

const AdminRouter = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<PrivateRouter><DashboardPage /></PrivateRouter>} />
                <Route path="/product" element={<DataTableExample />} />
                <Route path="/order" element={<h1>Ordres Page</h1>} />
            </Routes>
        </DashboardLayout>

    );
};

export const PrivateRouter = ({ children }) => {
    if (!true) return <Navigate to="/admin/sign-in" replace />;
    return children;
}

export default React.memo(AdminRouter);
