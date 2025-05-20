import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeModal } from '../../Redux/features/client/GlobalModel/modelSlice';
import { componentMap } from '../../Utils/componentMap';

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
};


const Model = () => {
    const dispatch = useDispatch();
    const {
        isOpen,
        modalKey,
        modalProps,
        title,
        footer,
        size,
        closeOnOverlayClick,
    } = useSelector((state) => state.model);

    if (!isOpen || !modalKey) return null;

    const ComponentToRender = componentMap[modalKey];

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            dispatch(closeModal());
        }
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
                className={`bg-white outline-none rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-200 ${isOpen ? "scale-100" : "scale-95"} flex flex-col max-h-[90vh]`}
                tabIndex={-1}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 shrink-0">
                    <h3 id="modal-title" className="text-lg font-medium text-primary-dark">{title}</h3>
                    <button
                        onClick={() => dispatch(closeModal())}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none hover:bg-gray-100 p-1 rounded"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-3 overflow-y-auto grow">
                    {ComponentToRender ? <ComponentToRender {...modalProps} /> : null}
                </div>

                {/* Modal Footer */}
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
