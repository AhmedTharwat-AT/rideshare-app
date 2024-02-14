import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Ride from "./pages/Ride";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <GoogleOAuthProvider clientId="1086845538861-754qlc3ql3vuca0acsject8ij34fmph8.apps.googleusercontent.com">
          <ProtectedRoute>
            <NavBar />
            <Routes>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="ride" element={<Ride />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </ProtectedRoute>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
