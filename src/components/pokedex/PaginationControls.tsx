import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: PaginationControlsProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | string)[] = [];
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push("ellipsis-start");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return <div className="h-10" />;
  }

  return (
    <Pagination>
      <PaginationContent className="relative w-full flex items-center">
        <PaginationItem className="absolute left-0">
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            isActive={currentPage > 1}
            className="p-1.5 px-2 bg-white text-black font-black hover:bg-primary hover:text-white transition duration-300"
          />
        </PaginationItem>

        <div className="flex-1 flex items-center justify-center space-x-1">
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="w-6 p-0 justify-center" />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page as number);
                  }}
                  isActive={currentPage === page}
                  className={`p-1.5 px-2 w-8 justify-center transition duration-300 hover:bg-primary hover:text-white
                    ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </div>

        <PaginationItem className="absolute right-0">
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            isActive={currentPage < totalPages}
            className="p-1.5 px-2 bg-white text-black font-black hover:bg-primary hover:text-white transition duration-300"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
