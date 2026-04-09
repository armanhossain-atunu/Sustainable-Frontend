import React from "react";
import Logo from "../Shear/Logo";
import { ShoppingCart, UserPlus } from "lucide-react";
import Link from "next/link";
import SearchBar from "../Shear/SearchBar";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
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
          <Link href="/">
            <Logo />
          </Link>
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
          <Link href="/cart" className="btn btn-ghost btn-square" aria-label="View cart">
            <ShoppingCart size={18} />
          </Link>

          {/* BUTTON */}
          <div className="tooltip tooltip-left" data-tip="Please Login">
            <button className="btn">
              <UserPlus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
