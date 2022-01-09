import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppHeader from "components/AppHeader";
import AsideNavigation from "components/AsideNavigation";

import Home from "pages/Home";

import appList from "constants/appList";

const Router = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <AppHeader />
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home appList={appList} />} />
          </Routes>
          <AsideNavigation appList={appList} />
        </BrowserRouter>
      </main>
    </Suspense>
  );
};

export default Router;
