import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

function Login() {
  const { signup, login } = useAuth();
  const [state, setState] = useState("signup");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formData;
  function handleInput(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    if (state === "signup") {
      if (password !== confirmPassword) {
        toast.error("password is not same");
        return;
      }
      const credential = { username, email, password };
      signup(credential);
      navigate("/");
    } else {
      const extra = await login({ email, password });
      if (extra.success) {
        navigate("/");
      }
    }
    setFormData({ username: "", email: "", password: "" });
  }

  function handleClick() {
    setState((prev) => {
      if (prev === "signup") {
        return "login";
      } else {
        return "signup";
      }
    });
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="w-full sm:w-96 shadow-2xl p-4 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-gray-700">
          {state === "signup" ? "create Account" : "Login"}
        </h2>
        <p className="text-lg text-gray-600 mb-3">
          {state === "signup"
            ? "Create your Account"
            : "Login to your account!"}
        </p>
        <form onSubmit={handlesubmit}>
          {state === "signup" && (
            <div className="border-2 border-black rounded-sm my-3">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleInput}
                placeholder="Username"
                required
                autoComplete="off"
                className="p-2 w-full outline-none text-gray-500"
              />
            </div>
          )}
          <div className="border-2 border-black rounded-sm my-3">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleInput}
              placeholder="Email"
              autoComplete="off"
              required
              className="p-2 w-full outline-none text-gray-500"
            />
          </div>
          <div className="border-2 border-black rounded-sm my-3">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleInput}
              placeholder="Password"
              autoComplete="off"
              required
              className="p-2 w-full outline-none text-gray-500"
            />
          </div>
          {state === "signup" && (
            <div className="border-2 border-black rounded-sm my-3">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleInput}
                placeholder="Confirm Password"
                autoComplete="off"
                required
                className="p-2 w-full outline-none text-gray-500"
              />
            </div>
          )}

          <Link to="/resetpassword" className="block text-start">
            Forgot password?
          </Link>
          <input
            type="submit"
            value={state}
            className="border border-slate-500 rounded-sm w-full mt-3 p-1.5 cursor-pointer bg-gray-800 text-slate-100"
          />
        </form>
        {state === "signup" && (
          <p className="mt-2">
            Already have an Account?
            <span
              className="cursor-pointer underline ml-1 text-gray-800"
              onClick={handleClick}
            >
              login here
            </span>
          </p>
        )}

        {state === "login" && (
          <p className="mt-2">
            don't have an Account?
            <span
              className="cursor-pointer underline ml-1 text-gray-800"
              onClick={handleClick}
            >
              signup
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
