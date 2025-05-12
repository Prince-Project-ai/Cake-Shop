    import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// The main Modal component
const Model = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md", // sm, md, lg, xl,full
    closeOnOverlayClick = true,
}) => {

    const modalRef = useRef(null);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isOpen, onClose]);

    // Focus trap inside modal
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    // Determine modal width based on size prop
    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4"
    };

    return (
        <div
            className={`fixed inset-0 z-70 flex items-center justify-center p-4 bg-primary-dark/50 outline-none`}
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
            aria-labelledby={title}
        >
            <div
                ref={modalRef}
                className={`bg-white outline-none rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-200 ${isOpen ? "scale-100" : "scale-95"
                    } flex flex-col max-h-[90vh]`} // Add max-h-[90vh] and flex+flex-col to control overall modal height
                tabIndex={-1}
            >
                {/* Modal Header - Always visible */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 shrink-0">
                    <h3 id="modal-title" className="text-lg font-medium text-primary-dark">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none hover:bg-gray-100 p-1 rounded"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-3 overflow-y-auto grow">
                    {children}
                </div>

                {/* Modal Footer - Always visible */}
                {footer && (
                    <div className="p-3 border-t border-gray-200 flex justify-end space-x-2 flex-wrap shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Model);