import { FaFilter, FaRegEyeSlash } from 'react-icons/fa';

interface FilterToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const FilterToggle = ({ isVisible, onToggle }: FilterToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      {isVisible ? <FaRegEyeSlash size={16} /> : <FaFilter size={16} />}
      {isVisible ? "Hide Filters" : "Show Filters"}
    </button>
  );
}; 