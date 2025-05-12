import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingBag, Heart, Star, ChevronDown, X, Menu } from 'lucide-react';

// Define your theme colors here
const theme = {
  fontHeading: 'Poppins, sans-serif',
  fontBody: 'Inter, sans-serif',
  fontButton: 'Montserrat, sans-serif',
  colorPrimaryDark: '#222222',
  colorLight: '#eeeeee',
  colorAccent: '#ff6f61',
};

// Sample product data
const productsData = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    category: "Clothing",
    price: 89.99,
    rating: 4.5,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["jacket", "denim", "vintage"],
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 249.99,
    rating: 4.8,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["watch", "smart", "electronics"],
  },
  {
    id: 3,
    name: "Leather Backpack",
    category: "Accessories",
    price: 79.99,
    rating: 4.2,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["bag", "leather", "accessories"],
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    rating: 4.7,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["audio", "wireless", "electronics"],
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Footwear",
    price: 119.99,
    rating: 4.6,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["shoes", "sports", "footwear"],
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    rating: 4.3,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["tshirt", "cotton", "casual"],
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    rating: 4.3,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["tshirt", "cotton", "casual"],
  },
  {
    id: 8,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    rating: 4.3,
    image: "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-choco-chip-loaded-birthday-cake-300-gm--276154-m.jpg",
    tags: ["tshirt", "cotton", "casual"],
  },
];

// Available categories for filter
const categories = ["All", "Clothing", "Electronics", "Accessories", "Footwear", "Home & Kitchen", "Beauty", "Sports", "Books", "Toys"];

// Price ranges for filter
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

// Ratings for filter
const ratings = [
  { label: "All", value: 0 },
  { label: "4★ & above", value: 4 },
  { label: "3★ & above", value: 3 },
  { label: "2★ & above", value: 2 },
];

// Sort options
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
];

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" style={{ fontFamily: theme.fontBody }}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
          <Heart size={18} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: theme.fontHeading }}>{product.name}</h3>
            <p className="text-sm mb-2 text-gray-500">{product.category}</p>
          </div>
          <div className="flex items-center">
            <Star size={16} className="fill-current text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-lg" style={{ color: theme.colorPrimaryDark }}>${product.price.toFixed(2)}</span>
          <button
            className="cursor-pointer flex items-center text-sm px-3 py-2 font-medium rounded-md bg-accent text-white font-button"
          >
            <ShoppingBag size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({ label, options, selectedOption, setSelectedOption, isOpen, setIsOpen }) => {
  return (
    <div className="relative mb-4">
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
        style={{ fontFamily: theme.fontButton }}
      >
        <span>{`${label}: ${selectedOption}`}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                  style={{ fontFamily: theme.fontButton }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Component
export default function ShopListPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Dropdown state
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Mobile filters state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Set initial products
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...productsData];
    let newActiveFilters = [];

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
      newActiveFilters.push(`Category: ${selectedCategory}`);
    }

    // Filter by price range
    const priceRange = priceRanges.find((range) => range.label === selectedPriceRange);
    if (priceRange && selectedPriceRange !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= priceRange.min && product.price <= priceRange.max
      );
      newActiveFilters.push(`Price: ${selectedPriceRange}`);
    }

    // Filter by rating
    const rating = ratings.find((r) => r.label === selectedRating);
    if (rating && selectedRating !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= rating.value
      );
      newActiveFilters.push(`Rating: ${selectedRating}`);
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming the product array is already sorted by newest
        break;
    }

    setProducts(filteredProducts);
    setActiveFilters(newActiveFilters);
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  // Find currently selected option labels
  const currentSortOption = sortOptions.find(option => option.value === sortBy)?.label || sortOptions[0].label;

  // Remove a specific filter
  const removeFilter = (filter) => {
    if (filter.startsWith("Category:")) {
      setSelectedCategory("All");
    } else if (filter.startsWith("Price:")) {
      setSelectedPriceRange("All");
    } else if (filter.startsWith("Rating:")) {
      setSelectedRating("All");
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen font-body">

      <div className="container mx-auto px-4 py-8">
        {/* Search and Top Filters */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
              style={{
                fontFamily: theme.fontBody,
                borderColor: theme.colorPrimaryDark,
                focusRing: theme.colorAccent
              }}
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              className="md:hidden px-4 py-2 font-button border rounded-md flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter size={18} />
              Filters
            </button>

            {/* Sort by dropdown - always visible */}
            <div className="relative">
              <button
                className="flex items-center gap-2 font-button px-4 py-2 border rounded-md bg-white shadow-sm"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <span>Sort: {currentSortOption}</span>
                <ChevronDown size={18} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortOpen && (
                <div className="absolute right-0 z-10 mt-1 w-52 bg-white border rounded-md shadow-lg">
                  <ul className="py-1">
                    {sortOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                          onClick={() => {
                            setSortBy(option.value);
                            setSortOpen(false);
                          }}
                          style={{ fontFamily: theme.fontButton }}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center bg-white px-3 py-1 rounded-full text-sm border"
                style={{ borderColor: theme.colorAccent }}
              >
                <span>{filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 focus:outline-none"
                >
                  <X size={14} style={{ color: theme.colorAccent }} />
                </button>
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm ml-2 underline"
              style={{ color: theme.colorAccent }}
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4 font-heading">Filters</h2>

              <FilterDropdown
                label="Category"
                options={categories}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
                isOpen={categoryOpen}
                setIsOpen={setCategoryOpen}
              />

              <FilterDropdown
                label="Price"
                options={priceRanges.map(range => range.label)}
                selectedOption={selectedPriceRange}
                setSelectedOption={setSelectedPriceRange}
                isOpen={priceOpen}
                setIsOpen={setPriceOpen}
              />

              <FilterDropdown
                label="Rating"
                options={ratings.map(rating => rating.label)}
                selectedOption={selectedRating}
                setSelectedOption={setSelectedRating}
                isOpen={ratingOpen}
                setIsOpen={setRatingOpen}
              />

              <button
                className="w-full mt-4 py-2 bg-accent text-white font-button rounded-md text-center"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters - Slide in */}
          {mobileFiltersOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-25 flex">
              <div className="bg-white w-80 max-w-full h-full overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-heading font-semibold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="p-4">
                  <FilterDropdown
                    label="Category"
                    options={categories}
                    selectedOption={selectedCategory}
                    setSelectedOption={setSelectedCategory}
                    isOpen={categoryOpen}
                    setIsOpen={setCategoryOpen}
                  />

                  <FilterDropdown
                    label="Price"
                    options={priceRanges.map(range => range.label)}
                    selectedOption={selectedPriceRange}
                    setSelectedOption={setSelectedPriceRange}
                    isOpen={priceOpen}
                    setIsOpen={setPriceOpen}
                  />

                  <FilterDropdown
                    label="Rating"
                    options={ratings.map(rating => rating.label)}
                    selectedOption={selectedRating}
                    setSelectedOption={setSelectedRating}
                    isOpen={ratingOpen}
                    setIsOpen={setRatingOpen}
                  />

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      className="w-full py-2 rounded-md text-center bg-accent text-white font-button"
                      onClick={() => {
                        clearAllFilters();
                        setMobileFiltersOpen(false);
                      }}
                    >
                      Clear All Filters
                    </button>

                    <button
                      className="w-full py-2 rounded-md text-center border border-primary-dark text-primary-dark font-button"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="flex-grow"
                onClick={() => setMobileFiltersOpen(false)}
              ></div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-grow">
            {products.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                <h3 className="text-xl font-semibold mb-2 font-heading">No products found</h3>
                <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-md bg-accent text-white font-button"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">{products.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}