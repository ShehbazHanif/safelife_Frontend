// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/Auth/Login";
import { ROUTES } from "./utils/Routes";
import { LoaderProvider } from "./contexts/LoaderContext";
import Loader from "./components/ui/Loader";

function App() {
  return (
    <LoaderProvider>
      <Loader />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {ROUTES.map(
                (route) =>
                  route.element && (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ),
              )}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </LoaderProvider>
  );
}

export default App;
