import React, { useState } from 'react';

/**
 * @param {React.ReactNode} trigger - The element that triggers the dropdown (e.g., a button).
 * @param {Array} options - The options in the dropdown, with an optional icon.
 * @param {function} onSelect - Function to call when an option is selected.
 * 
 * @returns {JSX.Element} A styled dropdown component.
 */
const CustomDropdown = ({ trigger, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
