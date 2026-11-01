import { Link } from "@tanstack/react-router";
import { type TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined;
    return (
        <Link
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
        >
            <div className="relative flex p-0 w-[241.6px] h-[274px] bg-[#F6F7f9] justify-center overflow-hidden items-center rounded-lg">
                <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />

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