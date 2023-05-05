import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./router/PrivateRoutes";
import Register from "./pages/Register";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const App = () => {
  const token = cookies.get("TOKEN");
  const [authenticated, setAuthenticated] = useState(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute authenticated={authenticated} element={<Dashboard />} />}
        />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;