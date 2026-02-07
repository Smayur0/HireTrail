import LoginPage from "@/pages/login";
import LandingPage from "@/pages/LandingPage";
import AuthCallback from "@/pages/auth/AuthCallback";
import type { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path={"/*"} element={<Navigate replace to={`/login`} />} />
    </Routes>
  );
};

export default PublicRoutes;
