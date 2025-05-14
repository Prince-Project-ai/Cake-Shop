import React from 'react'
import { useResetPassword } from '../../../Hooks/useResetPassword';

const ResetPass = () => {
    const {
        isLoading,
        isDisable,
        handleBack,
        handleResetPassword,
        handleChange,
        formData,
    } = useResetPassword();
    return (
        <div className="phase_3">
            <form onSubmit={handleResetPassword}>
                <div className='mb-4'>
                    <label htmlFor='newPass' className="block text-sm font-medium text-primary-dark mb-1">New Password</label>
                    <input
                        type="password"
                        id="newPass"
                        value={formData.newPass}
                        name="newPass"
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </div>

                {/* Confirm Password Input */}
                <div>
                    <label htmlFor='newCrmPass' className="block text-sm font-medium text-primary-dark mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="newCrmPass"
                        value={formData.newCrmPass}
                        name="newCrmPass"
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </div>

                {/* Reset Password */}
                <div className='flex items-center justify-end space-x-2 flex-wrap'>
                    <button
                        type='button'
                        onClick={handleBack}
                        className="cursor-pointer mt-2 bg-light px-6 text-sm text-primary-dark py-2 rounded">
                        Back
                    </button>
                    <button
                        type='submit'
                        disabled={isLoading || isDisable}
                        className="cursor-pointer mt-2 disabled:opacity-40 disabled:cursor-not-allowed bg-accent px-6 text-white py-2 rounded hover:bg-accent/90 text-sm transition">
                        Verify Code
                    </button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(ResetPass);