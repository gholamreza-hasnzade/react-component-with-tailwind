import { FaFilter, FaRegEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { useTextDirection } from '@/hooks/useTextDirection';

interface FilterToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const FilterToggle = ({ isVisible, onToggle }: FilterToggleProps) => {
  const { isRTL } = useTextDirection();

  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}
      title={isVisible ? "Hide Filters" : "Show Filters"}
    >
      {isVisible ? <FaRegEyeSlash size={16} /> : <FaFilter size={16} />}
      <span className={clsx(
        isRTL ? "text-right" : "text-left"
      )}>
        {isVisible ? "Hide Filters" : "Show Filters"}
      </span>
    </button>
  );
}; 