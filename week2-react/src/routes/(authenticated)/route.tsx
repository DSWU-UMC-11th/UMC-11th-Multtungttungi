import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export const Route = createFileRoute("/(authenticated)")({
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    const accessToken = useAuthStore((state) => state.accessToken);

    // 토큰이 없으면 로그인 페이지로 강제 이동!
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // 토큰이 있으면 하위 페이지(profile, profile_edit)를 정상적으로 렌더링!
    return <Outlet />;
}