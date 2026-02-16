import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import PrivateRoute from "./PrivateRoute";
 

// lazy loaded components------------
const MainLayOut = lazy(() => import("../Pages/MainLayOut/MainLayOut"))
const ErrorElement = lazy(() => import("../Shared/ErrorElement/ErrorElement"))
const Home = lazy(() => import("../Pages/Home/Home"))
const Login = lazy(() => import("../Authentication/Login/Login"))
const Register = lazy(() => import("../Authentication/Register/Register"))
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"))
const Merchandise = lazy(() => import("../Pages/Merchandise/Merchandise"))
const CreateOrder= lazy(()=>import("../Pages/Merchandise/CreateOrder"))
const Settings = lazy(()=>import("../Pages/Settings/Settings"))

// skeleton-component------------------
const PageSkeleton = () => {
  return (
   <SkeletonTheme baseColor="#2e2e2e" highlightColor="#0877b2">
      <div className="p-6 space-y-8 max-w-3xl mx-auto min-h-screen text-white">
        {/* Title Skeleton */}
        <Skeleton height={40} width={250} />

        {/* Paragraph lines */}
        <div className="my-5">
          <Skeleton height={20} />
          <Skeleton height={20} width="90%" />
          <Skeleton height={20} width="80%" />
        </div>

        {/* Image or Card block */}
        <Skeleton height={250} />
      </div>
    </SkeletonTheme>
  );
};

// suspense fallback-component-------------------
const WithSuspense = ({ Component }) => {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithSuspense Component={MainLayOut}></WithSuspense>,
    errorElement: <WithSuspense Component={ErrorElement}></WithSuspense>,
    children: [
      {
        path: "/",
        element: <WithSuspense Component={Home}></WithSuspense>
      },
      {
        path: "/login",
        element: <WithSuspense Component={Login}></WithSuspense>
      },
      {
        path: "/register",
        element: <WithSuspense Component={Register}></WithSuspense>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><WithSuspense Component={Dashboard}></WithSuspense></PrivateRoute>
      },
      {
        path: "/merchandise",
        element: <PrivateRoute><WithSuspense Component={Merchandise}></WithSuspense></PrivateRoute>
      },
      {
        path:"/createOrder",
        element:<WithSuspense Component={CreateOrder}></WithSuspense>
      },
      {
        path:"/settings",
        element:<WithSuspense Component={Settings}></WithSuspense>
      }

    ]
  }
])

export default router;