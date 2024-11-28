import { useState, useMemo } from "react";

interface UsePaginatorResult<T> {
  currentPage: number;
  itemsOnPage: T[];
  nextPage: () => void;
  previousPage: () => void;
  getPageStatus: () => string;
}

/**
 * For client side pagination
 */
export function usePaginator<T>(array: T[], itemsPerPage: number = 10): UsePaginatorResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(array.length / itemsPerPage),
    [array.length, itemsPerPage]
  );

  const itemsOnPage = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }, [array, itemsPerPage, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getPageStatus = () => `Page ${currentPage} of ${totalPages}`;

  return { currentPage, itemsOnPage, nextPage, previousPage, getPageStatus };
}
