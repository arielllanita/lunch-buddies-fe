import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  getPageStatus: () => string;
  arrayLength: number;
  itemsPerPage: number;
};

export default function ClientPagination({
  currentPage,
  getPageStatus,
  nextPage,
  previousPage,
  arrayLength,
  itemsPerPage,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={previousPage}
            variant={"ghost"}
            size={"icon"}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm">{getPageStatus()}</span>
        </PaginationItem>

        <PaginationItem>
          <Button
            onClick={nextPage}
            variant={"ghost"}
            size={"icon"}
            disabled={currentPage === Math.ceil(arrayLength / itemsPerPage)}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
