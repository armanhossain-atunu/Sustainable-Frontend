"use client";

import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  // const photoUrl = watch("photo");

  // const handlePhotoBlur = () => {
  //   const url = photoUrl?.trim();
  //   if (url && /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)/i.test(url)) {
  //     setPhotoPreview(url);
  //   } else {
  //     setPhotoPreview("");
  //   }
  // };

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("🎉 Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        toast.error(result.message || "Registration failed. This email may already be in use.");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-base-content">Create your account</h1>
          <p className="text-base-content/50 text-sm mt-1">Fill in the details below to get started</p>
        </div>

        {/* Card */}
        <div className="card bg-base-200 border border-base-300 shadow-sm">
          <div className="card-body gap-5 p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

              {/* Avatar preview + Name row */}
              <div className="flex items-center gap-4">
                {/* <div className="avatar flex-shrink-0">
                  <div className="w-14 h-14 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2 bg-base-300 overflow-hidden flex items-center justify-center">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                        onError={() => setPhotoPreview("")}
                      />
                    ) : (
                      <span className="text-2xl text-base-content/30 select-none">
                        {watch("name")?.[0]?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                </div> */}
                <div className="flex-1">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/50">
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className={`input input-bordered input-sm w-full ${errors.name ? "input-error" : ""}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-error text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-control gap-1">
                <label className="label pb-1">
                  <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/50">
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className={`input input-bordered w-full pl-9 ${errors.email ? "input-error" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-xs flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Photo URL */}
              <div className="form-control gap-1">
                <label className="label pb-1">
                  <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/50">
                    Photo URL
                  </span>
                  <span className="label-text-alt text-base-content/30">optional</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className={`input input-bordered w-full pl-9 ${errors.photo ? "input-error" : ""}`}
                    {...register("photo", {
                      pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                        message: "Must be a valid image URL (.jpg, .png, etc.)",
                      },
                    })}
                  
                  />
                </div>
                {errors.photo ? (
                  <p className="text-error text-xs flex items-center gap-1">
                    <span>⚠</span> {errors.photo.message}
                  </p>
                ) : (
                  <p className="text-base-content/30 text-xs">Paste a direct image link to see a preview above</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control gap-1">
                <label className="label pb-1">
                  <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/50">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className={`input input-bordered w-full pl-9 pr-10 ${errors.password ? "input-error" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Must be at least 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-error text-xs flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="divider text-xs text-base-content/30 my-0">OR</div>

            <p className="text-center text-sm text-base-content/60">
              Already have an account?{" "}
              <Link href="/login" className="link link-primary font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-base-content/30 mt-6">
          By registering, you agree to our{" "}
          <Link href="/terms" className="link">Terms</Link>{" "}
          &amp;{" "}
          <Link href="/privacy" className="link">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;