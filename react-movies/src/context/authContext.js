import React, { useState, createContext } from "react";
import { login, signup } from "../api/userAPI";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = sessionStorage.getItem("sessionId");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    sessionStorage.setItem("sessionId", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.success);
    return (result.success);
  };

  const signout = () => {
    sessionStorage.removeItem("sessionId");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
