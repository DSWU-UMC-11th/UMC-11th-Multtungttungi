import MovieCard from "./movie-card";
import { type Movie } from "../../types/movie";

interface MovieGridProps {
    movies: Movie[];
    onToggleBookmark: (id: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
    return (
        <section className="w-full">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-[30px] font-bold">영화목록</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onToggleBookmark={onToggleBookmark} />
                ))}
            </div>
        </section>
    );
}