import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMemberRatings } from "../api/ratings/get-member-ratings";
import { createRating } from "../api/ratings/create-rating";
import { updateRating } from "../api/ratings/update-rating";
import { deleteRating } from "../api/ratings/delete-rating";
import { useAuthStore } from "../stores/auth-store";

interface MovieRatingSectionProps {
    movieId: number;
}

// JWT accessToken의 payload에서 회원 번호(sub 또는 memberId)를 추출하는 함수
function getMemberIdFromToken(token: string | null): number | null {
    if (!token) return null;
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        const id = Number(payload.memberId ?? payload.id ?? payload.sub);
        return Number.isInteger(id) && id > 0 ? id : null;
    } catch {
        return null;
    }
}

export function MovieRatingSection({ movieId }: MovieRatingSectionProps) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const queryClient = useQueryClient();

    // JWT 토큰에서 바로 memberId 추출!
    const memberId = getMemberIdFromToken(accessToken);

    // 1. 내 전체 별점 목록 조회 후 현재 movieId에 해당하는 내 별점 찾기
    const { data: ratingsData } = useQuery({
        queryKey: ["ratings", "member", memberId],
        queryFn: () => getMemberRatings(memberId!),
        enabled: Boolean(accessToken && memberId),
    });

    const ratingList = Array.isArray(ratingsData)
        ? ratingsData
        : (ratingsData as { result?: typeof ratingsData } | undefined)?.result ?? [];

    const myRating = ratingList.find((item) => Number(item.movieId) === movieId);
    const [score, setScore] = useState<number>(5);
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        if (myRating) {
            setScore(myRating.score);
            setComment(myRating.comment ?? "");
        } else {
            setScore(5);
            setComment("");
        }
    }, [myRating]);

    // 2. 등록 Mutation (POST /ratings)
    const createMutation = useMutation({
        mutationFn: () =>
            createRating({
                movieId,
                score,
                comment: comment.trim() || undefined,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ratings"] });
            alert("평점이 등록되었어요!");
        },
        onError: () => {
            alert("평점 등록에 실패했어요.");
        },
    });

    // 3. 수정 Mutation (PATCH /ratings/{ratingId})
    const updateMutation = useMutation({
        mutationFn: () =>
            updateRating(myRating!.ratingId, {
                score,
                comment: comment.trim() || undefined,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ratings"] });
            alert("평점이 수정되었어요!");
        },
        onError: () => {
            alert("평점 수정에 실패했어요.");
        },
    });

    // 4. 삭제 Mutation (DELETE /ratings/{ratingId})
    const deleteMutation = useMutation({
        mutationFn: () => deleteRating(myRating!.ratingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ratings"] });
            alert("평점이 삭제되었어요.");
        },
        onError: () => {
            alert("평점 삭제에 실패했어요.");
        },
    });

    const isPending =
        createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;

        if (myRating) {
            updateMutation.mutate();
        } else {
            createMutation.mutate();
        }
    };

    if (!accessToken) {
        return (
            <section className="mt-10 p-6 bg-gray-800/60 border border-gray-700 rounded-xl flex justify-between items-center">
                <p className="text-sm text-gray-300">로그인하고 이 영화에 대한 별점과 후기를 남겨보세요.</p>
                <Link
                    to="/login"
                    className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-xs font-extrabold hover:bg-blue-700"
                >
                    로그인하기
                </Link>
            </section>
        );
    }

    return (
        <section className="mt-10 p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">내 별점 및 후기</h3>
                {myRating && (
                    <span className="text-xs text-blue-400 font-semibold">
                        작성 완료 · 수정 또는 삭제할 수 있어요
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setScore(star)}
                            className={`text-2xl transition-transform hover:scale-110 ${star <= score ? "text-yellow-400" : "text-gray-600"
                                }`}
                        >
                            ★
                        </button>
                    ))}
                    <span className="ml-2 text-sm font-bold text-gray-200">{score}점</span>
                </div>

                <textarea
                    rows={3}
                    placeholder="영화에 대한 한줄평을 남겨주세요. (선택)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#17191E] border border-gray-700 rounded-lg p-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                />

                <div className="flex justify-end gap-2">
                    {myRating && (
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => deleteMutation.mutate()}
                            className="px-4 py-2 rounded-lg text-xs font-extrabold bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 disabled:opacity-50"
                        >
                            삭제하기
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-5 py-2 rounded-lg text-xs font-extrabold bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {myRating ? "평점 수정" : "평점 등록"}
                    </button>
                </div>
            </form>
        </section>
    );
}