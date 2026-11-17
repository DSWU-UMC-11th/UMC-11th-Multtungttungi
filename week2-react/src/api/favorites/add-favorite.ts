import { authApi } from "../auth-api";

export interface AddFavoriteRequest {
    movieId: number;
    title: string;
    posterPath: string | null;
    releaseDate: string;
}

export function addFavorite(body: AddFavoriteRequest) {
    return authApi.post("favorites", { json: body }).json();
}