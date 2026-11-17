import { authApi } from "../auth-api";

export interface FavoriteStatusResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        isFavorite: boolean;
    } | boolean;
}

export function getFavoriteStatus(movieId: number) {
    return authApi
        .get(`favorites/${movieId}`)
        .json<FavoriteStatusResponse>();
}