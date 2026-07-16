"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/constants";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="lets-connect" className="py-20 lg:py-24 bg-tint-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Get in Touch</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Type your message here"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3.5 rounded-full text-white font-semibold bg-brand hover:bg-brand-dark transition-colors disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit Message"}
            </button>
          </form>
        </div>

        <div
          className="rounded-2xl h-full min-h-[22rem] flex flex-col justify-end p-8 text-white"
          style={{ background: "linear-gradient(135deg,#2B1B4E,#D6266B)" }}
        >
          <p className="font-semibold text-lg mb-1">Contact us</p>
          <p className="text-white/85 text-sm">{companyInfo.email}</p>
          <p className="text-white/85 text-sm">{companyInfo.phone}</p>
        </div>
      </div>
    </section>
  );
}
