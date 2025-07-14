import { ClientsService } from "@/services/ClientsService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useClients(perPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ["clients", { page: currentPage, perPage }], // Realiza uma nova request a cada mudança da queryKey e salva os dados no cache
    queryFn: () => ClientsService.getAll(currentPage, perPage),
  });

  const totalItems = data?.items ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }
  function handlePreviousPage() {
    setCurrentPage((prevState) => prevState - 1);
  }

  function handleSetPage(page: number) {
    setCurrentPage(page);
  }

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePreviousPage,
      handleSetPage,
      totalPages,
      currentPage,
      hasPreviousPage,
      hasNextPage,
    },
  };
}
