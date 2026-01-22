import LoginPage from "@/pages/login";
import type { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path={"/*"} element={<Navigate replace to={`/login`} />} />
    </Routes>
  );
};

export default PublicRoutes;
