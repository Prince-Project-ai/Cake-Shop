import React, { useRef } from 'react';
import { usePinVarify } from '../../../Hooks/usePinVarify';

const PinVerify = () => {
  const {
    handleBack,
    handleChange,
    handleKeyDown,
    handlePinVerify,
    inputRefs,
    isLoading,
    isDisable,
  } = usePinVarify();


  return (
    <div className="phase_2 relative">

      <form onSubmit={handlePinVerify}>
        <div className="mt-4">

          {
            isLoading && (<div className="absolute rounded inset-0 backdrop-blur-sm flex items-center justify-center z-10">
              <p>Processing...</p>
            </div>)
          }

          <label className="block text-sm font-medium text-primary-dark mb-1">Enter Verification Code</label>
          <div className="flex justify-start gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                ref={el => inputRefs.current[i] = el}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="size-12 font-semibold text-lg border border-gray-300 text-center rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ))}
          </div>
        </div>

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
  );
};

export default React.memo(PinVerify);
