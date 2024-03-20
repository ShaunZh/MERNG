import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { checkAuth } from "./utils/auth";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        loader: checkAuth,
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
        ]
    },
]);

export default router;