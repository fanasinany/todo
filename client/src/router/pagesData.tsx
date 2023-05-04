import Login from "../pages/Login";
import Register from "../pages/Register";
import { routerType } from "../types/router.types";


const pagesData: routerType[] = [
    {
        path: "",
        element: <Login />,
        title: "login"
    },
    {
        path: "register",
        element: <Register />,
        title: "register"
    }
];

export default pagesData;