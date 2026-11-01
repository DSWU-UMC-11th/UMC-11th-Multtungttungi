import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookmarkButton } from "../../components/bookmark-button";
import { searchMovies } from "../../api/movies/search-movies";

export function SearchPage() {
    const { query } = useSearch({ from: "/search" });
    const navigate = useNavigate({ from: "/search" });

    const [searchText, setSearchText] = useState(query ?? "");

    useEffect(() => {
        setSearchText(query ?? "");
    }, [query]);

    const normalizedQuery = query?.trim() ?? "";

    const searchQuery = useQuery({
        queryKey: ["movies", "search", { query: normalizedQuery }],
        queryFn: () => searchMovies({ query: normalizedQuery }),
        enabled: normalizedQuery.length > 0,
    });

    const searchResults = searchQuery.data?.results ?? [];

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextQuery = searchText.trim();
        navigate({
            search: nextQuery ? { query: nextQuery } : {},
        });
    }

    return (
        <main className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">영화 검색</h1>

            -            <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        aria-label="검색어"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="영화 제목을 입력하세요"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#17191E] text-white px-6 py-3 rounded-lg font-bold hover:bg-black whitespace-nowrap"
                >
                    다시 검색
                </button>
            </form>

            {!normalizedQuery ? (
                <p className="text-gray-500">검색어를 입력해 주세요.</p>
            ) : searchQuery.isLoading ? (
                <p className="text-gray-500">로딩 중...</p>
            ) : searchQuery.isError ? (
                <p className="text-red-500">검색 결과를 불러오지 못했어요.</p>
            ) : searchQuery.isSuccess && searchResults.length === 0 ? (
                <div className="py-10">
                    <h2 className="text-lg font-bold mb-1">‘{query}’ 검색 결과</h2>
                    <p className="text-gray-500 text-sm mb-4">영화 0편</p>
                    <p className="text-gray-600">검색 결과가 없어요.</p>
                </div>
            ) : (
                <div>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-1">‘{query}’ 검색 결과</h2>
                        <p className="text-gray-500 text-sm">영화 {searchResults.length}편</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {searchResults.map((movie) => {
                            const posterUrl = movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : undefined;

                            return (
                                <li key={movie.id} className="flex gap-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                                    <img
                                        src={posterUrl}
                                        alt={`${movie.title} 포스터`}
                                        className="w-28 h-40 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-bold text-[16px] truncate">{movie.title}</h3>
                                            <div className="flex-shrink-0">
                                                <BookmarkButton movieId={movie.id} />
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400 mt-1 truncate">
                                            {movie.original_title} · {movie.release_date}
                                        </p>

                                        <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-snug">
                                            {movie.overview}
                                        </p>

                                        <Link
                                            to="/movies/$movieId"
                                            params={{ movieId: String(movie.id) }}
                                            className="mt-auto pt-3 text-blue-600 font-bold text-sm hover:underline"
                                        >
                                            상세 보기 →
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </main>
    );
}