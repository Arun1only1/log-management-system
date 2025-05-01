import GuestGuard from "@/guard/guest-guard";
import LoginPage from "@/pages/(public)/login";
import NotFound from "@/pages/not-found";
import PublicLayout from "@/layout/public.layout";
import React from "react";
import { ROUTES } from "../constants";
import { Route, Routes } from "react-router";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route element={<PublicLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default React.memo(PublicRoutes);
