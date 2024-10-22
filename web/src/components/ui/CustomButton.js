/**
 *
 * @param {Object} props - The props for the button component.
 * @param {string} [props.type="default"] - The type of the button (e.g., primary, default, danger).
 * @param {string} [props.size="medium"] - The size of the button (e.g., small, medium, large).
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.isLoading=false] - Whether the button shows a loading spinner.
 * @param {function} props.onClick - Function to handle the button click event.
 * @param {string} [props.className] - Additional class names for customization.
 * @param {React.ReactNode} props.children - The content inside the button.
 *
 * @returns {JSX.Element} A styled button component.
 */
const CustomButton = ({
  type = "default",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
  isLoading = false,
  children,
  ...rest
}) => {
  // Define base styles
  const baseStyles = `
    inline-flex justify-center items-center font-medium rounded-md 
    focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-300
  `;

  // Define type-specific styles
  const typeStyles = {
    primary: "bg-red-500 text-white hover:bg-red-700 focus:ring-red-500",
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  // Define size-specific styles
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  // Define disabled styles
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const Spinner = () => (
    <svg
      className="animate-spin h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${typeStyles[type]} 
        ${sizeStyles[size]} 
        ${disabledStyles} 
        ${className}
      `}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
