import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Pages/MainLayOut/MainLayOut";
import ErrorElement from "../Shared/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";

 

const router =createBrowserRouter([
      {
        path:"/",
        element:<MainLayOut></MainLayOut>,
        errorElement:<ErrorElement></ErrorElement>,
        children:([
            {
                path:"/",
                element:<Home></Home>
            },
            {
              path:"/login",
              element:<Login></Login>
            },
            {
              path:"/register",
              element:<Register></Register>
            }

        ])
      }
])

export default router;