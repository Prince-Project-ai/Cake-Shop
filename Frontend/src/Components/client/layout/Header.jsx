import React from "react";
import { ShoppingCart, Search, User, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    lable: "Home",
    path: "/"
  },
  {
    id: 2,
    lable: "Shop",
    path: "/shop"
  },
];

const Header = () => {
  return (
    <div className="max-w-7xl sticky top-0 z-50 mx-auto px-4 ">
      <div className="bg-white shadow-md flex items-center rounded-b-xl justify-between py-2 px-4">
        {/* Left: Logo */}
        <div className="font-heading  text-xl font-bold text-primary-dark">
          Cake <span className="text-accent">Bliss</span>
        </div>

        {/* Center: Menu with underline animation (left to right) */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className="hover-underline-reverse hover:text-accent text-primary-dark font-body transition-colors"
            >
              {item.lable}
            </NavLink>

          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 text-primary-dark">
          <input type="search" placeholder="Search.." className="border font-body py-1 rounded-md px-3 border-zinc-300 outline-none shadow-sm" />
          {/* <button className="hover:text-accent p-2 hover:bg-light rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button> */}
          <button className="hover:text-accent p-2 hover:bg-light rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="hover:text-accent p-2 hover:bg-light rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="hover:text-accent p-2 hover:bg-light rounded-full transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};


export default React.memo(Header);