import React from 'react'
import { usePinVarify } from '../../../Hooks/usePinVarify';

const PinVerify = () => {
    const { handleBack } = usePinVarify();
    return (
        <div className="phase_2 relative">
            {/* <div className="absolute rounded inset-0 backdrop-blur-sm z-10"></div> */}
            {/* Verification Code Inputs */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-primary-dark mb-1">Enter Verification Code</label>
                <div className="flex justify-start gap-2">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}

                            type="text"
                            maxLength="1"
                            className="size-12 border border-gray-300 text-center rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    ))}
                </div>
            </div>

            {/* Very Code Button */}
            <div className='flex items-center justify-end space-x-2 flex-wrap'>

                <button
                    type='button'
                    onClick={handleBack}
                    className="cursor-pointer mt-2 bg-light px-6 text-sm text-primary-dark py-2 rounded">
                    Back
                </button>
                <button
                    type='submit'
                    className="cursor-pointer mt-2 bg-accent px-6 text-white py-2 rounded hover:bg-accent/90 text-sm transition">
                    Very Code
                </button>

            </div>

        </div>
    )
}

export default React.memo(PinVerify);