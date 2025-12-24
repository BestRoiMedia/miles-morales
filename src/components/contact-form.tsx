"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      eventType: String(formData.get("eventType") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Failed to send message";
        try {
          const text = await res.text();
          if (text) {
            try {
              const json = JSON.parse(text);
              errorMessage = json.error || errorMessage;
            } catch {
              errorMessage = text;
            }
          }
        } catch {
          // Use default error message
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input 
        name="name" 
        required 
        placeholder="Name" 
        className="form-input w-full" 
      />
      <input 
        name="email" 
        type="email" 
        required 
        placeholder="Email" 
        className="form-input w-full" 
      />
      <input 
        name="phone" 
        placeholder="Phone" 
        className="form-input w-full" 
      />
      <input 
        name="eventType" 
        placeholder="Event Type" 
        className="form-input w-full" 
      />
      <textarea 
        name="message" 
        required 
        placeholder="Tell me about your event" 
        className="form-input w-full min-h-[120px] resize-none" 
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FF2436] hover:bg-[#ff4d5c] text-white py-3 px-6 rounded-lg font-display text-xl uppercase tracking-wider transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>

      {error && (
        <div className="p-4 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-lg text-[#FF2436] text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
          Message sent successfully.
        </div>
      )}
    </form>
  );
}

