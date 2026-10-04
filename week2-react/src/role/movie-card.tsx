import { type Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (id: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <article className="movie-card">
            <div className="poster-container">
                <img src={movie.posterPath} alt={movie.title} className="poster" />
                <button
                    className="bookmark-button"
                    onClick={() => onToggleBookmark(movie.id)}
                >
                    {movie.isBookmarked ? '★' : '☆'}
                </button>
            </div>
        </article>);
}