import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroudingPages = 1
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= currentPage - surroudingPages;
    const isWithinUpperBound = i <= currentPage + surroudingPages;
    const isEllipsisPosition =
      i === currentPage - surroudingPages - 1 ||
      i === currentPage + surroudingPages + 1;

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push("...");
      continue;
    }

    if (
      (isWithinLowerBound && isWithinUpperBound) ||
      isFirstPage ||
      isLastPage
    ) {
      pages.push(i);
    }
  }

  return pages;
}
