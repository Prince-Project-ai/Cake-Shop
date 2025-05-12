import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {

  return (
    <section className="relative py-23 sm:py-24 md:py-28 flex items-center justify-center overflow-hidden bg-white">
      {/* Blurred background glow */}
      <div className="absolute left-1/2 -bottom-32 w-[800px] h-[200px] -translate-x-1/2 bg-accent/50 rounded-t-[6rem] blur-[100px]"></div>

      {/* Main content */}
      <div className="w-full max-w-7xl px-4 flex items-center justify-center z-10">
        <div className={`text-center max-w-4xl`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight mb-6">
            Celebrate Every Moment with <span className="text-accent">Delicious Cakes</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Order handcrafted cakes made with love and premium ingredients. Perfect for birthdays, weddings, or just because!
          </p>

          <div className="flex  gap-4 justify-center">
            <button className="cursor-pointer px-5 py-3 bg-accent text-white rounded leading-1">
              Order Now
            </button>

            <button className="cursor-pointer px-5 py-3 bg-white text-accent border rounded">
              View Menu
            </button>
          </div>

          <div className="mt-14 flex items-center justify-center">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/women/${20 + i}.jpg`}
                    alt="Happy customer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="ml-4 text-sm text-gray-600">
              <span className="font-bold text-primary-dark">500+</span> happy customers and counting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
