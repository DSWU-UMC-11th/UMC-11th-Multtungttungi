import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { addFavorite } from "../api/favorites/add-favorite";
import { deleteFavorite } from "../api/favorites/delete-favorite";
import { useAuthStore } from "../stores/auth-store";

interface BookmarkButtonProps {
    movieId: number;
    title?: string;
    posterPath?: string | null;
    releaseDate?: string;
}

export function BookmarkButton({
    movieId,
    title = "",
    posterPath = null,
    releaseDate = "",
}: BookmarkButtonProps) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["favorites", "status", movieId],
        queryFn: () => getFavoriteStatus(movieId),
        enabled: Boolean(accessToken),
    });

    const isBookmarked =
        typeof data?.result === "boolean"
            ? data.result
            : Boolean(data?.result?.isFavorite);

    const addMutation = useMutation({
        mutationFn: () =>
            addFavorite({
                movieId,
                title,
                posterPath,
                releaseDate,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
        onError: () => {
            alert("즐겨찾기 추가에 실패했어요.");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteFavorite(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
        onError: () => {
            alert("즐겨찾기 해제에 실패했어요.");
        },
    });

    const isPending = addMutation.isPending || deleteMutation.isPending;

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!accessToken) {
            alert("로그인이 필요한 기능이에요.");
            navigate({ to: "/login" });
            return;
        }
        if (isPending) return;

        if (isBookmarked) {
            deleteMutation.mutate();
        } else {
            addMutation.mutate();
        }
    };

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={handleToggle}
            aria-label={isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-transform active:scale-95"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isBookmarked ? "#2563EB" : "none"}
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        </button>
    );
}