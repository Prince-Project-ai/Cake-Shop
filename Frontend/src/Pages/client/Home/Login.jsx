import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLoginForm } from "../../../Hooks/useLoginForm";
import SideCake from "../../../assets/Images/login_page_image/side_cake.jpg";
import Model from "../../../Components/comman/Model";
import EmailVerify from "../../../Components/client/ForgotPassword/EmailVerify";
import PinVerify from "../../../Components/client/ForgotPassword/PinVerify";
import ResetPass from "../../../Components/client/ForgotPassword/ResetPass";
import { useSelector } from "react-redux";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useLoginForm();

  const phaseComponents = {
    1: <EmailVerify />,
    2: <PinVerify />,
    3: <ResetPass />,
  };

  const { phase } = useSelector(state => state.forgotPassword);


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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
          <p className="font-body text-lg opacity-80 max-w-md">Sign in to continue your journey and explore our exclusive offerings.</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Form Container */}
          <div className="bg-white p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-heading text-3xl font-bold text-primary-dark">Sign In</h2>
              <p className="font-body text-primary-dark/80 mt-2">Enter your credentials to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-primary-dark font-body">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-accent focus:border-accent outline-none transition duration-200 font-body"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-primary-dark font-body  ">
                    Password
                  </label>

                  <button type="button" className="cursor-pointer font-medium text-accent text-sm" onClick={() => setIsModalOpen(true)}>Forgot Password</button>

                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 pe-12 py-3 bg-white border border-gray-200 rounded-lg focus:ring-accent focus:border-accent outline-none transition duration-200 font-body"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer inset-y-0 right-4 flex items-center text-primary-dark/80 hover:text-accent transition duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-accent cursor-pointer text-white font-medium rounded-lg transition duration-200 font-button text-center shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <span>Sign In</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-4 text-primary-dark/80 font-body">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <button
                onClick={() => window.location.href = "http://localhost:6633/api/client/auth/google"}
                type="button"
                className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-light transition duration-200 font-button text-sm font-medium text-primary-dark"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-primary-dark/80 font-body">
                Don't have an account?{" "}
                <NavLink to="/sign-up" className="text-accent hover:text-[#e55a4d] font-medium transition duration-200">
                  Create account
                </NavLink>
              </p>
            </div>

            {/* Promo Badge */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent">
                <span className="text-lg">🎁</span>
                <span className="text-xs font-medium font-button">New users get special offers!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Forgot Password"
        size="md"
        closeOnOverlayClick={false}
      >
        <div className="space-y-4">
          {phaseComponents[phase] || null}
        </div>
      </Model>

    </div>
  );
};

export default React.memo(Login);