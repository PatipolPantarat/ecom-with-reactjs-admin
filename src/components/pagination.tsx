import { PaginationProps } from "../config/interface";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-4 py-2 rounded-full hover:bg-primary-light hover:text-primary duration-100 ${
            currentPage === index + 1
              ? "bg-blue-500 text-primary bg-primary-light"
              : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
