import { useState } from "react";
import { type Movie } from "./types/movie";
import Header from "./role/header";
import MovieGrid from "./role/movie-grid";
import Pagination from "./role/pagination";
import Footer from "./role/footer";


const initialMovies: Movie[] = [
  {
    id: 1,
    title: "군체",
    originalTitle: "Colony",
    releaseDate: "2026.05.21",
    posterPath: "./public/images/movies/colony.jpg",
    backdropPath: "./public/images/movies/colony-backdrop.jpg",
    genres: ["SF", "액션"],
    runtime: "120분",
    tagline: "우주를 향한 위대한 여정",
    overview: "미지의 행성을 탐험하는 우주선 승무원들의 이야기입니다.",
    isBookmarked: true,
  },
  {
    id: 2,
    title: "토이스토리5",
    originalTitle: "Inception",
    releaseDate: "2010.07.16",
    posterPath: "./public/images/movies/toy-story-5.jpg",
    backdropPath: "./public/images/movies/toy-story-5-backdrop.jpg",
    genres: ["SF", "스릴러"],
    runtime: "148분",
    tagline: "꿈을 조종하는 기술",
    overview: "꿈 속에서 꿈을 조종하는 기술을 가진 도미닉 코브의 이야기입니다.",
    isBookmarked: false,
  },
  {
    id: 3,
    title: "The DEATH OF ROBIN HOOD",
    originalTitle: "Inception",
    releaseDate: "2010.07.16",
    posterPath: "./public/images/movies/death-of-robin-hood.jpg",
    backdropPath: "./public/images/movies/death-of-robin-hood-backdrop.jpg",
    genres: ["SF", "스릴러"],
    runtime: "148분",
    tagline: "꿈을 조종하는 기술",
    overview: "꿈 속에서 꿈을 조종하는 기술을 가진 도미닉 코브의 이야기입니다.",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Evil Dead Burn",
    originalTitle: "Interstellar",
    releaseDate: "2014.11.07",
    posterPath: "./public/images/movies/evil-dead-burn.jpg",
    backdropPath: "./public/images/movies/evil-dead-burn-backdrop.jpg",
    genres: ["SF", "드라마"],
    runtime: "169분",
    tagline: "인류의 미래를 건 우주 탐사",
    overview: "지구의 자원이 고갈된 미래, 인류의 생존을 위해 우주를 탐사하는 이야기입니다.",
    isBookmarked: true,
  },
  {
    id: 5,
    title: "라스트 하우스",
    originalTitle: "Avengers: Endgame",
    releaseDate: "2019.04.24",
    posterPath: "./public/images/movies/last-house.jpg",
    backdropPath: "./public/images/movies/last-house-backdrop.jpg",
    genres: ["액션", "모험"],
    runtime: "181분",
    tagline: "최후의 전쟁, 모든 것을 걸다",
    overview: "어벤져스 팀이 타노스와의 최후의 전쟁을 벌이는 이야기입니다.",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "미니언즈&몬스터즈",
    originalTitle: "Captain Marvel",
    releaseDate: "2019.03.08",
    posterPath: "./public/images/movies/minions-monsters.jpg",
    backdropPath: "./public/images/movies/minions-monsters-backdrop.jpg",
    genres: ["액션", "SF"],
    runtime: "124분",
    tagline: "새로운 영웅, 새로운 세계",
    overview: "캡틴 마블이 새로운 세계에서 싸우는 이야기입니다.",
    isBookmarked: false,
  },
  {
    id: 7,
    title: "옵세션",
    originalTitle: "Spider-Man: No Way Home",
    releaseDate: "2021.12.15",
    posterPath: "./public/images/movies/obsession.jpg",
    backdropPath: "./public/images/movies/obsession-backdrop.jpg",
    genres: ["액션", "모험"],
    runtime: "148분",
    tagline: "멀티버스의 위협, 스파이더맨의 선택",
    overview: "멀티버스의 위협에 맞서 싸우는 스파이더맨의 이야기입니다.",
    isBookmarked: true,
  },
  {
    id: 8,
    title: "오디세이",
    originalTitle: "Doctor Strange in the Multiverse of Madness",
    releaseDate: "2022.05.04",
    posterPath: "./public/images/movies/odyssey.jpg",
    backdropPath: "./public/images/movies/odyssey-backdrop.jpg",
    genres: ["액션", "판타지"],
    runtime: "126분",
    tagline: "멀티버스의 혼돈 속으로",
    overview: "닥터 스트레인지가 멀티버스의 혼돈 속에서 싸우는 이야기입니다.",
    isBookmarked: false,
  },
  {
    id: 9,
    title: "스파이더맨",
    originalTitle: "Spider-Man: No Way Home",
    releaseDate: "2021.12.15",
    posterPath: "./public/images/movies/spider-man-brand-new-day.jpg",
    backdropPath: "./public/images/movies/spider-man-brand-new-day-backdrop.jpg",
    genres: ["액션", "모험"],
    runtime: "161분",
    tagline: "와칸다의 새로운 시대",
    overview: "블랙 팬서가 와칸다의 새로운 시대를 이끄는 이야기입니다.",
    isBookmarked: true,
  },
  {
    id: 10,
    title: "스파이더맨-노 웨이 홈",
    originalTitle: "Spider-Man: No Way Home",
    releaseDate: "2021.12.15",
    posterPath: "./public/images/movies/spider-man-no-way-home.jpg",
    backdropPath: "./public/images/movies/spider-man-no-way-home-backdrop.jpg",
    genres: ["액션", "모험"],
    runtime: "119분",
    tagline: "신들의 전쟁, 사랑과 번개",
    overview: "토르가 신들의 전쟁 속에서 사랑과 번개를 다루는 이야기입니다.",
    isBookmarked: false,
  },
];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const totalpages = Math.ceil(movies.length / 5);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <div>
      <Header />
      <main className="flex-grow">
        <MovieGrid
          movies={movies}
          onToggleBookmark={handleToggleBookmark} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalpages}
          onPageChange={setCurrentPage} />
      </main>
      <Footer />
    </div>
  );
}
