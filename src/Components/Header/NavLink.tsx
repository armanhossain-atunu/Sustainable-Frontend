
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '', activeClassName = 'text-[#3c82be] text-md bg-slate-100 font-bold' }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={
                `${className} ${isActive ? activeClassName : ''}`.trim()
            }
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
};

export default NavLink;