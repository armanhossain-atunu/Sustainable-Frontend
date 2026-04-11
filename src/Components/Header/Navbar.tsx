'use client';
import React from "react";
import Logo from "../Shear/Logo";
import { ShoppingCart, UserPlus } from "lucide-react";
import Link from "next/link";
import SearchBar from "../Shear/SearchBar";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log("User session data:", session);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navItems = [
    { name: "Laptop", href: "/laptop" },
    { name: "Mobile", href: "/mobile" },
    { name: "Accessories", href: "/accessories" },
    // { name: "Cart", href: "/cart" },
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
          <Link href="/cart" className="relative btn btn-ghost btn-square" aria-label="View cart">
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
              {/* {user.image && (
                <img src={user.image} alt={user.name || ""} className="w-8 h-8 rounded-full object-cover" />
              )}
              <span className="font-medium">{user.name}</span>
              <button onClick={() => signOut()} className="btn btn-ghost btn-xs">Logout</button> */}
              <div className="navbar ">
 
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
      <button onClick={() => signOut()} className="btn btn-ghost btn-xs">Logout</button>
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
