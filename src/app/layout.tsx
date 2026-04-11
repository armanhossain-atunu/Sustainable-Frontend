import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sustainable Tech Solutions",
  description: "A company dedicated to providing eco-friendly technology solutions for a sustainable future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-base-100 text-base-content">
        <CartProvider>
          <AuthProvider>
            <header className="sticky top-0 z-50">
              <Navbar />
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
