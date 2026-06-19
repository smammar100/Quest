'use client';

import React, { useState } from 'react';

export default function AgentWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      building: (form.elements.namedItem('building') as HTMLTextAreaElement).value,
      tasks: (form.elements.namedItem('tasks') as HTMLTextAreaElement).value,
      volume: (form.elements.namedItem('volume') as HTMLSelectElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="agents-form-success">
        <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
        <h3>You&apos;re on the list.</h3>
        <p>We&apos;ll reach out as soon as developer access opens up.</p>
      </div>
    );
  }

  return (
    <form className="agents-form" onSubmit={handleSubmit} noValidate>
      <div className="agents-form__row">
        <label className="agents-form__field">
          <span className="agents-form__label">Name</span>
          <input className="agents-form__input" type="text" name="name" required placeholder="Your name" />
        </label>
        <label className="agents-form__field">
          <span className="agents-form__label">Company <span className="agents-form__optional">(optional)</span></span>
          <input className="agents-form__input" type="text" name="company" placeholder="Your company" />
        </label>
      </div>

      <label className="agents-form__field">
        <span className="agents-form__label">Email</span>
        <input className="agents-form__input" type="email" name="email" required placeholder="you@company.com" />
      </label>

      <label className="agents-form__field">
        <span className="agents-form__label">What are you building?</span>
        <textarea
          className="agents-form__input agents-form__textarea"
          name="building"
          required
          placeholder="Describe your agent or product…"
          rows={3}
        />
      </label>

      <label className="agents-form__field">
        <span className="agents-form__label">What real-world tasks do your agents need?</span>
        <textarea
          className="agents-form__input agents-form__textarea"
          name="tasks"
          required
          placeholder="e.g. shelf photos, field surveys, on-site checks…"
          rows={3}
        />
      </label>

      <div className="agents-form__row">
        <label className="agents-form__field">
          <span className="agents-form__label">Expected volume</span>
          <select className="agents-form__input agents-form__select" name="volume" required defaultValue="">
            <option value="" disabled>Select range</option>
            <option value="under-100">Under 100 tasks / month</option>
            <option value="100-1000">100 – 1,000 tasks / month</option>
            <option value="1000-10000">1,000 – 10,000 tasks / month</option>
            <option value="over-10000">10,000+ tasks / month</option>
          </select>
        </label>
        <label className="agents-form__field">
          <span className="agents-form__label">Estimated budget</span>
          <select className="agents-form__input agents-form__select" name="budget" required defaultValue="">
            <option value="" disabled>Select range</option>
            <option value="under-1k">Under $1,000 / month</option>
            <option value="1k-5k">$1,000 – $5,000 / month</option>
            <option value="5k-20k">$5,000 – $20,000 / month</option>
            <option value="over-20k">$20,000+ / month</option>
          </select>
        </label>
      </div>

      <label className="agents-form__field">
        <span className="agents-form__label">Country / Market</span>
        <input className="agents-form__input" type="text" name="country" required placeholder="e.g. United States" />
      </label>

      {error ? <p className="agents-form__error">{error}</p> : null}
      <button type="submit" className="agents-form__submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Request access'}
      </button>
    </form>
  );
}
