import { useInfiniteQuery } from "@tanstack/react-query";
import { clientsService } from "@/services/clientsService";

export function useClients(perPage = 20) {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["clients"],
    staleTime: Infinity,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => clientsService.getAll(pageParam, perPage),
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  const clients = data?.pages.flatMap((page) => page.data); // [[1,2], [3,4], [5,6]] -> [1,2,3,4,5,6]

  return {
    clients: clients ?? [],
    isLoading,
    nextPage: fetchNextPage,
  };
}
