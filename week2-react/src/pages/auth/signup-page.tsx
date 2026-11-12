import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
// import { useNavigate } from "@tanstack/react-router";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = {
    isChecking: false,
    isAvailable: false,
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];
type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
    const [form, setForm] = useState(DEFAULT_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const navigate = useNavigate();
    const [duplicateCheck, setDuplicateCheck] = useState({
        email: DEFAULT_DUPLICATE_CHECK,
        nickname: DEFAULT_DUPLICATE_CHECK,
    });

    const isEmailValid = EMAIL_REGEX.test(form.email.trim());
    const isNicknameValid = form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
    const isPasswordValid = PASSWORD_REGEX.test(form.password);
    const isPasswordConfirmValid =
        form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

    const showEmailError = form.email.length > 0 && !isEmailValid;
    const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
    const showPasswordError = form.password.length > 0 && !isPasswordValid;
    const showPasswordConfirmError = form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

    const isFormValid = isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

    const canSubmit =
        isFormValid &&
        duplicateCheck.email.isAvailable &&
        duplicateCheck.nickname.isAvailable;

    const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
        if (key === "email" || key === "nickname") {
            if (duplicateCheck[key].isChecking) return;
            setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
        }
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
        const isValid = key === "email" ? isEmailValid : isNicknameValid;
        if (!isValid || duplicateCheck[key].isChecking) return;

        const label = key === "email" ? "이메일" : "닉네임";
        setDuplicateCheck((prev) => ({
            ...prev,
            [key]: { isChecking: true, isAvailable: false },
        }));

        try {
            const response =
                key === "email"
                    ? await checkEmailDuplicate(form.email.trim())
                    : await checkNicknameDuplicate(form.nickname.trim());
            const isAvailable = response.available;
            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: { ...prev[key], isAvailable },
            }));
            alert(
                isAvailable
                    ? `사용할 수 있는 ${label}이에요.`
                    : `이미 사용 중인 ${label}이에요.`,
            );
        } catch {
            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: { ...prev[key], isAvailable: false },
            }));
            alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: { ...prev[key], isChecking: false },
            }));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await signup({
                email: form.email.trim(),
                nickname: form.nickname.trim(),
                password: form.password,
            });
            alert(response.message);
            // 로그인 페이지 연결 후 주석 해제
            // navigate({ to: "/login" });
        } catch {
            alert("회원가입에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-[#F6F7F9] flex justify-center items-center py-20">
            <div className="w-[430px] flex flex-col gap-4">
                <h1 className="text-[34px] font-bold text-[#17191E] tracking-tight mb-4">회원가입</h1>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">이메일</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 gap-2 focus-within:border-black">
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.email}
                                onChange={(e) => handleChangeField("email", e.target.value)}
                            />
                            <button
                                type="button"
                                className="text-[12px] font-extrabold text-[#2563EB] flex-shrink-0"
                                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                                onClick={() => handleCheckDuplicate("email")}
                            >
                                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
                            </button>
                        </div>
                        {showEmailError && <p className="text-red-500 text-xs">올바른 이메일 형식을 입력해 주세요.</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">닉네임</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 gap-2 focus-within:border-black">
                            <input
                                type="text"
                                placeholder="2–12자"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.nickname}
                                onChange={(e) => handleChangeField("nickname", e.target.value)}
                            />
                            <button
                                type="button"
                                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                                onClick={() => handleCheckDuplicate("nickname")}
                                className="text-[12px] font-extrabold text-[#2563EB] flex-shrink-0"
                            >
                                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
                            </button>

                        </div>
                        {showNicknameError && <p className="text-red-500 text-xs">닉네임은 2~12자로 입력해 주세요.</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">비밀번호</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 focus-within:border-black">
                            <input
                                type="password"
                                placeholder="8자 이상"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.password}
                                onChange={(e) => handleChangeField("password", e.target.value)}
                            />
                        </div>
                        {showPasswordError ? (
                            <p className="text-red-500 text-[11px]">영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요.</p>
                        ) : (
                            <p className="text-[#969DA8] text-[11px]">영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요.</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-extrabold text-[#17191E]">비밀번호 확인</label>
                        <div className="flex items-center bg-white border border-[#E3E6EB] rounded-lg h-[48px] px-3 focus-within:border-black">
                            <input
                                type="password"
                                placeholder="다시 입력"
                                className="flex-1 outline-none text-[14px] text-[#17191E] placeholder:text-[#969DA8]"
                                value={form.passwordConfirm}
                                onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
                            />
                        </div>
                        {showPasswordConfirmError && <p className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="mt-2 w-full h-[48px] bg-[#2563EB] text-white font-extrabold text-[14px] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    >
                        {isSubmitting ? "가입 중" : "가입하기"}
                    </button>
                </form>

                <div className="flex justify-center items-center gap-2 mt-4 text-[13px] text-[#606774]">
                    <span>이미 계정이 있나요?</span>
                    <a href="/login" className="text-[12px] font-extrabold text-[#2563EB] hover:underline">
                        로그인
                    </a>
                </div>
            </div>
        </main>
    );
}