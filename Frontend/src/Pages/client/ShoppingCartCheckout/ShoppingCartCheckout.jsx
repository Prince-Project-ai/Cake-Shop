import { useState } from 'react';
import { Trash2, ShoppingCart, CreditCard, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// This would be replaced with your actual data
const initialCartItems = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXklMjBjYWtlfGVufDB8fDB8fHww",
        quantity: 1
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXklMjBjYWtlfGVufDB8fDB8fHww",
        quantity: 2
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXklMjBjYWtlfGVufDB8fDB8fHww",
        quantity: 1
    }
];

export default function ShoppingCartCheckout() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmation

    // Calculate cart totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Update item quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Remove item from cart
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Navigation functions
    const goToNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const goToPrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    // Format price to 2 decimal places
    const formatPrice = (price) => {
        return price.toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>


            {/* Progress Bar */}
            <div className="container mx-auto px-4 md:px-6 py-8" >
                <div className="relative">
                    <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                        <div
                            className="transition-all duration-500 ease-out rounded"
                            style={{
                                width: `${(step / 4) * 100}%`,
                                backgroundColor: 'var(--color-accent)'
                            }}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className={`text-center ${step >= 1 ? 'font-medium' : ''}`} style={{ color: step >= 1 ? 'var(--color-accent)' : '' }}>
                            Cart
                        </div>
                        <div className={`text-center ${step >= 2 ? 'font-medium' : ''}`} style={{ color: step >= 2 ? 'var(--color-accent)' : '' }}>
                            Shipping
                        </div>
                        <div className={`text-center ${step >= 3 ? 'font-medium' : ''}`} style={{ color: step >= 3 ? 'var(--color-accent)' : '' }}>
                            Payment
                        </div>
                        <div className={`text-center ${step >= 4 ? 'font-medium' : ''}`} style={{ color: step >= 4 ? 'var(--color-accent)' : '' }}>
                            Confirmation
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mb-12">
                {/* Shopping Cart Page */}
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Shopping Cart</h2>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-16">
                                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-4">Add items to your cart to continue shopping</p>
                                <button
                                    className="px-6 py-2 rounded font-medium transition-colors text-white"
                                    style={{
                                        backgroundColor: 'var(--color-accent)',
                                        fontFamily: 'var(--font-button)'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-2/3">
                                    {/* Cart Items */}
                                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-4">Product</th>
                                                    <th className="text-center py-4">Quantity</th>
                                                    <th className="text-right py-4">Price</th>
                                                    <th className="text-right py-4">Total</th>
                                                    <th className="text-right py-4"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map(item => (
                                                    <tr key={item.id} className="border-b">
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                                                <span className="font-medium">{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">
                                                            <div className="flex items-center justify-center">
                                                                <button
                                                                    className="w-8 h-8 flex items-center justify-center border rounded-l"
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    className="w-10 h-8 text-center border-t border-b"
                                                                    value={item.quantity}
                                                                    readOnly
                                                                />
                                                                <button
                                                                    className="w-8 h-8 flex items-center justify-center border rounded-r"
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-right">${formatPrice(item.price)}</td>
                                                        <td className="py-4 text-right">${formatPrice(item.price * item.quantity)}</td>
                                                        <td className="py-4 text-right">
                                                            <button
                                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                                                onClick={() => removeItem(item.id)}
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="lg:w-1/3">
                                    {/* Order Summary */}
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order Summary</h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span>${formatPrice(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shipping</span>
                                                <span>${formatPrice(shipping)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tax</span>
                                                <span>${formatPrice(tax)}</span>
                                            </div>
                                            <div className="border-t pt-3 mt-3">
                                                <div className="flex justify-between font-semibold">
                                                    <span>Total</span>
                                                    <span>${formatPrice(total)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="w-full py-3 rounded font-medium text-white flex items-center justify-center"
                                            style={{
                                                backgroundColor: 'var(--color-accent)',
                                                fontFamily: 'var(--font-button)'
                                            }}
                                            onClick={goToNext}
                                        >
                                            Proceed to Checkout
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Shipping Information Page */}
                {step === 2 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Shipping Information</h2>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                                <input
                                                    type="text"
                                                    id="state"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                                                <input
                                                    type="text"
                                                    id="zipCode"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <select
                                                id="country"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                required
                                            >
                                                <option value="">Select a country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="AU">Australia</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                {/* Order Summary */}
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order Summary</h3>
                                    <div className="space-y-3 mb-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between">
                                                <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                                                <span>${formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span>${formatPrice(shipping)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span>${formatPrice(tax)}</span>
                                        </div>
                                        <div className="border-t pt-3 mt-3">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>${formatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        className="flex-1 py-3 rounded font-medium border border-gray-300 flex items-center justify-center"
                                        style={{ fontFamily: 'var(--font-button)' }}
                                        onClick={goToPrevious}
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </button>
                                    <button
                                        className="flex-1 py-3 rounded font-medium text-white flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'var(--color-accent)',
                                            fontFamily: 'var(--font-button)'
                                        }}
                                        onClick={goToNext}
                                    >
                                        Continue
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Page */}
                {step === 3 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Payment Information</h2>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Payment Method</h3>
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <label className="relative flex items-center p-4 border rounded cursor-pointer">
                                                <input type="radio" name="paymentMethod" className="mr-2" defaultChecked />
                                                <span>Credit Card</span>
                                            </label>
                                            <label className="relative flex items-center p-4 border rounded cursor-pointer">
                                                <input type="radio" name="paymentMethod" className="mr-2" />
                                                <span>PayPal</span>
                                            </label>
                                            <label className="relative flex items-center p-4 border rounded cursor-pointer">
                                                <input type="radio" name="paymentMethod" className="mr-2" />
                                                <span>Apple Pay</span>
                                            </label>
                                        </div>
                                    </div>

                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                placeholder="**** **** **** ****"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    placeholder="MM/YY"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-opacity-50"
                                                    style={{ borderColor: 'var(--color-primary-dark)', focusRing: 'var(--color-accent)' }}
                                                    placeholder="***"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Billing Address</h3>
                                            <div className="mb-4">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-2" defaultChecked />
                                                    <span>Same as shipping address</span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                {/* Order Summary */}
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order Summary</h3>
                                    <div className="space-y-3 mb-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between">
                                                <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                                                <span>${formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span>${formatPrice(shipping)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span>${formatPrice(tax)}</span>
                                        </div>
                                        <div className="border-t pt-3 mt-3">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>${formatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        className="flex-1 py-3 rounded font-medium border border-gray-300 flex items-center justify-center"
                                        style={{ fontFamily: 'var(--font-button)' }}
                                        onClick={goToPrevious}
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </button>
                                    <button
                                        className="flex-1 py-3 rounded font-medium text-white flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'var(--color-accent)',
                                            fontFamily: 'var(--font-button)'
                                        }}
                                        onClick={goToNext}
                                    >
                                        Place Order
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirmation Page */}
                {step === 4 && (
                    <div>
                        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order Confirmed!</h2>
                            <p className="text-lg mb-6">Thank you for your purchase. Your order has been confirmed.</p>

                            <div className="border p-4 rounded-lg mb-6">
                                <h3 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Order #12345678</h3>
                                <p className="text-sm text-gray-600 mb-4">A confirmation email has been sent to your email address.</p>

                                <div className="border-t pt-4 mt-2">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Items total:</span>
                                        <span>${formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Shipping:</span>
                                        <span>${formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Tax:</span>
                                        <span>${formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>${formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    className="px-6 py-2 rounded font-medium border border-gray-300"
                                    style={{ fontFamily: 'var(--font-button)' }}
                                >
                                    Track Order
                                </button>
                                <button
                                    className="px-6 py-2 rounded font-medium text-white"
                                    style={{
                                        backgroundColor: 'var(--color-accent)',
                                        fontFamily: 'var(--font-button)'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};
