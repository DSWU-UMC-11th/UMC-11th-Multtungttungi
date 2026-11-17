import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../pages/auth/profile-page";

export const Route = createFileRoute("/(authenticated)/profile")({ component: ProfilePage });