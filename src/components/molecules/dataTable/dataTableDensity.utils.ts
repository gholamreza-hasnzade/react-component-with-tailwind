export type RowDensity = 'compact' | 'normal' | 'comfortable';

export const getDensityClasses = (density: RowDensity) => {
  switch (density) {
    case 'compact':
      return {
        row: 'py-1',
        cell: 'px-2 py-1 text-xs',
        header: 'px-2 py-1 text-xs',
      };
    case 'normal':
      return {
        row: 'py-2',
        cell: 'px-3 py-2 text-sm',
        header: 'px-3 py-2 text-sm',
      };
    case 'comfortable':
      return {
        row: 'py-4',
        cell: 'px-4 py-3 text-base',
        header: 'px-4 py-3 text-base',
      };
    default:
      return {
        row: 'py-2',
        cell: 'px-3 py-2 text-sm',
        header: 'px-3 py-2 text-sm',
      };
  }
};
