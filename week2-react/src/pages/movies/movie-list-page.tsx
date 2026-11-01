import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../pagination";

export function MovieListPage() {
    const [page, setPage] = useState(1);

    const moviesQuery = useQuery({
        queryKey: ["movies", "list", { page }],
        queryFn: () => getMovies({ page }),
    });

    const movies = moviesQuery.data?.results ?? [];
    const totalPages = moviesQuery.data?.total_pages ?? 0;

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    return (
        <main>
            {moviesQuery.isPending ? (
                <main>로딩 중...</main>
            ) : moviesQuery.isError ? (
                <main>영화 목록을 불러오지 못했어요.</main>
            ) : movies.length === 0 ? (
                <main>표시할 영화가 없어요.</main>
            ) : (
                <>
                    <MovieGrid movies={movies} />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}