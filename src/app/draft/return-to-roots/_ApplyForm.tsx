"use client";

import { useState } from "react";

/**
 * Draft only — nothing is sent anywhere. The submit just swaps in the
 * confirmation copy so the flow can be seen end to end.
 */
export function ApplyForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <>
        <h2 className="r2-h-sm">Your place is noted.</h2>
        <p className="r2-p">We write back within a day or two, with everything.</p>
      </>
    );
  }

  return (
    <>
      <p className="r2-eye">One last thing</p>
      <h2 className="r2-h">Come home to yourself.</h2>
      <form
        className="r2-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div>
          <label htmlFor="r2-name">Name</label>
          <input id="r2-name" name="name" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="r2-email">Email</label>
          <input
            id="r2-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="r2-why">What brings you here?</label>
          <textarea id="r2-why" name="why" placeholder="One line is enough." />
        </div>
        <button className="r2-btn" type="submit" style={{ justifySelf: "start", marginTop: 8 }}>
          Join <span aria-hidden>→</span>
        </button>
      </form>
    </>
  );
}
