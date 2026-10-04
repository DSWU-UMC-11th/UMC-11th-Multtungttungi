import "./pagination.css"
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="pagination">
            <button className="arrow-left-button" onClick={() => onPageChange(currentPage - 1)}>&lt;</button>

            {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`page-button ${currentPage === pageNum ? 'active' : ''}`}
                    >
                        {pageNum}
                    </button>
                );
            })}
            <button className="arrow-right-button" onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
        </div>
    );
}