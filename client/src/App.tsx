import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { verifyToken } from "./utils/auth";
import Loading from "./pages/Loading";
export const UserContext = React.createContext({name: "", id: ""});

const App = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState({name:"",id:""});

  useEffect(() => {
    verifyToken().then((data) => {
      setAuthenticated(data.status);
      setUsers({name:data.name, id:data.id})
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return authenticated ? (
    <UserContext.Provider value={users}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  ) :
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
};

export default App;