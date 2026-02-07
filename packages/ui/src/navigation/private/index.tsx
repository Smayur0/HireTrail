import Dashboard from "@/pages/dashboard";

import { Route, Routes } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
