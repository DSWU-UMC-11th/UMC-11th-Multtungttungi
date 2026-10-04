import MovieCard from "./movie-card";
import { type Movie } from "../types/movie";
import "./movie-grid.css";

interface MovieGridProps {
    movies: Movie[];
    onToggleBookmark: (id: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
    return (
        <section className="movie-grid">
            <h2 className="movie-grid-title">영화목록</h2>

            <div className="movie-grid-container">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onToggleBookmark={onToggleBookmark} />
                ))}
            </div>
        </section>
    );
}