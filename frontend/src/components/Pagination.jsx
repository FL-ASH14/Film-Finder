// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ moviesPerPage, totalMovies, paginate, currentPage }) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-8 mb-12">
      <ul className="flex justify-center items-center space-x-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-800 text-purple-300 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === number
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-purple-300 hover:bg-gray-700'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-800 text-purple-300 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;