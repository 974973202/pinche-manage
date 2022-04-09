import React, { lazy, Suspense } from "react";
import { Button } from "antd";
import LayoutMaster from "./layouts/LayoutMaster";
import { BrowserRouter, useRoutes, Routes } from "react-router-dom";
import "./App.css";


const Login = lazy(() => import("./layouts/Login"))
const Certification = lazy(() => import("./pages/Certification/Certification"))
const AreaPublich = lazy(() => import("./pages/areaPublich/areaPublich"))
const PeopleManager = lazy(() => import("./pages/peopleManager/peopleManager"))
const OwnerCertification = lazy(() => import("./pages/OwnerCertification/OwnerCertification"))
const WayRemmend = lazy(() => import("./pages/WayRemmend/wayRemmend"))
const Passenger = lazy(() => import("./pages/Passenger/passenger"))
const Province = lazy(() => import("./pages/areaManager/province"))
const UserInfo = lazy(() => import("./pages/userInfo/userInfo"))

function RenderRoutes(
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) {
  const routes = useRoutes([
    {
      path: "/",
      caseSensitive: true,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/index",
      element: <LayoutMaster />,
      children: [
        {
          path: "/index/certification",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Certification />
            </Suspense>
          ),
        },
        {
          path: "/index/ownerCertification",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <OwnerCertification />
            </Suspense>
          ),
        },
        {
          path: "/index/wayRemmend",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <WayRemmend />
            </Suspense>
          ),
        },
        {
          path: "/index/passenger",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Passenger />
            </Suspense>
          ),
        },
        {
          path: "/index/areaPublich",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AreaPublich />
            </Suspense>
          ),
        },
        {
          path: "/index/peopleManager",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <PeopleManager />
            </Suspense>
          ),
        },
        {
          path: "/index/areaManager",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Province />
            </Suspense>
          ),
        },
        {
          path: "/index/userInfo",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <UserInfo />
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
      <BrowserRouter>
        {/* <Routes> */}
        <RenderRoutes />
        {/* {JSON.stringify(routes)} */}
        {/* <Provider {...stores}> */}
        {/* {renderRoutes(routes)} */}
        {/* </Provider> */}
        {/* </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
