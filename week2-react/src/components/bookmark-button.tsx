import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
    movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId),
    );
    const toggleBookmark = useBookmarkStore(
        (state) => state.toggleBookmark,
    );

    return (
        <button type="button"
            className={cn(
                "rounded-full p-2 text-white",
                isBookmarked ? "bg-blue-600" : "bg-black/60",
            )}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(movieId);
            }}>
            <img
                src={isBookmarked ? "/public/icons/movie-icons/star.svg" : "/public/icons/movie-icons/star-outline.svg"}
                alt={isBookmarked ? "북마크 해제" : "북마크 추가"}
                className="w-5 h-5"
            />
        </button>
    );
}