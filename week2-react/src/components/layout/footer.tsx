export default function Footer() {
    return (
        <footer className="flex flex-col justify-end items-end text-right gap-[10px] px-[80px] py-[24px] bg-white border-t border-[#E3E6EB]">
            <div className="flex">
                <img src="/images/logos/tmdb-logo.svg" alt="tmdb" className="w-[100px] h-[30px]" />
            </div>
            <p className="w-[398px] h-[14px] text-[12px] leading-[14px] text-center text-[#606774]">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
        </footer>
    )
}