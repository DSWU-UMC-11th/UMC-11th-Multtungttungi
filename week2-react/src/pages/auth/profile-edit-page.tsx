import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useAuthStore } from "../../stores/auth-store";

export function ProfileEditPage() {
    const accessToken = useAuthStore((state) => state.accessToken);

    // 1. 현재 내 정보 조회
    const { data: userInfo } = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
        enabled: Boolean(accessToken),
    });

    const [nickname, setNickname] = useState("");
    const [duplicateCheck, setDuplicateCheck] = useState({
        isChecking: false,
        isAvailable: false,
    });

    // 서버에서 불러온 기존 닉네임으로 입력창 초기화
    useEffect(() => {
        if (userInfo?.nickname) {
            setNickname(userInfo.nickname);
        }
    }, [userInfo?.nickname]);

    const updateMeMutation = useUpdateMeMutation();
    const trimmedNickname = nickname.trim();
    const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

    // 닉네임 입력값이 바뀔 때마다 중복 확인 상태 초기화
    const handleNicknameChange = (value: string) => {
        if (duplicateCheck.isChecking) return;
        setDuplicateCheck({ isChecking: false, isAvailable: false });
        setNickname(value);
    };

    // 2. 닉네임 중복 확인 핸들러
    const handleCheckDuplicate = async () => {
        if (!isNicknameValid || duplicateCheck.isChecking) return;

        setDuplicateCheck({ isChecking: true, isAvailable: false });
        try {
            const response = await checkNicknameDuplicate(trimmedNickname);
            const isAvailable = response.available;
            setDuplicateCheck({ isChecking: false, isAvailable });
            alert(
                isAvailable
                    ? "사용할 수 있는 닉네임이에요."
                    : "이미 사용 중인 닉네임이에요.",
            );
        } catch {
            setDuplicateCheck({ isChecking: false, isAvailable: false });
            alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
        }
    };

    // 기존 닉네임과 다르면서 중복 확인을 통과했거나, 글자 수 조건을 만족할 때 저장 가능
    const canSubmit = isNicknameValid && duplicateCheck.isAvailable;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit || updateMeMutation.isPending) return;

        updateMeMutation.mutate({ nickname: trimmedNickname });
    };

    return (
        <main className="w-full min-h-screen bg-[#F6F7F9] py-10">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-10 px-4 relative">

                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[31px] font-bold text-[#17191E] tracking-tight">내 정보 수정</h1>
                        <p className="text-[14px] text-[#606774]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
                    </div>
                    <button
                        type="submit"
                        form="profile-edit-form"
                        disabled={!canSubmit || updateMeMutation.isPending}
                        className="bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-[14px] font-extrabold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updateMeMutation.isPending ? "저장 중" : "변경사항 저장"}
                    </button>
                </div>

                <form id="profile-edit-form" onSubmit={handleSubmit} className="flex gap-20 mt-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            <div className="w-[82px] h-[82px] bg-[#E3E6EB] rounded-full flex justify-center items-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#17191E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <button type="button" className="absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-[#17191E] rounded-full flex justify-center items-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#17191E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                        </div>
                        <strong className="text-[15px] font-bold text-[#17191E] mt-2">프로필 이미지</strong>
                        <span className="text-[11px] text-[#969DA8]">선택 사항 · 최대 5MB</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 max-w-[640px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-extrabold text-[#17191E]">닉네임</label>
                            <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 gap-2 focus-within:border-black">
                                <input
                                    type="text"
                                    placeholder="2–12자"
                                    className="flex-1 outline-none text-[14px] text-[#17191E]"
                                    value={nickname}
                                    onChange={(e) => handleNicknameChange(e.target.value)}
                                />
                                <button
                                    type="button"
                                    disabled={!isNicknameValid || duplicateCheck.isChecking}
                                    onClick={handleCheckDuplicate}
                                    className="text-[12px] font-extrabold text-[#2563EB] flex-shrink-0 disabled:opacity-50"
                                >
                                    {duplicateCheck.isChecking ? "확인 중" : "중복 확인"}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-extrabold text-[#17191E]">이메일</label>
                            <div className="flex items-center bg-gray-50 border border-[#E3E6EB] rounded-lg h-[48px] px-3 cursor-not-allowed">
                                <input
                                    type="email"
                                    className="flex-1 outline-none text-[14px] text-[#969DA8] bg-transparent cursor-not-allowed"
                                    value={userInfo?.email ?? ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <section className="mt-20 flex justify-between items-center p-6 bg-red-50/50 border border-[#D92D20] rounded-xl">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[14px] font-bold text-[#D92D20]">회원 탈퇴</h3>
                        <p className="text-[11px] text-[#D92D20]">탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
                    </div>
                    <button type="button" className="bg-white border border-[#D92D20] text-[#D92D20] px-5 py-2.5 rounded-lg text-[14px] font-extrabold hover:bg-red-50">
                        회원 탈퇴
                    </button>
                </section>

            </div>
        </main>
    );
}