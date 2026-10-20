import { Link } from "@tanstack/react-router";
import { type Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (id: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <Link
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
        >
            <div className="relative flex p-0 w-[241.6px] h-[274px] bg-[#F6F7f9] justify-center overflow-hidden items-center rounded-lg">
                <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover" />

                <button
                    className={cn(
                        "absolute right-2 top-2 rounded-full p-2 text-white",
                        movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleBookmark(movie.id);
                    }}
                >
                    <img
                        src={movie.isBookmarked ? "/icons/movie-icons/star.svg" : "/icons/movie-icons/star-outline.svg"}
                        alt={movie.isBookmarked ? "북마크해제" : "북마크추가"}
                        className="w-5 h-5"
                    />
                </button>
            </div>
        </Link>
    );
}