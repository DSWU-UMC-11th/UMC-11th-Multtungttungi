
import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movie";

export function MovieListPage() {

    return (
        <main>
            <MovieGrid
                movies={movies}

            />
        </main>
    );
}