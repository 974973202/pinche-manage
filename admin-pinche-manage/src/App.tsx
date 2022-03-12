import React, { lazy, Suspense } from "react";
import { Button } from "antd";
import LayoutMaster from "./layouts/LayoutMaster";
import { HashRouter, useRoutes, Routes } from "react-router-dom";
import "./App.css";

const Certification = lazy(() => import("./pages/Certification/Certification"))
const OwnerCertification = lazy(() => import("./pages/OwnerCertification/OwnerCertification"))
const WayRemmend = lazy(() => import("./pages/WayRemmend/wayRemmend"))
const Passenger = lazy(() => import("./pages/Passenger/passenger"))

function RenderRoutes(
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) {
  const routes = useRoutes([
    {
      path: "/",
      element: <LayoutMaster />,
      children: [
        {
          path: "/certification",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Certification />
            </Suspense>
          ),
        },
        {
          path: "/ownerCertification",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <OwnerCertification />
            </Suspense>
          ),
        },
        {
          path: "/wayRemmend",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <WayRemmend />
            </Suspense>
          ),
        },
        {
          path: "/passenger",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Passenger />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return routes;
}

function App() {
  return (
    <div className='App'>
      <HashRouter>
        {/* <Routes> */}
        <RenderRoutes />
        {/* {JSON.stringify(routes)} */}
        {/* <Provider {...stores}> */}
        {/* {renderRoutes(routes)} */}
        {/* </Provider> */}
        {/* </Routes> */}
      </HashRouter>
    </div>
  );
}

export default App;
