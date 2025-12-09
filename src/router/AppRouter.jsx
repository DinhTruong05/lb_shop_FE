import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH PAGES */
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

/* ADMIN PAGES */
import DashboardPage from "../pages/dashboard/DashboardPage";
import BookListPage from "../pages/books/BookListPage";
import AddBookPage from "../pages/books/AddBookPage";
import EditBookPage from "../pages/books/EditBookPage";
import BookDetailPage from "../pages/books/BookDetailPage";
import UserListPage from "../pages/users/UserListPage";

/* READER PAGES */
import ReaderDashboardPage from "../pages/dashboard/ReaderDashboardPage";
import ReaderHomePage from "../pages/dashboard/ReaderHomePage";

/* LAYOUTS */
import MainLayout from "../components/layout/MainLayout";
import ReaderLayout from "../components/layout/ReaderLayout"; 

/* Route Guards */
function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
}

function RoleRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* === PUBLIC ROUTES === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* === ADMIN ROUTES === */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute role="ADMIN">
                <MainLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="books" element={<BookListPage />} />
          <Route path="books/add" element={<AddBookPage />} />
          <Route path="books/edit/:id" element={<EditBookPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="users" element={<UserListPage />} />

        </Route>

        {/* === READER ROUTES === */}
        <Route
          path="/reader"
          element={
            <PrivateRoute>
              <RoleRoute role="READER">
                <ReaderLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<ReaderDashboardPage />} />
          <Route path="home" element={<ReaderHomePage />} />
        </Route>

        {/* === FALLBACK === */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
