import path from "path";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Cookies } from "react-cookie";

const ProtectedRoute = (props: any) => {
  const cookie = new Cookies();
  console.log(cookie.get("etToken"));

  if (cookie.get("etToken") === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
