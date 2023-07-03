import React from 'react';
import { Navigate } from "react-router-dom";

const UnProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.isLogin ? <Navigate to="/" replace/> : <Component {...props} /> 
)}

export default UnProtectedRouteElement; 