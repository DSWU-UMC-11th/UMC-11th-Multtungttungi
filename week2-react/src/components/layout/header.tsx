import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export default function Header() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const meQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
        enabled: Boolean(accessToken),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    return (
        <header className="flex flex-row justify-between items-center px-[80px] py-[24px] bg-white border-b border-[#E3E6EB]">
            <Link to="/" className="flex flex-row items-center gap-[10px]">
                <div className="box-border flex flex-col justify-center items-center w-[32px] h-[32px] py-[6px] border-2 border-[#17191E] rounded-[8px]">
                    🎥
                </div>
                <h1 className="font-black text-[20px] leading-[24px] flex items-center justify-center text-[#17191E]">
                    UMCine
                </h1>
            </Link>

            <nav className="flex flex-row items-center gap-[30px] p-0">
                <Link to="/" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">
                    영화
                </Link>
                <Link to="/search" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">
                    검색
                </Link>
                <Link to="/profile" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">
                    내 정보
                </Link>
            </nav>

            <div className="flex flex-row items-center gap-[10px] p-0">
                <Link
                    to="/search"
                    className="box-border flex flex-row justify-center items-center w-[32px] h-[32px] px-[6px] py-[1px] bg-white border border-[#E3E6EB] rounded-[8px]"
                >
                    🔎
                </Link>

                {/* 토큰 및 조회 상태에 따른 로그인 / 로딩 / 마이페이지 분기 */}
                {!accessToken ? (
                    <Link
                        to="/login"
                        className="box-border flex flex-row justify-center items-center w-[80px] h-[32px] bg-[#2563EB] border border-white rounded-[8px] font-extrabold text-[14px] leading-[17px] text-center text-white"
                    >
                        로그인
                    </Link>
                ) : meQuery.isLoading ? (
                    <span className="h-[32px] w-[80px] animate-pulse rounded-[8px] bg-gray-200" />
                ) : (
                    <Link
                        to="/profile"
                        className="box-border flex flex-row justify-center items-center w-[80px] h-[32px] bg-[#2563EB] border border-white rounded-[8px] font-extrabold text-[14px] leading-[17px] text-center text-white"
                    >
                        마이페이지
                    </Link>
                )}
            </div>
        </header>
    );
}