import "./pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageCount = 5;

    const pageGroup = Math.ceil(currentPage / pageCount);

    let last = pageGroup * pageCount;
    if (last > totalPages) last = totalPages;
    const first = last - (pageCount - 1) <= 0 ? 1 : last - (pageCount - 1);

    const pages = [];
    for (let i = first; i <= last; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="arrow-left-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {pages.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`page-button ${currentPage === pageNum ? "active" : ""}`}
                >
                    {pageNum}
                </button>
            ))}

            <button
                className="arrow-right-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}