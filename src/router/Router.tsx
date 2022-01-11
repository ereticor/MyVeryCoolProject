import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppHeader from "components/AppHeader";
import AsideNavigation from "components/AsideNavigation";

import history from "store/history";

import Home from "pages/Home";
import ErrorPage from "pages/ErrorPage";
import CustomerManagement from "modules/customerManagement";

import appList from "constants/appList";

const Router = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <AppHeader />
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/customer" element={<CustomerManagement />} />
            <Route
              path="/error"
              element={<ErrorPage message={history.location.hash} />}
            />
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
