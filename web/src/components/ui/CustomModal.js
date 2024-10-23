import React from 'react';
import { RiCloseFill } from 'react-icons/ri';

/**
 * @param {boolean} visible - Determines if the modal is visible or not.
 * @param {function} onClose - Function to close the modal.
 * @param {React.ReactNode} title - The title of the modal.
 * @param {React.ReactNode} children - The content of the modal.
 * @param {React.ReactNode} footer - Optional footer actions (e.g., buttons).
 * @param {boolean} closable - Whether the modal can be closed with the close icon.
 * 
 * @returns {JSX.Element} A styled modal component.
 */
const CustomModal = ({ visible, onClose, title, children, footer, closable = true }) => {
  if (!visible) return null; // Don't render the modal if its not visible

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          
          {/* Close Button */}
          {closable && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RiCloseFill />
            </button>
          )}

          {/* Modal Title */}
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

          {/* Modal Content */}
          <div className="mb-6">
            {children}
          </div>

          {/* Modal Footer */}
          {footer && (
            <div className="flex justify-end space-x-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
