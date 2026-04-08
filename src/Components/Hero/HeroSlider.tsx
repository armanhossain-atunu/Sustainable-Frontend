"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero-laptop.png",
    title: "Eco-Friendly Laptops",
    subtitle: "Sustainable power for your modern workspace.",
    buttonText: "Shop Laptops",
    href: "/laptop",
  },
  {
    id: 2,
    image: "/images/hero-mobile.png",
    title: "Next-Gen Smartphones",
    subtitle: "Connect with the world naturally.",
    buttonText: "Shop Mobiles",
    href: "/mobile",
  },
  {
    id: 3,
    image: "/images/hero-accessories.png",
    title: "Sustainable Accessories",
    subtitle: "Enhance your tech without harming the planet.",
    buttonText: "Shop Accessories",
    href: "/accessories",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-base-200">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl mb-8 opacity-90 drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="btn btn-primary btn-wide rounded-full text-lg shadow-lg"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 z-30 flex justify-between">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-sm md:btn-md bg-white/20 border-none hover:bg-white/40 text-white backdrop-blur-sm"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle btn-sm md:btn-md bg-white/20 border-none hover:bg-white/40 text-white backdrop-blur-sm"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-primary" : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
