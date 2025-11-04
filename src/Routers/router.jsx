import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
// lazy loaded components------------
const MainLayOut = lazy(() => import("../Pages/MainLayOut/MainLayOut"))
const ErrorElement = lazy(() => import("../Shared/ErrorElement/ErrorElement"))
const Home = lazy(() => import("../Pages/Home/Home"))
const Login = lazy(() => import("../Authentication/Login/Login"))
const Register = lazy(() => import("../Authentication/Register/Register"))

// skeleton-component------------------
const PageSkeleton = () => {
  return (
    <div>
      <Skeleton height={40} width={200}></Skeleton>
      <Skeleton height={20} count={3}></Skeleton>
      <Skeleton height={200}></Skeleton>
    </div>
  )
}
// suspense fallback-component-------------------
const WithSuspense = ({Component}) => {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<WithSuspense Component={MainLayOut}></WithSuspense>,
    errorElement:<WithSuspense Component={ErrorElement}></WithSuspense>,
    children: [
      {
        path: "/",
        element:<WithSuspense Component={Home}></WithSuspense>
      },
      {
        path: "/login",
        element:<WithSuspense Component={Login}></WithSuspense>
      },
      {
        path: "/register",
        element:<WithSuspense Component={Register}></WithSuspense>
      }

    ]
  }
])

export default router;