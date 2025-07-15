import { ClientsService } from "@/services/ClientsService";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export function useClients(perPage = 20) {
  const pagination = usePagination(perPage);

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ["clients", { page: pagination.currentPage, perPage }], // Realiza uma nova request a cada mudança da queryKey e salva os dados no cache
    queryFn: async () => {
      const response = await ClientsService.getAll(
        pagination.currentPage,
        perPage
      );

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
