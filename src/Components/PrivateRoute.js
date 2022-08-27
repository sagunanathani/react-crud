import React from "react";
import {Navigate} from "react-router";

const PrivateRoute = ({Component}) => {
    const Token = JSON.parse(localStorage.getItem("access_token"));
    return Token ? <Component/> : <Navigate to="/"/>
};
export default PrivateRoute;