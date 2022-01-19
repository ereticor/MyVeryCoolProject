import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import history from "store/history";

import CustomerTable from "modules/customerManagement/CustomerTable";
import CustomerEdit from "modules/customerManagement/CustomerEdit";
import CustomerDetails from "modules/customerManagement/CustomerDetails";

import Home from "pages/Home";
import ErrorPage from "pages/ErrorPage";
import TestPage from "pages/TestPage";

import AppHeader from "components/AppHeader";
import AsideNavigation from "components/AsideNavigation";

import appList from "constants/appList";

const Router = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <BrowserRouter>
        <AppHeader />
        <main className="main">
          <Routes>
            <Route
              path="/customer/new"
              element={<CustomerEdit mode={"new"} />}
            />
            <Route
              path="/customer/:customerId/edit"
              element={<CustomerEdit mode={"edit"} />}
            />
            <Route path="/customer/:customerId" element={<CustomerDetails />} />
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
        </main>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
