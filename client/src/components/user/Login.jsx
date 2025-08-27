import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //admin const { login } = useAuth();

const handleLogin = async () => {
  const res = await axios.post("/api/login", { email, password });
  if (res.data.success) {
    login(res.data.user); // user should have {name, email, role}
    navigate("/");
  }
};


  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          User Login
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangerHandler}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* No account yet */}
        <p className="text-center text-gray-600 mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
