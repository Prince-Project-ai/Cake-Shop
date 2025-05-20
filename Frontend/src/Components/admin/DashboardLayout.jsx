import React, { useState, useEffect } from 'react';
import Footer from './Component/Footer';
import Topbar from './Component/Topbar';
import Sidebar from './Component/Sidebar';

// Main Dashboard layout
const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(true);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
                setIsMobile(true);
            } else {
                setSidebarOpen(true);
                setIsMobile(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarProps = {
        sidebarOpen,
        isMobile,
        toggleSidebar
    }

    if (!isLoggedin) return children;



    return (
        <div className="flex h-screen overflow-hidden bg-white text-primary-dark">
            {/* Backdrop overlay for mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            <Sidebar {...sidebarProps} />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full overflow-hidden overflow-y-auto">
                <Topbar toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <main className="bg-light/30 p-5">
                    {children || "Content"}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;