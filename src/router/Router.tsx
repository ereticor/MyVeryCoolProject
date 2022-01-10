import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "components/Header";
import AsideNavigation from "components/AsideNavigation";

import Home from "pages/Home";

import appList from "constants/appList";

const Router = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <Header />
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home appList={appList} />} />
            <Route path="*" element={<div>Lorem ipsum dolor sit amet.</div>} />
          </Routes>
          <AsideNavigation appList={appList} />
        </BrowserRouter>
      </main>
    </Suspense>
  );
};

export default Router;
