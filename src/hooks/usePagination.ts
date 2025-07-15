import { useCallback, useEffect, useState } from "react";

export function usePagination(perPage: number, initialPage = 1) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const page = searchParams.get("page");

    if (!page) {
      return initialPage;
    }

    return Number(page);
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    const url = new URL(window.location.href); // Consulta a url atual

    url.searchParams.set("page", String(currentPage)); // Adiciona o queryParam de page

    const newUrl =
      url.origin + url.pathname + "?" + url.searchParams.toString(); // Monta uma nova url

    window.history.replaceState({}, "", newUrl);
  }, [currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((prevState) => prevState - 1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setTotalItems,
    nextPage,
    previousPage,
    setPage,
  };
}
