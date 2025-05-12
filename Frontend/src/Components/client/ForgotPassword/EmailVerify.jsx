import React from "react";
import { useEmailVerification } from '../../../Hooks/useEmailVerification';


const EmailVerify = () => {
    const { handleVerifyMail, isLoading, email, handleEmail, isDisable } = useEmailVerification();
    return (
        <div className="phase_1 relative">
            {
                isLoading && (<div className="absolute rounded inset-0 backdrop-blur-sm flex items-center justify-center z-10">
                    <p>Processing...</p>
                </div>)
            }

            {/* Email Input */}
            <form onSubmit={handleVerifyMail}>
                <label htmlFor='email' className="block text-sm font-medium text-primary-dark mb-1">Email</label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                />

                {/* Send Code Button */}
                <button
                    type="submit"
                    disabled={isDisable || isLoading}
                    className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-accent px-6 block ms-auto text-white py-2 mt-2 rounded hover:bg-accent/90 transition"
                >
                    {isLoading ? "Sending..." : "Send code"}
                </button>

            </form>
        </div>
    )
}

export default React.memo(EmailVerify);