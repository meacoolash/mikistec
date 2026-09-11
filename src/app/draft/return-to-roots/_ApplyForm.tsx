"use client";

import { useContactForm, Honeypot } from "@/lib/use-contact-form";

/** `demo` stamps the form and blocks submitting, so the preview can't send real enquiries. */
export function ApplyForm({ demo = false }: { demo?: boolean }) {
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
      <form
        className={demo ? "r2-form is-demo" : "r2-form"}
        onSubmit={demo ? (e) => e.preventDefault() : state.handleSubmit}
      >
        {demo && (
          <div className="r2-stamp" aria-hidden>
            <span>Demo</span>
          </div>
        )}
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
          disabled={demo || state.submitting}
          title={demo ? "This is a demo — the form is switched off" : undefined}
          style={{ justifySelf: "start", marginTop: 8, opacity: demo || state.submitting ? 0.5 : 1 }}
        >
          Join <span aria-hidden>→</span>
        </button>
        {demo && <p className="r2-note">Demo — this form doesn&apos;t send anything.</p>}
        {state.error && (
          <p role="alert" className="r2-p">
            {state.error}
          </p>
        )}
      </form>
    </>
  );
}
