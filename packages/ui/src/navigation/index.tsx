import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import MainLayout from "@/components/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setCredentials, setInitialized } from "@/redux/slice/user.slice";
import api from "@/lib/api";

const Root = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/auth/me");
        dispatch(setCredentials({ user: data.user }));
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(setInitialized(true));
      }
    };

    if (!isInitialized) {
      checkAuth();
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-medium text-muted-foreground">Loading HireTrail...</p>
        </div>
      </div>
    );
  }

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
