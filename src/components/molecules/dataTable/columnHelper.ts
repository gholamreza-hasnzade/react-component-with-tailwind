import { createColumnHelper } from '@tanstack/react-table';

// Default column helper for creating column definitions
export const columnHelper = createColumnHelper<Record<string, unknown>>();
