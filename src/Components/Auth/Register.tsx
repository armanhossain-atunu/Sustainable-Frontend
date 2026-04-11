"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegisterFormInputs {
  name: string;
  email: string;
  photo: string;
  password: string;
}

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await fetch("https://sustainable-server.vercel.app/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(result.message || "Registration failed. This email may already be in use.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl border border-base-300">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl font-bold justify-center mb-2">Create Account</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* PHOTO URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className={`input input-bordered ${errors.photo ? "input-error" : ""}`}
                {...register("photo", {
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                    message: "Invalid image URL (must end in jpg, png, etc.)",
                  },
                })}
              />
              {errors.photo && <p className="text-error text-xs mt-1">{errors.photo.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className={`input input-bordered ${errors.password ? "input-error" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
