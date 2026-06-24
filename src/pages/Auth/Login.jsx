import { useState } from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import ChechBox from "../../components/Common/CheckBox";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { username, password, rememberDevice });
  };

  return (
    <div className="w-full max-w-md overflow-hidden">
      <h1 className="text-lg  font-Montserrat text-gray-800 mb-4">
        Welcome to Safelife
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Username Input */}
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          className="w-full mt-4">
          Button
        </Button>
      </form>
    </div>
  );
}
