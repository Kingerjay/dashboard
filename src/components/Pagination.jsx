import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {/* Previous button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="w-8 h-8 rounded-md text-[rgba(200,200,200,1)] border border-[rgba(200,200,200,1)] disabled:opacity-50"
      >
        &lt;
      </button>

      {/* Page numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`
            w-8 h-8 rounded-md 
            ${currentPage === index + 1 
              ? 'bg-[rgba(137,70,166,1)] text-[rgba(200,200,200,1)] border border-[rgba(200,200,200,1)]' 
              : 'text-[rgba(200,200,200,1)] border border-[rgba(200,200,200,1)]'}
          `}
        >
          {index + 1}
        </button>
      ))}

      {/* Next button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="w-8 h-8 rounded-md text-[rgba(200,200,200,1)] border border-[rgba(200,200,200,1)] disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;