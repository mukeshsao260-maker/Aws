import React, { useState, useEffect } from 'react';
import {
  RegistrationPayload,
  ValidationErrors,
  validateField,
  validateAll,
  getRemainingSeats,
  submitRegistrationToGoogleSheets
} from '../lib/registration';
import { INTEREST_OPTIONS } from '../lib/data';
import { Check, AlertCircle, Loader2, Send, Laptop, IdCard, Mail } from 'lucide-react';

interface RegistrationProps {
  onShowToast: (message: string, isError?: boolean) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<RegistrationPayload>({
    name: '',
    email: '',
    college: '',
    interest: '',
    consent: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [remainingSeats, setRemainingSeats] = useState<number>(100);

  useEffect(() => {
    setRemainingSeats(getRemainingSeats());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));

    if (touched[name]) {
      const error = validateField(name as keyof RegistrationPayload, val);
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (field: keyof RegistrationPayload) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      college: true,
      interest: true,
      consent: true
    });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.consent) {
        onShowToast("Please accept the demo event update consent.", true);
      } else {
        onShowToast("Please fix the highlighted fields.", true);
      }
      setSubmissionStatus({
        type: 'error',
        message: 'Please review and fix the highlighted fields below.'
      });
      return;
    }

    // Protection against rapid multiple clicks
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });

    try {
      const result = await submitRegistrationToGoogleSheets(formData);

      if (result.success) {
        setSubmissionStatus({
          type: 'success',
          message: `✓ Thanks ${formData.name.trim()}! Your demo registration is confirmed.`
        });
        onShowToast("Registration confirmed successfully.", false);
        setRemainingSeats(getRemainingSeats());

        // Reset form inputs
        setFormData({
          name: '',
          email: '',
          college: '',
          interest: '',
          consent: false
        });
        setTouched({});
        setErrors({});
      } else {
        setSubmissionStatus({
          type: 'error',
          message: result.message
        });
        onShowToast(result.message, true);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmissionStatus({
        type: 'error',
        message: 'An unexpected transmission error occurred. Please try again.'
      });
      onShowToast("An unexpected error occurred.", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="register"
      style={{
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Metadata Header */}
        <div className="section-meta-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="section-num">[ 04 ]</span>
            <span>// REGISTRATION PORTAL</span>
          </div>
          <div>ENDPOINT: GOOGLE_APPS_SCRIPT // METHOD: POST</div>
        </div>

        {/* Form Container Grid */}
        <div
          className="registration-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Context, Guidelines & Live Seat Counter */}
          <div>
            <h2
              className="section-heading-title"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
              }}
            >
              SAVE YOUR{' '}
              <span style={{ color: 'var(--accent-toxic)', textDecoration: 'underline' }}>
                SEAT.
              </span>
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                marginBottom: '2rem'
              }}
            >
              Registration is free for students. Submit the form to see an instant confirmation in this front-end demo.
            </p>

            {/* Checklist items */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '2.5rem',
                borderLeft: '2px solid var(--border-strong)',
                paddingLeft: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                <Laptop size={16} style={{ color: 'var(--accent-toxic)' }} />
                <span>Bring your laptop + charger</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                <Mail size={16} style={{ color: 'var(--accent-toxic)' }} />
                <span>Use an active email address</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                <IdCard size={16} style={{ color: 'var(--accent-toxic)' }} />
                <span>Carry your college ID</span>
              </div>
            </div>

            {/* Live Seat Status Box */}
            <div
              style={{
                border: '1px solid var(--border-strong)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="live-pulse"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-toxic)',
                    display: 'inline-block'
                  }}
                />
                <span style={{ fontSize: '0.8125rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Demo seats available:
                </span>
              </div>

              <div
                id="seatCount"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: 'var(--accent-toxic)'
                }}
              >
                {remainingSeats}
              </div>
            </div>
          </div>

          {/* Right Column: Controlled Disorder Registration Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-strong)',
              boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.65)',
              padding: 'clamp(1.5rem, 3.5vw, 2.75rem)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.25rem',
                marginBottom: '1.75rem',
                borderBottom: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>FORM_ID: AWS_REG_2026</span>
              <span className="zine-tag zine-tag-toxic">LIVE VERIFICATION</span>
            </div>

            <form id="registrationForm" onSubmit={handleSubmit} noValidate>
              {/* Field: Full Name */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: errors.name ? 'var(--accent-red)' : 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Full name <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Mukesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: errors.name ? '1px solid var(--accent-red)' : '1px solid var(--border-strong)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    style={{
                      color: 'var(--accent-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Field: Email */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: errors.email ? 'var(--accent-red)' : 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Email address <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: errors.email ? '1px solid var(--accent-red)' : '1px solid var(--border-strong)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    style={{
                      color: 'var(--accent-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Field: College */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="college"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: errors.college ? 'var(--accent-red)' : 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  College / University <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                </label>

                <input
                  id="college"
                  name="college"
                  type="text"
                  autoComplete="organization"
                  placeholder="Rungta University"
                  value={formData.college}
                  onChange={handleChange}
                  onBlur={() => handleBlur('college')}
                  aria-invalid={Boolean(errors.college)}
                  aria-describedby={errors.college ? 'college-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: errors.college ? '1px solid var(--accent-red)' : '1px solid var(--border-strong)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                />
                {errors.college && (
                  <p
                    id="college-error"
                    style={{
                      color: 'var(--accent-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <AlertCircle size={11} /> {errors.college}
                  </p>
                )}
              </div>

              {/* Field: Area of Interest */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  htmlFor="interest"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: errors.interest ? 'var(--accent-red)' : 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Area of interest <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                </label>

                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  onBlur={() => handleBlur('interest')}
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={errors.interest ? 'interest-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: errors.interest ? '1px solid var(--accent-red)' : '1px solid var(--border-strong)',
                    color: formData.interest ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select one</option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.interest && (
                  <p
                    id="interest-error"
                    style={{
                      color: 'var(--accent-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <AlertCircle size={11} /> {errors.interest}
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={() => handleBlur('consent')}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '3px',
                      accentColor: 'var(--accent-toxic)',
                      cursor: 'pointer'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: errors.consent ? 'var(--accent-red)' : 'var(--text-primary)',
                      lineHeight: 1.45
                    }}
                  >
                    I agree to receive event updates for this fictional demo.
                  </span>
                </label>
                {errors.consent && (
                  <p
                    style={{
                      color: 'var(--accent-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                      marginLeft: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <AlertCircle size={11} /> {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-noise-primary"
                style={{
                  width: '100%',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                data-cursor="SUBMIT"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="cursor-blink" />
                    <span>TRANSMITTING REGISTRATION...</span>
                  </>
                ) : (
                  <>
                    <span>COMPLETE REGISTRATION</span>
                    <Send size={15} />
                  </>
                )}
              </button>

              {/* Submission Result Feedback */}
              {submissionStatus.message && (
                <div
                  id="formMessage"
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.875rem 1rem',
                    border: '1px solid',
                    borderColor: submissionStatus.type === 'success' ? 'var(--accent-toxic)' : 'var(--accent-red)',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: submissionStatus.type === 'success' ? 'var(--accent-toxic)' : 'var(--accent-red)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {submissionStatus.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                  <span>{submissionStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
