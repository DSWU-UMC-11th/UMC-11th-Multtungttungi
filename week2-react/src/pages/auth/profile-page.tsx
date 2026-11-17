import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMe } from "../../api/members/me";
import { getFavorites } from "../../api/favorites/get-favorites";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useAuthStore } from "../../stores/auth-store";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const ITEMS_PER_PAGE = 4;

// movieId로 TMDB에서 실제 포스터/제목/개봉일을 조회해 렌더링하는 개별 카드 컴포넌트
function FavoriteMovieCard({ movieId }: { movieId: number }) {
    const { data: movie, isLoading } = useQuery({
        queryKey: ["movies", "detail", movieId],
        queryFn: () => getMovieDetail(movieId),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 animate-pulse">
                <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <Link
            to="/movies/$movieId"
            params={{ movieId: String(movieId) }}
            className="flex flex-col gap-2 group"
        >
            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
                {movie.poster_path ? (
                    <img
                        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        이미지 없음
                    </div>
                )}
            </div>
            <h3 className="text-[14px] font-extrabold text-[#17191E] truncate">{movie.title}</h3>
            <p className="text-[12px] text-[#969DA8]">{movie.release_date}</p>
        </Link>
    );
}

export function ProfilePage() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [page, setPage] = useState(1);

    const { data: userInfo } = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
        enabled: Boolean(accessToken),
        staleTime: 5 * 60 * 1000,
    });

    const { data: favoritesData, isLoading: isFavoritesLoading } = useQuery({
        queryKey: ["favorites"],
        queryFn: () => getFavorites(1),
        enabled: Boolean(accessToken),
    });

    const allFavorites = favoritesData?.result ?? [];
    const totalPages = Math.max(Math.ceil(allFavorites.length / ITEMS_PER_PAGE), 1);
    const favoriteMovies = allFavorites.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
    );

    return (
        <main className="w-full min-h-screen bg-[#F6F7F9] py-10">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-8 px-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-[31px] font-bold text-[#17191E] tracking-tight">내 정보</h1>
                    <Link
                        to="/profile_edit"
                        className="bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-[14px] font-extrabold hover:bg-blue-700"
                    >
                        정보 수정
                    </Link>
                </div>

                <section className="border-y border-[#E3E6EB] py-6">
                    <h2 className="text-[17px] font-bold text-[#17191E] mb-5">기본 정보</h2>
                    <div className="flex items-center gap-10">
                        <div className="w-[82px] h-[82px] bg-[#E3E6EB] rounded-full flex justify-center items-center flex-shrink-0">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#17191E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>

                        <div className="flex gap-20">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] text-[#969DA8]">닉네임</label>
                                <strong className="text-[14px] font-bold text-[#17191E]">{userInfo?.nickname}</strong>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] text-[#969DA8]">이메일</label>
                                <strong className="text-[14px] font-bold text-[#17191E]">{userInfo?.email}</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-[17px] font-bold text-[#17191E] mb-5">내 즐겨찾기</h2>

                    {isFavoritesLoading ? (
                        <p className="text-sm text-[#606774] py-10 text-center">즐겨찾기 목록을 불러오는 중...</p>
                    ) : favoriteMovies.length === 0 ? (
                        <p className="text-sm text-[#606774] py-10 text-center">아직 즐겨찾기한 영화가 없어요.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {favoriteMovies.map((item) => (
                                    <FavoriteMovieCard key={item.movieId} movieId={item.movieId} />
                                ))}
                            </div>

                            <div className="flex justify-center items-center gap-3 mt-10">
                                <button
                                    type="button"
                                    disabled={page <= 1}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="text-[#2563EB] disabled:text-[#D9E5FF] px-2 py-1"
                                >
                                    ❮
                                </button>
                                <span className="w-9 h-9 bg-[#17191E] text-white rounded-md text-[13px] font-bold flex items-center justify-center">
                                    {page}
                                </span>
                                <button
                                    type="button"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="text-[#2563EB] disabled:text-[#D9E5FF] px-2 py-1"
                                >
                                    ❯
                                </button>
                            </div>
                        </>
                    )}
                </section>

            </div>
        </main>
    );
}