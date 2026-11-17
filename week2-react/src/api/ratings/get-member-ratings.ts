import { authApi } from "../auth-api";

export interface RatingItem {
    ratingId: number;
    movieId: number;
    score: number;
    comment?: string;
}

export function getMemberRatings(memberId: number) {
    return authApi
        .get(`members/${memberId}/ratings`)
        .json<RatingItem[]>();
}