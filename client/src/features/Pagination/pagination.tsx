import React, { useEffect } from "react";

import Button from "../../components/ui/button";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageLimit: number;
  itemCount: number;
  totalPages: number;
};

export function Pagination({
  currentPage,
  setCurrentPage,
  pageLimit,
  itemCount,
  totalPages,
}: Props) {
  useEffect(() => {
    setCurrentPage(1);
  }, [itemCount, setCurrentPage]);

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;
  const noPages = totalPages <= 1;

  return (
    <div className="pagination-wrapper">
      <div className="pagination-summary">
        {itemCount > 0 ? (
          <>
            Showing <strong>{(currentPage - 1) * pageLimit + 1}</strong> to{" "}
            <strong>
              {Math.min(
                currentPage * pageLimit - (pageLimit - 1) + pageLimit - 1,
                itemCount
              )}
            </strong>{" "}
            of <strong>{itemCount}</strong> items
          </>
        ) : null}
      </div>
      {noPages ? null : (
        <div className="pagination-actions">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={isFirstPage}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLastPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
