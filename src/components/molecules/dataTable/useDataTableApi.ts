import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface ApiResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface DataTableApiConfig {
  url: string;
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useDataTableApi<T>(
  config: DataTableApiConfig,
  enabled: boolean = true
) {
  const { url, limit = 10, skip = 0, search, sortBy, sortOrder } = config;

  return useQuery({
    queryKey: ['dataTable', url, limit, skip, search, sortBy, sortOrder],
    queryFn: async (): Promise<ApiResponse<T>> => {
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (skip) params.append('skip', skip.toString());
      if (search) params.append('q', search);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);

      const response = await axios.get(`${url}?${params.toString()}`);      
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for server-side pagination
export function useDataTablePagination<T>(
  url: string,
  pageIndex: number,
  pageSize: number,
  search?: string,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc'
) {
  const skip = pageIndex * pageSize;

  return useDataTableApi<T>(
    {
      url,
      limit: pageSize,
      skip,
      search,
      sortBy,
      sortOrder,
    },
    !!url
  );
}
