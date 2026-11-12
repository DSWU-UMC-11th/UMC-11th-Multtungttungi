import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditPage } from "../pages/auth/profile-edit-page";

export const Route = createFileRoute("/profile_edit")({ component: ProfileEditPage });