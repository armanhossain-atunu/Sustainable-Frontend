"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    venue: "",
    organizer: "",
    organizerContact: "",
    image: "",
    gallery: [] as string[],
    category: "",
    price: 0,
    discountPrice: 0,
    isFree: false,
    capacity: 0,
    status: "upcoming" as "upcoming" | "ongoing" | "completed" | "cancelled",
    tags: [] as string[],
    isFeatured: false,
    registrationDeadline: "",
    ticketTypes: [] as Array<{ name: string; price: number; quantity: number }>,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Slug Generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      // 👉 Auto slug from title
      if (name === "title") {
        return {
          ...prev,
          title: value,
          slug: generateSlug(value),
        };
      }

      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  // ✅ Checkbox
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");

        // Reset
        setFormData({
          title: "",
          slug: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          venue: "",
          organizer: "",
          organizerContact: "",
          image: "",
          gallery: [],
          category: "",
          price: 0,
          discountPrice: 0,
          isFree: false,
          capacity: 0,
          status: "upcoming",
          tags: [],
          isFeatured: false,
          registrationDeadline: "",
          ticketTypes: [],
        });
      } else {
        alert("❌ " + (result.message || "Failed to add product"));
      }
    } catch (error) {
      alert("❌ Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-base-200 shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              readOnly
              className="w-full p-4 border rounded-xl "
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 border bg-base-200 rounded-xl"
          >
            <option value="">Select category</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Meetup">Meetup</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 font-medium">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-5 rounded-2xl transition disabled:opacity-70"
        >
          {loading ? "Adding Product..." : "✅ Add Product"}
        </button>
      </form>
    </div>
  );
}