import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="tmdb-logo-container">
                <img src="/images/logos/tmdb-logo.svg" alt="tmdb" className="tmdb-logo" />
            </div>
            <p className="footer-text">This product uses the TMDB API but is not endorsed or certified by TMDB. </p>
        </footer>
    )
}