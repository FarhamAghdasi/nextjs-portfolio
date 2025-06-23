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
          className={`butn butn-md butn-rounded butn-bord mx-1 ${i === currentPage ? 'active-page' : ''}`}
        >
          {i}
        </button>
      );
    }
  
    return pages;
  };
  

  return (
    <div className="pagination-container mt-50 d-flex justify-content-center align-items-center flex-wrap gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="butn butn-md butn-rounded butn-bord d-flex align-items-center gap-2"
      >
        <i className="fas fa-chevron-left" /> Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="butn butn-md butn-rounded butn-bord d-flex align-items-center gap-2"
      >
        Next <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}
