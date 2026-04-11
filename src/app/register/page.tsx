import React from "react";
import Register from "@/Components/Auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Sustainable Tech Solutions",
  description: "Create a new account on Sustainable Tech Solutions.",
};

const RegisterPage = () => {
  return (
    <div className="py-10">
      <Register />
    </div>
  );
};

export default RegisterPage;
