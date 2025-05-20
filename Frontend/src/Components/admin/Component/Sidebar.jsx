import { BarChart, Boxes, ChevronDown, ChevronRight, ClipboardList, CreditCard, FileCheck, FileX, Home, KeyRound, LayoutDashboard, Megaphone, Package, Puzzle, Settings, ShoppingCart, Truck, UserCog, Users, X } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, isMobile, toggleSidebar }) => {
    console.log("SIDEBAR RENDER");
    return (
        <>
            {/* Sidebar */}
            <aside
                className={`bg-white flex flex-col z-30 transition-all duration-300 ease-in-out
                    fixed inset-y-0 left-0 lg:relative border-r-2 border-light shadow-2xl
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    max-w-72 w-full shadow-lg lg:shadow-none`}
            >
                {/* Sidebar Header */}
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="font-header font-bold text-xl sm:text-2xl md:text-3xl">Cake Console</h2>
                    </div>
                    {isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                            aria-label="Close sidebar"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Scrollable Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-4 px-2 space-y-2 hide-scrollbar">
                    <SidebarItem
                        label="Dashboard"
                        icon={<Home size={20} />}
                    />
                    <SidebarItem
                        label="Products"
                        icon={<Package size={20} />}
                        to="/admin/product"
                    />

                    <SidebarMenu
                        title="Analytics"
                        icon={<BarChart size={20} />}
                    // defaultOpen={true}
                    >
                        <SidebarItem
                            label="Overview"
                            icon={<LayoutDashboard size={20} />}
                        />
                        <SidebarItem
                            label="Reports"
                            icon={<ClipboardList size={20} />}
                        />
                    </SidebarMenu>

                    <SidebarItem
                        label="Customers"
                        icon={<Users size={20} />}
                    />

                    <SidebarMenu
                        title="Orders"
                        icon={<ShoppingCart size={20} />}
                    >
                        <SidebarItem
                            label="Pending"
                            icon={<ClipboardList size={20} />}
                        />
                        <SidebarItem
                            label="Delivered"
                            icon={<FileCheck size={20} />}
                        />
                        <SidebarItem
                            label="Cancelled"
                            icon={<FileX size={20} />}
                        />
                    </SidebarMenu>

                    <SidebarItem
                        label="Inventory"
                        icon={<Boxes size={20} />}
                    />
                    <SidebarItem
                        label="Marketing"
                        icon={<Megaphone size={20} />}
                    />
                    <SidebarItem
                        label="Payments"
                        icon={<CreditCard size={20} />}
                    />
                    <SidebarItem
                        label="Shipping"
                        icon={<Truck size={20} />}
                    />

                    <SidebarItem
                        label="Settings"
                        icon={<Settings size={20} />}
                    />
                    <SidebarItem
                        label="Users"
                        icon={<UserCog size={20} />}
                    />
                    <SidebarItem
                        label="Permissions"
                        icon={<KeyRound size={20} />}
                    />
                    <SidebarItem
                        label="Integrations"
                        icon={<Puzzle size={20} />}
                    />
                </div>
            </aside>
        </>
    )
}

export default React.memo(Sidebar);


// Dropdown sidebar menu
export const SidebarMenu = React.memo(({ title, children, icon }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-4 py-2.5 font-medium hover:bg-light rounded transition duration-150 font-body"
            >
                <div className="flex items-center space-x-3">
                    {icon && <span className="text-gray-700">{icon}</span>}
                    <span>{title}</span>
                </div>
                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            <div
                className={`pl-6 overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'
                    }`}
            >
                {children}
            </div>
        </div>
    );
});


// Normal sidebar item
export const SidebarItem = React.memo(({ label, icon, to }) => (
    <NavLink to={to}
        className="w-full text-left px-4 py-2.5 flex items-center space-x-3 rounded transition duration-150 hover:bg-light text-zinc-600"
    >
        {icon && <span className='text-zinc-700'>{icon}</span>}
        <span className="font-normal    ">{label}</span>
    </NavLink>
));

