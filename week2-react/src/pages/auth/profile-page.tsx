import { Link } from "@tanstack/react-router";

export function ProfilePage() {
    //임시데이터
    const userInfo = {
        nickname: "gs0428",
        email: "gwangsoo@cinemalab.kr",
    };

    const favoriteMovies = [
        { id: 1, title: "스파이더맨: 브랜드 뉴 데이", date: "2026.07.29", poster: "https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg" },
        { id: 2, title: "오디세이", date: "2026.08.05", poster: "https://image.tmdb.org/t/p/w500/1X7vow16X7CnCoexXh4H4F2yDJv.jpg" },
        { id: 3, title: "미니언즈 & 몬스터즈", date: "2026.07.15", poster: "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NglUNNjTEnRWwiW.jpg" },
    ];

    return (
        <main className="w-full min-h-screen bg-[#F6F7F9] py-10">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-8 px-4">

                {/* 상단 타이틀 및 버튼 */}
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
                                <strong className="text-[14px] font-bold text-[#17191E]">{userInfo.nickname}</strong>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] text-[#969DA8]">이메일</label>
                                <strong className="text-[14px] font-bold text-[#17191E]">{userInfo.email}</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-[17px] font-bold text-[#17191E] mb-5">내 즐겨찾기</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {favoriteMovies.map((movie) => (
                            <div key={movie.id} className="flex flex-col gap-2">
                                <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-[14px] font-extrabold text-[#17191E] truncate">{movie.title}</h3>
                                <p className="text-[12px] text-[#969DA8]">{movie.date}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-3 mt-10">
                        <button className="text-[#D9E5FF]">❮</button>
                        <button className="w-9 h-9 bg-[#17191E] text-white rounded-md text-[13px] font-bold">1</button>
                        <button className="text-[#D9E5FF]">❯</button>
                    </div>
                </section>

            </div>
        </main>
    );
}