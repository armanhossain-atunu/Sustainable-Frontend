"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { User, Mail, Phone, MapPin, Wrench } from "lucide-react";

type ProductServiceRequestFormProps = {
  productName: string;
  modelNumber?: string;
};

type ServiceRequestFormValues = {
  userName: string;
  email: string;
  productName: string;
  modelNumber: string;
  problemDescription: string;
  phoneNumber: string;
  location: string;
};

export default function ProductServiceRequestForm({
  productName,
  modelNumber,
}: ProductServiceRequestFormProps) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestFormValues>({
    defaultValues: {
      userName: user?.name ?? "",
      email: user?.email ?? "",
      productName,
      modelNumber: modelNumber ?? "",
      problemDescription: "",
      phoneNumber: "",
      location: "",
    },
  });

  useEffect(() => {
    reset({
      userName: user?.name ?? "",
      email: user?.email ?? "",
      productName,
      modelNumber: modelNumber ?? "",
      problemDescription: "",
      phoneNumber: "",
      location: "",
    });
  }, [user?.name, user?.email, productName, modelNumber, reset]);

  const onSubmit = async (data: ServiceRequestFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(data);
    toast.success("Request ready! API integration next.");
    reset();
  };

  return (
    <section className="mt-12 max-w-4xl mx-auto rounded-2xl bg-base-300 shadow-lg border p-6 sm:p-10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="w-6 h-6 text-primary" />
          Product Service Request
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Need help? Fill out the form and our support team will assist you.
        </p>

        {status !== "authenticated" && (
          <p className="text-sm mt-2">
            <Link href="/login" className="text-primary font-semibold underline">
              Login
            </Link>{" "}
            to auto-fill your info
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">

        {/* Name */}
        <div>
          <label className="text-sm font-medium">User Name</label>
          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-primary">
            <User className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              {...register("userName", { required: true })}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-primary">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              type="email"
              className="w-full p-2 outline-none"
              {...register("email", { required: true })}
            />
          </div>
        </div>

        {/* Product */}
        <div>
          <label className="text-sm font-medium">Product Name</label>
          <input
            className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-primary"
            {...register("productName", { required: true })}
          />
        </div>

        {/* Model */}
        <div>
          <label className="text-sm font-medium">Model Number</label>
          <input
            className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-primary"
            {...register("modelNumber", { required: true })}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-primary">
            <Phone className="w-4 h-4 text-gray-400" />
            <input
              type="tel"
              className="w-full p-2 outline-none"
              {...register("phoneNumber", { required: true })}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium">Location</label>
          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-primary">
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              {...register("location", { required: true })}
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Problem Description</label>
          <textarea
            rows={5}
            className="textarea textarea-bordered w-full mt-1 focus:ring-2 focus:ring-primary"
            placeholder="Explain your issue..."
            {...register("problemDescription", { required: true })}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </section>
  );
}