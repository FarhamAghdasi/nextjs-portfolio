'use client';

import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          aria-label={`Page ${i}`}
          className={`w-8 h-8 inline-flex items-center justify-center rounded-full text-sm transition-colors ${
            i === currentPage
              ? 'bg-white text-black font-semibold'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-container mt-[40px] flex justify-center items-center flex-wrap gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        className="w-9 h-9 inline-flex items-center justify-center rounded-full text-white/70 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="fas fa-chevron-left" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
        className="w-9 h-9 inline-flex items-center justify-center rounded-full text-white/70 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}
