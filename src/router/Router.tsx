import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import history from "store/history";

import AppHeader from "components/AppHeader";
import AsideNavigation from "components/AsideNavigation";

import history from "store/history";

import Home from "pages/Home";
import ErrorPage from "pages/ErrorPage";
import TestPage from "pages/TestPage";
import CustomerTable from "modules/customerManagement/CustomerTable";

import appList from "constants/appList";
import TestPage from "pages/TestPage";

const Router = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <AppHeader />
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/customer/" element={<CustomerTable />} />
            <Route
              path="/error"
              element={<ErrorPage message={history.location.hash} />}
            />
            <Route path="/test" element={<TestPage />} />
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
