import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SideCake from "../../../assets/Images/login_page_image/side_cake.jpg";
import { clientRegis } from "../../../Services/ClientApi/HandleUserApi";


const Registration = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Validate full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Name is required";
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }

        // Validate phone (optional but must be valid if entered)
        if (formData.phoneNumber && !/^\+?[0-9\s]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Validate terms
        if (!termsAccepted) {
            newErrors.terms = "You must accept the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (validate()) {
            console.log("Form submitted:", formData);
            const response = await clientRegis(formData);

            // Clear form after successful submission
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
            });
            setTermsAccepted(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
            {/* Left side - Image */}
            <div className="hidden md:block md:w-1/2 bg-primary-dark relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${SideCake})`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary-dark"></div>

                {/* Image overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10">
                    <h1 className="font-heading text-4xl font-bold mb-4">Welcome Back</h1>
                    <p className="font-body text-lg opacity-80 max-w-md">Join our community of cake enthusiasts and discover exclusive recipes and offers.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center ">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg p-6 sm:p-8 sm:py-2">
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-dark text-start mb-2">
                            Sign up
                        </h2>
                        <p className="text-start text-gray-600 mb-6">
                            Sign up for exclusive cake offers!
                        </p>

                        <div>
                            {/* Full Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-primary-dark mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition`}
                                    placeholder="Jane Doe"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-primary-dark mb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium text-[#222222] mb-1"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition`}
                                    placeholder="+1 (123) 456-7890"
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[#222222] mb-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            } focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#222222] transition"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Must be at least 8 characters
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6 relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-[#222222] mb-1"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                            } focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#222222] transition"
                                        aria-label={
                                            showConfirmPassword ? "Hide password" : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Sign Up Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#ff6f61] hover:bg-[#ff5a4c] text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-6">
                            <p className="text-center text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="text-[#ff6f61] hover:text-[#ff5a4c] hover-underline-animation font-medium"
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;