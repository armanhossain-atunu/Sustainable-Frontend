"use client";
import React from "react";
import Logo from "../Shear/Logo";
import { LayoutDashboard, PackagePlus, ShoppingCart, UserPlus } from "lucide-react";
import Link from "next/link";
import SearchBar from "../Shear/SearchBar";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const dashboardHref = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
  const navItems = [
    { name: "Laptop", href: "/laptop" },
    { name: "Desktop", href: "/desktop" },
    { name: "Accessories", href: "/accessories" },
  ];
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <SearchBar></SearchBar>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.name}</NavLink>
                </li>
              ))}
              {user?.role === "admin" ? (
                <li>
                  <NavLink href="/addProduct">Add Product</NavLink>
                </li>
              ) : null}
            </ul>
          </div>

          {/* LOGO */}

          <Logo />
        </div>

        {/* CENTER MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.name}</NavLink>
              </li>
            ))}
            {user?.role === "admin" ? (
              <li>
                <NavLink href="/addProduct">Add Product</NavLink>
              </li>
            ) : null}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end gap-2">
          {/* SEARCH */}
          <div className="hidden md:block">
            <SearchBar></SearchBar>
          </div>

          {/* THEME TOGGLE */}
          <ThemeToggle />

          {/* CART */}
          <Link
            href="/cart"
            className="relative btn btn-ghost btn-square"
            aria-label="View cart"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* USER INFO OR LOGIN BUTTON */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="navbar">
                <div className="flex gap-2">
                  <Link href={dashboardHref} className="btn btn-ghost btn-circle" aria-label="Open dashboard">
                    <LayoutDashboard size={18} />
                  </Link>
                  {user.role === "admin" ? (
                    <Link href="/addProduct" className="btn btn-ghost btn-circle" aria-label="Add product">
                      <PackagePlus size={18} />
                    </Link>
                  ) : null}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <Image src={user.image || "/default-avatar.png"} alt={user.name || "User Avatar"} width={40} height={40} className="rounded-full object-cover" />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <span className="font-semibold">{user.name}</span>
                      </li>
                      <li>
                        <span className="text-xs opacity-70">{user.email}</span>
                      </li>
                      <li>
                        <Link href={dashboardHref}>Dashboard</Link>
                      </li>
                      {user.role === "admin" ? (
                        <li>
                          <Link href="/addProduct">Add Product</Link>
                        </li>
                      ) : null}
                      <li>
                        <span className="capitalize">Role: {user.role}</span>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: "/login" })}
                          className="text-left"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tooltip tooltip-left" data-tip="Please Login">
              <Link href="/login" className="btn">
                <UserPlus size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
