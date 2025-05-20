import { Bell, ChevronRight, HelpCircle, LogOut, Menu, Settings, User } from 'lucide-react';
import React, { useState } from 'react'


const Topbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const Props = {
    open, setOpen
  }
  console.log("HEADER RENDER");

  return (
    <header className="py-1 border-b-2 border-light bg-white sticky top-0 flex items-center justify-between px-5 z-10">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:bg-light focus:outline-none mr-2 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center space-x-2 text-sm">
          <span>Dashboard</span>
          <ChevronRight size={14} />
          {/* <span className="font-medium">{activeItem}</span> */}
        </div>
      </div>

      {/* Right side with header actions */}
      <div className="flex items-center space-x-3">
        <button className="p-1.5 rounded-md hover:bg-light relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-1.5 rounded-md hover:bg-light">
          <Settings size={18} />
        </button>
        <div className="h-8 mx-2 border-l border-gray-200"></div>
        <UserDropdown {...Props} />
      </div>
    </header>
  )
}



export const UserDropdown = React.memo(({ open, setOpen }) => {

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-light focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
          <div className="px-4 py-2 border-b border-primary-dark/30">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
          <div className="py-1">
            <a href="#" className="px-4 py-2 text-sm flex items-center space-x-2 hover:bg-light">
              <Settings size={16} />
              <span>Settings</span>
            </a>
            <a href="#" className="px-4 py-2 text-sm flex items-center space-x-2 hover:bg-light">
              <HelpCircle size={16} />
              <span>Help</span>
            </a>
            <a href="#" className="px-4 py-2 text-sm flex items-center space-x-2 hover:bg-light text-red-500">
              <LogOut size={16} />
              <span>Logout</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
});


export default React.memo(Topbar);