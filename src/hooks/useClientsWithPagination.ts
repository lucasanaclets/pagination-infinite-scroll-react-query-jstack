import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePagination } from "./usePagination";
import { clientsService } from "@/services/clientsService";
import { useEffect } from "react";

export function useClientsWithPagination(perPage = 20) {
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ["clients", { page: pagination.currentPage, perPage }], // Realiza uma nova request a cada mudança da queryKey e salva os dados no cache
    queryFn: async () => {
      const response = await clientsService.getAll(
        pagination.currentPage,
        perPage
      );

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  useEffect(() => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ["clients", { page: nextPage, perPage }], // Realiza uma nova request a cada mudança da queryKey e salva os dados no cache
        staleTime: Infinity,
        queryFn: async () => {
          const response = await clientsService.getAll(nextPage, perPage);

          pagination.setTotalItems(response.items);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
