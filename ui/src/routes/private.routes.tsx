import AuthGuard from "@/guard/auth-guard";
import AuthLayout from "@/layout/auth-layout";
import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants";
import Dashboard from "@/pages/(private)/dashboard";
import NotFound from "@/pages/not-found";
import React from "react";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.NGINX} element={<Dashboard />} />{" "}
          <Route path={ROUTES.APACHE} element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default React.memo(PrivateRoutes);
