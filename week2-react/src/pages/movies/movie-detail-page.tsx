import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

export function MovieDetailPage() {
    const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
    const movieId = Number(movieIdParam);
    const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

    const movieDetailQuery = useQuery({
        queryKey: ["movies", "detail", movieId],
        queryFn: () => getMovieDetail(movieId),
        enabled: isValidMovieId,
        staleTime: 30 * 1000,

    });

    return (
        <main className="w-full">
            {!isValidMovieId ? (
                <main className="p-10 text-center text-lg">올바르지 않은 영화 번호예요.</main>
            ) : movieDetailQuery.isPending ? (
                <main className="p-10 text-center text-lg">로딩 중...</main>
            ) : movieDetailQuery.isError ? (
                <main className="p-10 text-center text-lg text-red-500">
                    {getMovieDetailErrorMessage(movieDetailQuery.error)}
                </main>
            ) : (
                (() => {
                    const movie = movieDetailQuery.data;
                    if (!movie) return <main>영화를 찾을 수 없어요.</main>;

                    const backdropUrl = movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                        : undefined;

                    const posterUrl = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : undefined;

                    return (
                        <div className="w-full relative bg-[#17191E] min-h-screen text-white pb-20">
                            <div className="relative w-full h-[500px]">
                                <img
                                    src={backdropUrl}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-full h-full object-cover opacity-30"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#17191E] to-transparent" />

                                <Link
                                    to="/"
                                    className="absolute top-10 left-10 text-white flex items-center gap-2 hover:opacity-80 font-bold"
                                >
                                    ← 영화 목록
                                </Link>

                                <div className="absolute bottom-10 left-10 md:left-20">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                        {movie.title}
                                    </h1>
                                    <p className="text-sm text-gray-300 mb-1">{movie.original_title}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <span>{movie.release_date}</span>
                                        <span>·</span>
                                        <span>{movie.genres?.map((g) => g.name).join(" · ")}</span>
                                        <span>·</span>
                                        <span>
                                            {typeof movie.runtime === "number"
                                                ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                                                : "시간 정보 없음"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-6xl mx-auto px-10 md:px-20 mt-10 flex flex-col md:flex-row gap-10">
                                <div className="w-64 flex-shrink-0">
                                    <img
                                        src={posterUrl}
                                        alt={`${movie.title} 포스터`}
                                        className="w-full rounded-xl shadow-lg border border-gray-700"
                                    />
                                    <div className="mt-4">
                                        <BookmarkButton movieId={movie.id} />
                                    </div>
                                </div>

                                <div className="flex-1 mt-4 md:mt-0">
                                    {movie.tagline && (
                                        <h2 className="text-2xl font-bold mb-4 italic text-gray-200">
                                            "{movie.tagline}"
                                        </h2>
                                    )}
                                    <h3 className="text-lg font-bold mb-2 text-gray-100">개요</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {movie.overview || "등록된 줄거리가 없습니다."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}
        </main>
    );
}