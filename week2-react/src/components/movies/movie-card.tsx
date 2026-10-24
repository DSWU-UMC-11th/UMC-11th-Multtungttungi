import { Link } from "@tanstack/react-router";
import { type Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
        >
            <div className="relative flex p-0 w-[241.6px] h-[274px] bg-[#F6F7f9] justify-center overflow-hidden items-center rounded-lg">
                <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover" />

                <div
                    className="absolute right-2 top-2"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <BookmarkButton movieId={movie.id} />
                </div>
            </div>
        </Link>
    );
}