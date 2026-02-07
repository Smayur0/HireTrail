import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import MainLayout from "@/components/layout/MainLayout";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Root = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <MainLayout>
      <Routes>
        {isAuthenticated ? (
          <>
            {/* -----------private routes-------------  */}
            <Route path="/app/*" element={<PrivateRoutes />} />
          </>
        ) : (
          <>
            {/* -----------public routes-------------  */}
            <Route path="/*" element={<PublicRoutes />} />
          </>
        )}

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Navigate replace to={`/app/dashboard`} />
            ) : (
              <Navigate replace to={`/login`} />
            )
          }
        />
      </Routes>
    </MainLayout>
  );
};

export default Root;
