import React from 'react'

const ResetPass = () => {
    return (
        <div className="phase_3 relative">

            {/* <div className="absolute rounded inset-0 backdrop-blur-sm z-10"></div> */}
            {/* New Password Input */}
            <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">New Password</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Confirm Password Input */}
            <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Reset Password */}
            <button className="cursor-pointer bg-accent px-6 block ms-auto text-white py-2 mt-2 rounded hover:bg-accent/90 transition">
                Reset Password
            </button>
        </div>
    )
}

export default React.memo(ResetPass);