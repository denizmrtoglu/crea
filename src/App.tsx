import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";

export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}
