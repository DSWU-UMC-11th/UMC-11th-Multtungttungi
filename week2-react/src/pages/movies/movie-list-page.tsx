import { useState } from "react";
import { type Movie } from "../../types/movie";
import MovieGrid from "../../components/movies/movie-grid";
import { movies as initialMovies } from "../../data/movie";

export function MovieListPage() {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    function handleToggleBookmark(movieId: number) {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie,
            ),
        );
    }

    return (
        <main>
            <MovieGrid
                movies={movies}
                onToggleBookmark={handleToggleBookmark}
            />
        </main>
    );
}