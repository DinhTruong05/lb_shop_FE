import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

import MainLayout from "../components/layout/MainLayout";

import BookListPage from "../pages/books/BookListPage";
import BookDetailPage from "../pages/books/BookDetailPage";
import AddBookPage from "../pages/books/AddBookPage";
import EditBookPage from "../pages/books/EditBookPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---- PUBLIC ROUTES ---- */}
        <Route path="/login" element={<LoginPage />} />

        {/* ---- PRIVATE ROUTES ---- */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Books CRUD */}
          <Route path="books" element={<BookListPage />} />
          <Route path="books/add" element={<AddBookPage />} />
          <Route path="books/edit/:id" element={<EditBookPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
