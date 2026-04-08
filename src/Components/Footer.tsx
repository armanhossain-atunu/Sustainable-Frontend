import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Leaf } from 'lucide-react';

// Inline SVG social icons (lucide-react dropped brand icons)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <text x="2" y="18" fontSize="13" fontWeight="bold" fill="currentColor">𝕏</text>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Laptop', href: '/laptop' },
    { name: 'Mobile', href: '/mobile' },
    { name: 'Accessories', href: '/accessories' },
  ];

  const supportLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
    { icon: <YoutubeIcon />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-base-200 border-t border-base-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/sustainable_tech_solution.png"
                alt="Sustainable Tech Solutions Logo"
                width={160}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Providing eco-friendly technology solutions for a greener, smarter future. Every purchase supports a sustainable planet.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mt-1">
              <Leaf size={16} />
              <span>100% Eco-Conscious</span>
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="btn btn-sm btn-ghost btn-circle border border-base-300 hover:btn-primary transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-base mb-4 uppercase tracking-wide">Support</h3>
            <ul className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-base mb-0 uppercase tracking-wide">Stay Connected</h3>

            {/* Contact Info */}
            <ul className="flex flex-col gap-2 text-sm text-base-content/70">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary shrink-0" />
                <span>support@sustainabletech.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-2">
              <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered input-sm flex-1"
                />
                <button className="btn btn-primary btn-sm">Subscribe</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/60">
          <p>© {currentYear} Sustainable Tech Solutions. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> for a greener Earth
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;