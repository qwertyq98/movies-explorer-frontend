import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.isLogin === true ? <Component {...props} /> : props.isLogin === false ? <Navigate to="/signin" replace/> : <></>
)}

export default ProtectedRouteElement; 