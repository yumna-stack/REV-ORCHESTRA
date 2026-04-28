"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BlogSubscribe() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const inputClass =
    "premium-input w-full px-4 py-3 text-sm text-white bg-black border border-[rgba(255,255,255,0.12)] rounded-[14px] outline-none focus:border-[rgba(255,255,255,0.3)] focus:ring-1 focus:ring-[rgba(255,255,255,0.1)] transition-all placeholder:text-[rgba(255,255,255,0.3)]";

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[13px] font-bold text-white tracking-[0.1em] uppercase">
        Subscribe
      </h4>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[#050505] px-5 py-4 text-[14px] text-[rgba(255,255,255,0.8)]"
        >
          <span className="text-white font-bold mr-2">&#10003;</span>
          You&apos;re in. The next Orchestra drops Tuesday.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className={inputClass}
            suppressHydrationWarning
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className={inputClass}
            suppressHydrationWarning
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            className={inputClass}
            suppressHydrationWarning
          />
          <input
            type="text"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            placeholder="How did you hear about Rev Orchestra?"
            className={inputClass}
            suppressHydrationWarning
          />
          <motion.button
            type="submit"
            suppressHydrationWarning
            className="mt-2 w-full py-3.5 text-sm btn-primary"
          >
            Join
          </motion.button>
        </form>
      )}
    </div>
  );
}
