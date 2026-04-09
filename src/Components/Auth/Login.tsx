"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await fetch("https://sustainable-server.vercel.app/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto my-10 p-6 bg-base-200 rounded-xl shadow" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mt-4"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-error">{errors.password.message}</p>}
        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;