import useUser from "@/hooks/useUser";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import MainLayout from "@/components/layout/MainLayout";

const Root = () => {
  const token = false;

  const getToken = () => {
    // if (token) {
    //   return true;
    // } else {
    // logout();
    return false;
    // }
  };

  return (
    <MainLayout>
      <Routes>
        {getToken() ? (
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
            getToken() ? (
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
