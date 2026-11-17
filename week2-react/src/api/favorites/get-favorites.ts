import { authApi } from "../auth-api";

export interface FavoriteMovie {
    favoriteId?: number;
    movieId: number;
    title: string;
    posterPath: string | null;
    releaseDate: string;
}

export interface GetFavoritesResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: FavoriteMovie[];
}

export function getFavorites(page = 1) {
    return authApi
        .get("favorites", { searchParams: { page } })
        .json<GetFavoritesResponse>();
}