export default function Header() {
    return (
        <header className="flex flex-row justify-between items-center px-[80px] py-[24px] bg-white border-b border-[#E3E6EB]">

            <div className="flex flex-row items-center gap-[10px]">
                <div className="box-border flex flex-col justify-center items-center w-[32px] h-[32px] py-[6px] border-2 border-[#17191E] rounded-[8px]">
                    🎥
                </div>
                <h1 className="font-black text-[20px] leading-[24px] flex items-center justify-center text-[#17191E]">
                    UMCine
                </h1>
            </div>

            <nav className="flex flex-row items-center gap-[30px] p-0">
                <a href="#" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">영화</a>
                <a href="#" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">검색</a>
                <a href="#" className="font-bold text-[14px] leading-[17px] flex items-center text-center text-[#606774]">내 정보</a>
            </nav>

            <div className="flex flex-row items-center gap-[10px] p-0">
                <button className="box-border flex flex-row justify-center items-center w-[32px] h-[32px] px-[6px] py-[1px] bg-white border border-[#E3E6EB] rounded-[8px]">
                    🔎
                </button>
                <button className="box-border flex flex-row justify-center items-center w-[80px] h-[32px] bg-[#2563EB] border border-white rounded-[8px] font-extrabold text-[14px] leading-[17px] text-center text-white">
                    로그인
                </button>
            </div>
        </header>
    );
}