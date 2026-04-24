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
    "w-full px-4 py-3 text-sm text-white bg-[rgb(14,14,16)] border border-[rgba(255,255,255,0.08)] rounded-xl outline-none focus:border-accent-orange/50 transition-colors placeholder:text-[rgba(255,255,255,0.3)]";

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-semibold text-white tracking-wide">
        Subscribe
      </h4>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[rgba(232,86,0,0.25)] bg-[rgba(232,86,0,0.08)] px-4 py-4 text-sm text-white"
        >
          <span className="text-accent-orange mr-2">&#10003;</span>
          You&apos;re in. The next Orchestra drops Tuesday.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-1 px-6 py-3 text-sm font-medium text-white rounded-xl uppercase tracking-wider transition-all"
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid #E85600",
              color: "#E85600",
            }}
          >
            Join
          </motion.button>
        </form>
      )}
    </div>
  );
}
