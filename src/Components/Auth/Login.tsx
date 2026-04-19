"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from "next-auth/react";
import Link from 'next/link';

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
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error || "Login failed");
      } else {
        const session = await getSession();
        const redirectPath =
          session?.user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
        toast.success("Login successful!");
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 1200);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
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
      <div className="divider max-w-md mx-auto">OR</div>
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="link link-primary font-semibold">
          Register here
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
