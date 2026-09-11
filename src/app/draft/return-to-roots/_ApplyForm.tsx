"use client";

import { useContactForm, Honeypot } from "@/lib/use-contact-form";

export function ApplyForm() {
  const state = useContactForm("return-to-roots");

  if (state.succeeded) {
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
      <form className="r2-form" onSubmit={state.handleSubmit}>
        <Honeypot />
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
          <textarea id="r2-why" name="message" placeholder="One line is enough." />
        </div>
        <button
          className="r2-btn"
          type="submit"
          disabled={state.submitting}
          style={{ justifySelf: "start", marginTop: 8, opacity: state.submitting ? 0.5 : 1 }}
        >
          Join <span aria-hidden>→</span>
        </button>
        {state.error && (
          <p role="alert" className="r2-p">
            {state.error}
          </p>
        )}
      </form>
    </>
  );
}
