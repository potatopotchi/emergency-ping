/**
 * 
 * @param {Object} props - The props for the input component.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.value - The value of the input.
 * @param {function} props.onChange - Function to handle the input change.
 * @param {string} [props.type="text"] - The type of the input (e.g., text, password).
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {string} [props.className] - Additional class names for customization.
 * 
 * @returns {JSX.Element} A styled input component.
 */
const CustomInput = ({
  placeholder = 'Enter text',
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        px-4 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
        disabled:bg-gray-100 disabled:cursor-not-allowed 
        transition-colors duration-300 ease-in-out 
        ${className} 
      `}
      {...rest}
    />
  );
};

export default CustomInput;