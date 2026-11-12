import { useState } from "react";

export function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChangeField = (key: "email" | "password", value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("로그인 API 연동 준비 완료!");
    };

    return (
        <main className="w-full min-h-screen bg-[#F6F7F9] flex justify-center items-center py-20">
            <div className="w-[430px] flex flex-col gap-4">
                <h1 className="text-[34px] font-bold text-[#17191E] tracking-tight mb-4 text-center">로그인</h1>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">이메일</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 gap-2 focus-within:border-black">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606774" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                                <polyline points="3 7 12 13 21 7"></polyline>
                            </svg>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.email}
                                onChange={(e) => handleChangeField("email", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">비밀번호</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 gap-2 focus-within:border-black">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606774" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.password}
                                onChange={(e) => handleChangeField("password", e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!form.email || !form.password}
                        className="mt-2 w-full h-[48px] bg-[#2563EB] text-white font-extrabold text-[14px] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    >
                        로그인
                    </button>
                </form>

                <div className="flex justify-center items-center gap-2 mt-4 text-[13px] text-[#606774]">
                    <span>처음이신가요?</span>
                    <a href="/signup" className="text-[12px] font-extrabold text-[#2563EB] hover:underline">
                        회원가입
                    </a>
                </div>
            </div>
        </main>
    );
}