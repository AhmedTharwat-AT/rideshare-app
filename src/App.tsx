import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";

const Ride = lazy(() => import("./pages/Ride"));

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/", domain: "localhost" }}>
        <GoogleOAuthProvider clientId="1086845538861-754qlc3ql3vuca0acsject8ij34fmph8.apps.googleusercontent.com">
          {/* <ProtectedRoute> */}
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route
              path="ride"
              element={
                <Suspense fallback={<Spinner />}>
                  <Ride />
                </Suspense>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<h1>not found</h1>} />
          </Routes>
          {/* </ProtectedRoute> */}
        </GoogleOAuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
