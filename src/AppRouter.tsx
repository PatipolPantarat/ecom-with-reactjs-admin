// Routes
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products/products";
import AllProducts from "./pages/products/all";
import AddProducts from "./pages/products/add";
import Detail from "./pages/products/detail";
import ErrorPage from "./error-page";
import Categories from "./pages/products/categories";

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<Products />}>
            <Route index element={<AllProducts />} />
            <Route path="add" element={<AddProducts />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
