import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Pages/MainLayOut/MainLayOut";
import ErrorElement from "../Shared/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";

 

const router =createBrowserRouter([
      {
        path:"/",
        element:<MainLayOut></MainLayOut>,
        errorElement:<ErrorElement></ErrorElement>,
        children:([
            {
                path:"/",
                element:<Home></Home>
            }
        ])
      }
])

export default router;