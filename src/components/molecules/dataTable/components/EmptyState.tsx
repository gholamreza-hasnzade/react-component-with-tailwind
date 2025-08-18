import React from 'react';
import clsx from 'clsx';
import { FaInbox } from 'react-icons/fa';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const defaultIcon = (
  <FaInbox className="w-8 h-8 text-gray-400" />
);

export function EmptyState({
  title = "No items found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon = defaultIcon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={clsx("flex flex-col items-center gap-4", className)}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
} 