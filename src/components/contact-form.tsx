'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  budgetRange: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  eventLocation: '',
  guestCount: '',
  budgetRange: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'validation-error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('validation-error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mwpgbdbl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          eventLocation: formData.eventLocation,
          guestCount: formData.guestCount,
          budgetRange: formData.budgetRange,
          message: formData.message,
          _subject: `New Booking Inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialFormData);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
            Name <span className="text-[#FF2436]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input w-full"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
            Email <span className="text-[#FF2436]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input w-full"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Phone & Event Type Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input w-full"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-zinc-300 mb-2">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="private-party">Private Party</option>
            <option value="club-event">Club / Nightlife</option>
            <option value="fashion-show">Fashion Show</option>
            <option value="red-carpet">Red Carpet / Premiere</option>
            <option value="birthday">Birthday Party</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Event Date & Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-zinc-300 mb-2">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>
        <div>
          <label htmlFor="eventLocation" className="block text-sm font-medium text-zinc-300 mb-2">
            Event Location
          </label>
          <input
            type="text"
            id="eventLocation"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            className="form-input w-full"
            placeholder="City, State"
          />
        </div>
      </div>

      {/* Guest Count & Budget Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-zinc-300 mb-2">
            Estimated Guest Count
          </label>
          <input
            type="text"
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="form-input w-full"
            placeholder="e.g., 150"
          />
        </div>
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-zinc-300 mb-2">
            Budget Range
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">Select budget range</option>
            <option value="under-1000">Under $1,000</option>
            <option value="1000-2500">$1,000 - $2,500</option>
            <option value="2500-5000">$2,500 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-plus">$10,000+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
          Message Details <span className="text-[#FF2436]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-input w-full resize-none"
          placeholder="Tell me about your event, your vision, and any special requests..."
        />
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
          <strong>Message sent!</strong> Thank you for reaching out. I&apos;ll get back to you within 24-48 hours.
        </div>
      )}

      {submitStatus === 'validation-error' && (
        <div className="p-4 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-lg text-[#FF2436] text-sm">
          <strong>Please fill in all required fields.</strong> Name, email, and message are required.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-lg text-[#FF2436] text-sm">
          <strong>Something went wrong.</strong> Please try again or email directly.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-4 px-6 rounded-lg font-display text-xl uppercase tracking-wider
          transition-all duration-200
          ${isSubmitting 
            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
            : 'bg-[#FF2436] hover:bg-[#ff4d5c] text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30'
          }
        `}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-zinc-500 text-xs text-center">
        Fields marked with <span className="text-[#FF2436]">*</span> are required.
      </p>
    </form>
  );
}

