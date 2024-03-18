import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/layout";
import Home from "./pages/Home";

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
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />
            }
        ]
    },
]);

export default router;