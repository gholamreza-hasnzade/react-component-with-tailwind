import { cn } from '@/lib/utils';

interface DataTableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
  hasActions?: boolean;
  hasSelection?: boolean;
}

export function DataTableSkeleton({ 
  rows = 5, 
  columns = 6, 
  className,
  hasActions = false,
  hasSelection = false
}: DataTableSkeletonProps) {
  // Calculate actual data columns (excluding selection and actions)
  const dataColumns = columns - (hasSelection ? 1 : 0) - (hasActions ? 1 : 0);
  
  return (
    <tbody className={className}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-gray-100">
          {Array.from({ length: columns }).map((_, colIndex) => {
            let isSelectionColumn = false;
            let isActionsColumn = false;
            let dataColumnIndex = colIndex;
            
            // Determine column type
            if (hasSelection && colIndex === 0) {
              isSelectionColumn = true;
            } else if (hasActions && colIndex === columns - 1) {
              isActionsColumn = true;
            } else {
              // Adjust data column index based on selection column
              dataColumnIndex = hasSelection ? colIndex - 1 : colIndex;
            }
            
            return (
              <td key={colIndex} className="px-4 py-3">
                <div className="animate-pulse">
                  {isSelectionColumn ? (
                    // Selection column (checkbox)
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  ) : isActionsColumn ? (
                    // Actions column
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  ) : (
                    // Data columns with different shapes
                    (() => {
                      const shapes = [
                        'w-8',    // ID column - small
                        'w-3/4',  // Name/Title column - medium
                        'w-full', // Other columns - full width
                        'w-2/3',  // Description column - medium-large
                        'w-1/2',  // Status column - medium
                        'w-1/3',  // Date column - small-medium
                      ];
                      const shapeIndex = Math.min(dataColumnIndex, shapes.length - 1);
                      return (
                        <div className={`h-4 bg-gray-200 rounded ${shapes[shapeIndex]}`}></div>
                      );
                    })()
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
