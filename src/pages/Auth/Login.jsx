import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ChechBox from "../../components/common/CheckBox";
import Snackbar from "../../components/common/Snackbar";
import { useLoader } from "../../contexts/LoaderContext";
import apiService from "../../apiservices/ApiServices";

export default function Login() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter both email and password.",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);
    showLoader();

    try {
      const result = await apiService.signIn(username.trim(), password);

      if (result?.signIn?.token) {
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        setTimeout(() => navigate("/"), 600);
      } else {
        setSnackbar({
          open: true,
          message: "Login failed. Please try again.",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message || "Unable to sign you in right now.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
      hideLoader();
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <h1 className="text-lg  font-Montserrat text-gray-800 mb-4">
        Welcome to Safelife
      </h1>

      <form onSubmit={handleLogin} className="space-y-4 px-1">
        {/* Email / Username Input */}
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="email"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {/* Remember Device & Forgot Password */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setRememberDevice(!rememberDevice)}>
            <ChechBox
              checked={rememberDevice}
              // We pass an empty function here since the parent <div> handles the toggle smoothly
              onChange={() => {}}
            />
            <span className="text-gray-800 text-[14px] font-Montserrat">
              Remember this Device
            </span>
          </div>
          <a
            href="#"
            className="text-[14px] font-Montserrat text-primary hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-4"
          disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
