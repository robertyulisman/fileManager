import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import useAuth from "../hooks/useAuth";

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return <Login />;
}

export default Auth;
