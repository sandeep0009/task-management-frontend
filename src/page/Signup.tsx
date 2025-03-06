import { motion } from "framer-motion";
import { useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = {
  email: string;
  password: string;
  name: string;
};

export const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: { name?: string; email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "name") formattedErrors.name = issue.message;
        if (issue.path[0] === "email") formattedErrors.email = issue.message;
        if (issue.path[0] === "password") formattedErrors.password = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axiosInstance.post("/signup", formData);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        router("/task");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/signin" className="text-blue-500 hover:underline"> Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};
