import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Quote, Star } from 'lucide-react';
import Customer1 from '../../../assets/Images/HeroSection/slide1.jpg';
import Customer2 from '../../../assets/Images/HeroSection/slide3.jpg';
import Customer3 from '../../../assets/Images/HeroSection/slide2.jpg';

// Sample testimonial data (replace with API data in production)
const testimonials = [
    {
        id: 1,
        name: 'Emma Thompson',
        quote:
            'The Velvet Bliss cake was a hit at my daughter’s birthday! So moist and beautifully decorated. I’ll be back for every celebration!',
        rating: 5,
        image: Customer1,
        alt: 'Emma Thompson smiling with cake',
        accentColor: 'text-primary-500',
        bgColor: 'bg-primary-50',
    },
    {
        id: 2,
        name: 'James Patel',
        quote:
            'Ordered a custom anniversary cake, and it exceeded all expectations. The flavors were divine, and the team was so helpful!',
        rating: 4,
        image: Customer2,
        alt: 'James Patel holding a cake box',
        accentColor: 'text-accent-500',
        bgColor: 'bg-accent-50',
    },
    {
        id: 3,
        name: 'Sophie Nguyen',
        quote:
            'The Lemon Zest cake brought sunshine to our party! Perfect balance of sweet and tangy. Highly recommend this bakery!',
        rating: 5,
        image: Customer3,
        alt: 'Sophie Nguyen with a lemon cake',
        accentColor: 'text-secondary-500',
        bgColor: 'bg-secondary-50',
    },
];

const Testimonials = () => {
    return (
        <section className="relative bg-gradient-to-b from-primary-100 to-neutral-50 py-12 sm:py-16 lg:py-24">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-secondary-100/20 rounded-bl-full opacity-50" />
                <svg
                    className="absolute bottom-10 left-10 w-14 h-14 text-primary-200 opacity-30"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-neutral-800 mb-4 relative inline-block">
                        What Our Customers Say
                        <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-accent-400 rounded-full" />
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl font-body text-neutral-600 max-w-2xl mx-auto">
                        Hear from those who’ve celebrated with our handcrafted cakes.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="card relative bg-white transition-transform hover:scale-102 hover:shadow-lg duration-500"
                        >
                            {/* Quote Icon */}
                            <Quote
                                className={`absolute top-4 left-4 h-8 w-8 ${testimonial.accentColor} opacity-50`}
                                aria-hidden="true"
                            />

                            {/* Card Content */}
                            <div className="p-6 sm:p-8">
                                {/* Rating */}
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${testimonial.accentColor} fill-current`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                {/* Quote Text */}
                                <blockquote className="text-base sm:text-lg font-body text-neutral-700 mb-6 italic">
                                    “{testimonial.quote}”
                                </blockquote>

                                {/* Customer Info */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.alt}
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-neutral-200"
                                    />
                                    <div>
                                        <p className="text-lg font-heading text-neutral-800">{testimonial.name}</p>
                                        <p className="text-sm font-body text-neutral-600">Happy Customer</p>
                                    </div>
                                </div>

                                {/* Decorative Swirl */}
                                <div
                                    className={`absolute bottom-4 right-4 w-16 h-2 ${testimonial.bgColor} rounded-full opacity-70 blur-sm`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10 sm:mt-12 lg:mt-16">
                    <Link
                        to="/products"
                        className="btn btn-primary btn-lg transition-transform hover:scale-105 hover:shadow-lg"
                    >
                        Shop Now
                        <Heart className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;