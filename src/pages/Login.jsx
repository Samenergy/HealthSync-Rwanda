import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const data = { email, password };

    try {
      const response = await axios.post(
        "https://healthsync.up.railway.app/api/login",
        data
      );
      console.log(response.data);

      if (response.status === 200) {
        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);

        const userRole = response.data.user.role.toLowerCase();
        switch (userRole) {
          case "administrator":
            navigate("/admin");
            break;
          case "doctor":
            navigate("/Dashboard");
            break;
          case "receptionist":
            navigate("/Reception");
            break;
          default:
            navigate("/");
            break;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-start px-6 py-12 lg:py-24 lg:px-8 bg-[#011c36]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img
            className="mx-auto h-auto w-auto"
            src="./src/assets/logo.png"
            alt="Logo"
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-50">
          Log in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-[#36799e] transition-opacity hover:text-gray-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSignIn}
              className="flex w-full justify-center rounded-md bg-[#00aeef] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#36799e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}

        <p className="mt-2 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-[#00aeef] hover:text-[#36799e]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
