import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Confit from "../../../assets/Images/Pattern/confit.png";
import MiniDot from "../../../assets/Images/Pattern/mini-dot.png";
import BigDot from "../../../assets/Images/Pattern/big-dot.png";
import Springle from "../../../assets/Images/Pattern/sprinngle.png";

const CakeCategories = () => {
  const categories = [
    {
      id: "birthday",
      name: "Birthday Cakes",
      description: "Make your celebration unforgettable with our custom birthday designs",
      image: Confit,
      count: 24,
      color: "primary"
    },
    {
      id: "wedding",
      name: "Wedding Cakes",
      description: "Elegant multi-tier masterpieces for your special day",
      image: MiniDot,
      count: 18,
      color: "secondary"
    },
    {
      id: "anniversary",
      name: "Anniversary Cakes",
      description: "Celebrate your love story with our romantic designs",
      image: BigDot,
      count: 16,
      color: "accent"
    },
    {
      id: "party",
      name: "Party Cakes",
      description: "Perfect for gatherings and special celebrations",
      image: Springle,
      count: 20,
      color: "primary"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/3 w-24 h-24 rounded-full bg-primary-100 blur-2xl opacity-60"></div>
      <div className="absolute right-0 bottom-1/3 w-32 h-32 rounded-full bg-secondary-100 blur-2xl opacity-60"></div>

      <div className="container relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="badge badge-primary mb-4 inline-block">Our Specialties</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">Explore Our Cake Categories</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            From birthdays to weddings, we craft the perfect cake for every occasion with premium ingredients and artistic designs.
          </p>
        </div>

        {/* Categories grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-md bg-white border border-neutral-100 h-[400px] hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent z-10"></div>

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              {/* Category badge */}
              <div className={`absolute top-4 right-4 badge badge-${category.color} z-20`}>
                {category.count} Items
              </div>

              {/* Category content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-xl sm:text-2xl text-white font-medium mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <motion.button
                  className={`flex items-center text-sm font-medium text-white`}
                  whileHover={{ x: 5 }}
                >
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>

              {/* Interactive overlay on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-300 z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional features highlight */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-center text-center p-6 rounded-xl bg-primary-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Same Day Delivery</h3>
            <p className="text-neutral-600">Order before 12 PM for same-day delivery within the city</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-secondary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Custom Designs</h3>
            <p className="text-neutral-600">Create your dream cake with our personalized design service</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center p-6 rounded-xl bg-accent-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-accent-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Online Ordering</h3>
            <p className="text-neutral-600">Easy ordering through our website or mobile app with secure payment</p>
          </motion.div>
        </div>
      </div>

      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V120H0V0c62.97 8.18 129.09 29.9 191.39 45.93 67.92 17.45 136.18 28.69 171.39 33.24q-23.4-16.52-41.39-22.73z"
            fill="#FFF"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CakeCategories;