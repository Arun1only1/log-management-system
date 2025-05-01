import { BrowserRouter, Route, Routes } from "react-router";
import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";
import { useAuthenticate } from "@/hooks/use-authenticate";

const ProjectRoutes = () => {
  const isAuthenticated = useAuthenticate();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated && <Route path="/*" element={<PublicRoutes />} />}

        {/* Private Routes */}
        {isAuthenticated && <Route path="/*" element={<PrivateRoutes />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;
