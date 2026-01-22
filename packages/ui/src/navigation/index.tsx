import useUser from "@/hooks/useUser";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

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
  );
};

export default Root;
