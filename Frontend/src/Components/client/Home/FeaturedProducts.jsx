import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For advanced animations
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = () => {
    // Sample cake data (replace with API data in production)
    const cakes = [
        {
            id: 1,
            name: 'Midnight Velvet',
            description: 'Decadent dark chocolate with edible gold flakes.',
            price: 60,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
            badge: 'Best Seller',
        },
        {
            id: 2,
            name: 'Rose Petal Dream',
            description: 'Delicate rosewater sponge with pistachio cream.',
            price: 55,
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
            badge: 'New Arrival',
        },
        {
            id: 3,
            name: 'Citrus Symphony',
            description: 'Zesty orange and lemon layers with meringue.',
            price: 50,
            image: 'https://images.unsplash.com/photo-1559622214-2f7c8a7f693d',
        },
        {
            id: 4,
            name: 'Caramel Elegance',
            description: 'Salted caramel with hazelnut praline crunch.',
            price: 58,
            image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f',
            badge: 'Limited Edition',
        },
    ];

    // State for carousel and interactivity
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const carouselRef = useRef(null);

    // Auto-scroll carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cakes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [cakes.length]);

    // Handle manual carousel navigation
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + cakes.length) % cakes.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cakes.length);
    };

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: 'easeOut',
            },
        }),
        exit: { opacity: 0, y: -50, rotateX: -10, transition: { duration: 0.3 } },
    };

    const imageVariants = {
        initial: { scale: 1, rotateY: 0 },
        hover: { scale: 1.1, rotateY: 5, transition: { duration: 0.4 } },
    };

    return (
        <section className="relative py-20 bg-gradient-to-b from-primary-50 to-secondary-50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 opacity-20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-heading font-bold text-primary-700 tracking-tight">
                        Our Signature Cakes
                    </h2>
                    <p className="text-neutral-600 font-body text-lg mt-3 max-w-xl mx-auto">
                        Crafted with passion, each cake is a masterpiece of flavor and artistry.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    <div className="overflow-hidden" ref={carouselRef}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="flex justify-center items-center"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                <div
                                    className="card relative w-full max-w-md mx-4 sm:mx-6"
                                    onMouseEnter={() => setIsHovered(currentIndex)}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    {/* Cake Image with 3D Effect */}
                                    <motion.div
                                        className="relative overflow-hidden rounded-t-2xl"
                                        variants={imageVariants}
                                        initial="initial"
                                        animate={isHovered === currentIndex ? 'hover' : 'initial'}
                                    >
                                        <img
                                            src={cakes[currentIndex].image}
                                            alt={cakes[currentIndex].name}
                                            className="w-full h-80 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent"></div>
                                    </motion.div>

                                    {/* Cake Info */}
                                    <div className="p-8 text-center">
                                        {cakes[currentIndex].badge && (
                                            <span className="badge badge-primary mb-4 animate-float">
                                                {cakes[currentIndex].badge}
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-heading font-medium text-neutral-800">
                                            {cakes[currentIndex].name}
                                        </h3>
                                        <p className="text-neutral-600 font-body text-sm mt-2 mb-4">
                                            {cakes[currentIndex].description}
                                        </p>
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-primary-600 font-body font-medium text-xl">
                                                ${cakes[currentIndex].price}
                                            </span>
                                            <motion.button
                                                className="btn btn-primary"
                                                whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-lg)' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Decorative Sparkle Effect */}
                                    {isHovered === currentIndex && (
                                        <motion.div
                                            className="absolute top-4 right-4"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg className="w-6 h-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Carousel Navigation */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 text-white rounded-full shadow-md hover:bg-primary-600 transition-all duration-normal"
                        aria-label="Previous cake"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 text-white rounded-full shadow-md hover:bg-primary-600 transition-all duration-normal"
                        aria-label="Next cake"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {cakes.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-normal ${index === currentIndex ? 'bg-primary-500 scale-125' : 'bg-neutral-300'
                                    }`}
                                aria-label={`Go to cake ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a
                        href="#"
                        className="btn btn-outline btn-lg relative group"
                    >
                        Explore All Cakes
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-500 transition-all duration-normal group-hover:w-full"></span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProducts;