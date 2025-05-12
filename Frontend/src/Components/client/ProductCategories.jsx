import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Updated theme with specified fonts and colors
const theme = {
    fontHeading: "Poppins, sans-serif",
    fontBody: "Inter, sans-serif",
    fontButton: "Montserrat, sans-serif",
    colorPrimaryDark: "#222222",
    colorLight: "#eeeeee",
    colorAccent: "#ff6f61"
};

// Clean cake category data
const cakeCategories = [
    {
        id: 'wedding',
        name: 'Wedding Cakes',
        description: 'Elegant multi-tiered cakes for your special day',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $299'
    },
    {
        id: 'birthday',
        name: 'Birthday Cakes',
        description: 'Festive designs with personalized touches',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $59'
    },
    {
        id: 'custom',
        name: 'Custom Cakes',
        description: 'Personalized creations that bring your vision to life',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $89'
    },
    {
        id: 'cupcakes',
        name: 'Cupcakes',
        description: 'Delightful individual treats for any occasion',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $3.50'
    },
    {
        id: 'seasonal',
        name: 'Seasonal Specials',
        description: 'Limited edition flavors inspired by the seasons',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $65'
    },
    {
        id: 'classic',
        name: 'Classic Cakes',
        description: 'Timeless favorites with traditional recipes',
        imageUrl: 'https://i.redd.it/ojgxv40zu9f51.jpg',
        price: 'From $45'
    }
];

// Category card component with updated theme
const CategoryCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="rounded-lg overflow-hidden bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}
        >
            <div className="relative overflow-hidden h-52">
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
                <div
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                        backgroundColor: 'white',
                        color: theme.colorPrimaryDark,
                        fontFamily: theme.fontButton
                    }}
                >
                    {category.price}
                </div>
            </div>

            <div className="p-5">
                <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                        fontFamily: theme.fontHeading,
                        color: theme.colorPrimaryDark
                    }}
                >
                    {category.name}
                </h3>

                <p
                    className="text-sm mb-4 h-12"
                    style={{
                        fontFamily: theme.fontBody,
                        color: 'rgba(34, 34, 34, 0.7)'
                    }}
                >
                    {category.description}
                </p>

                <button
                    className="flex items-center text-sm font-medium transition-colors duration-300"
                    style={{
                        fontFamily: theme.fontButton,
                        color: isHovered ? theme.colorAccent : theme.colorPrimaryDark
                    }}
                >
                    View Collection
                    <div
                        className="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            backgroundColor: isHovered ? theme.colorAccent : '#f0f0f0',
                            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                            color: isHovered ? 'white' : theme.colorPrimaryDark,
                        }}
                    >
                        <ChevronRight size={14} />
                    </div>
                </button>
            </div>
        </div>
    );
};

// Category filter component with updated theme
const CategoryFilter = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Popular', 'New', 'Seasonal', 'Classic'];

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors duration-200`}
                    style={{
                        backgroundColor: activeFilter === filter ? theme.colorAccent : theme.colorLight,
                        color: activeFilter === filter ? 'white' : theme.colorPrimaryDark,
                        fontFamily: theme.fontButton
                    }}
                    onClick={() => setActiveFilter(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

const CakeCategorySection = () => {
    return (
        <div
            className="max-w-7xl mx-auto px-4 py-12"
            style={{ backgroundColor: 'white' }}
        >
            {/* Professional header with updated theme */}
            <div className="mb-10 text-center">
                <h2
                    className="text-3xl font-bold mb-4"
                    style={{
                        fontFamily: theme.fontHeading,
                        color: theme.colorPrimaryDark
                    }}
                >
                    Our Cake Collections
                </h2>
                <p
                    className="max-w-2xl mx-auto"
                    style={{
                        fontFamily: theme.fontBody,
                        color: 'rgba(34, 34, 34, 0.7)'
                    }}
                >
                    Browse our selection of handcrafted cakes made with the finest ingredients for every occasion.
                </p>
            </div>

            {/* Category filters */}
            <CategoryFilter />

            {/* Clean grid layout for categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cakeCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}

export default React.memo(CakeCategorySection);