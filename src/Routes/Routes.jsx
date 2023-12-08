import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CheckOut from "../pages/CheckOut/CheckOut";
import Bookings from "../pages/Bookings/Bookings";
import PrivatRoute from "./PrivatRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/login',
            element: <Login/>
        },
        {
            path:'/signup',
            element: <Register/>
        },
        {
            path:'/checkout/:id',
            element: <PrivatRoute><CheckOut/></PrivatRoute>,
            loader: ({params})=>fetch(`http://localhost:5000/services/${params.id}`),
        },
        {
            path:'/bookings',
            element: <PrivatRoute><Bookings/></PrivatRoute>,
        },
      ]
    },
  ]);

  export default router;