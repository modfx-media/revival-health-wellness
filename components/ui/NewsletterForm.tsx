"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

/**
 * Newsletter signup form. Wire `onSubscribe` (or the inline handler) to your
 * email provider / route handler when the backend is ready.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // TODO: POST to your newsletter route handler / provider.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="inline-flex items-center gap-2 text-revival-gold">
        <Check className="h-5 w-5" /> Thanks for subscribing!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label className="relative flex-1">
        <span className="sr-only">Email address</span>
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-revival-charcoal/50" />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="h-12 w-full rounded-full border border-revival-gold/30 bg-revival-cream pl-12 pr-4 text-revival-dark outline-none focus:border-revival-gold focus:ring-2 focus:ring-revival-gold/40"
        />
      </label>
      <button
        type="submit"
        className="h-12 rounded-full bg-revival-gold px-6 font-medium text-revival-dark transition-colors hover:bg-revival-gold-light"
      >
        Subscribe
      </button>
    </form>
  );
}
