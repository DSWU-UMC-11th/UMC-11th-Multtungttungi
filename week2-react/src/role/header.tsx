import "./header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="brand-row">
                <div className="logo-icon">🎥</div>
                <h1 className="logo-text">UMCine</h1>

            </div>
            <nav className="nav-menu">
                <a href="#" className="nav-link">영화 </a>
                <a href="#" className="nav-link">검색 </a>
                <a href="#" className="nav-link">내 정보</a>
            </nav>
            <div className="top-actions">
                <button className="search-btn">🔎</button>
                <button className="login-btn">로그인</button>
            </div>
        </header>
    );
}

