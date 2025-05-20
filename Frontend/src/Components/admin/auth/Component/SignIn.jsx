import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, CheckCircle } from 'lucide-react';
import SignInImg from "../images/sign_in_png.png";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && password.length >= 6;
    };

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
        setIsFormValid(validateForm(e.target.name === 'email' ? value : email, e.target.name === 'password' ? value : password));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(email, password)) {
            // Handle login logic here
            console.log('Login attempt:', { email, password, rememberMe });
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container  mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div className="backdrop-blur-2xl border rounded shadow border-light overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
                    {/* Left Side - Login Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="mb-10">
                            <h1 className="font-heading text-4xl font-bold text-primary-dark mb-2 text-center">Sign In</h1>
                            <h2 className="text-center text-2xl font-bold mb-2">Welcome Back!</h2>
                            <p className="text-center text-gray-500 text-sm">Please sign in to continue</p>
                        </div>

                        <div className="w-full max-w-md mx-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-gray-700 font-medium">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="example@mail.com"
                                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                            value={email}
                                            onChange={(e) => handleInputChange(e, setEmail)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-12">
                                    <div className="flex justify-between">
                                        <label htmlFor="password" className="block text-gray-700 font-medium">
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                            value={password}
                                            onChange={(e) => handleInputChange(e, setPassword)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded-lg font-button font-medium transition-all ${isFormValid
                                        ? 'bg-accent text-white hover:bg-accent/90 animate-pop'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!isFormValid}
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="hidden md:block md:w-1/2 bg-white">
                        <img
                            src={SignInImg}
                            alt="Login dashboard illustration"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SignIn);