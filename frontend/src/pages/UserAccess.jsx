import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'

const UserAccess = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const t = useTranslation()

  const [activeTab, setActiveTab] = useState('login')
  const [authMethod, setAuthMethod] = useState('phone')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  // Signup fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')

  const handleSendOtp = (e) => {
    e.preventDefault()
    // Simulate OTP send
    setOtpSent(true)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    // Simulate OTP verification
    updateBooking({
      isAuthenticated: true,
      otpVerified: true,
      visitors: {
        ...booking.visitors,
        phone: phoneOrEmail,
      },
    })
    const nextPath = booking.pendingPath || '/details'
    navigate(nextPath)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    // Simulate signup
    updateBooking({
      isAuthenticated: true,
      otpVerified: true,
      visitors: {
        ...booking.visitors,
        name: `${firstName} ${lastName}`,
        phone: contact,
      },
    })
    const nextPath = booking.pendingPath || '/details'
    navigate(nextPath)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="glass-panel space-y-4">
        <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
          {t('auth.heading')}
        </p>
        <h2 className="section-heading">{t('auth.title')}</h2>
        <p className="text-brand-dusk/70">{t('auth.subtitle')}</p>
      </section>

      <div className="glass-panel">
        <div className="mb-6 flex gap-4 border-b border-brand-dusk/10">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 text-sm font-semibold transition ${
              activeTab === 'login'
                ? 'border-b-2 border-brand-saffron text-brand-saffron'
                : 'text-brand-dusk/60 hover:text-brand-dusk'
            }`}
          >
            {t('auth.loginTab')}
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`pb-3 text-sm font-semibold transition ${
              activeTab === 'signup'
                ? 'border-b-2 border-brand-saffron text-brand-saffron'
                : 'text-brand-dusk/60 hover:text-brand-dusk'
            }`}
          >
            {t('auth.signupTab')}
          </button>
        </div>

        {activeTab === 'login' ? (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  authMethod === 'phone'
                    ? 'border-brand-saffron bg-brand-sand/60 text-brand-dusk'
                    : 'border-brand-dusk/15 text-brand-dusk/60 hover:border-brand-saffron'
                }`}
              >
                {t('auth.method.phone')}
              </button>
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  authMethod === 'email'
                    ? 'border-brand-saffron bg-brand-sand/60 text-brand-dusk'
                    : 'border-brand-dusk/15 text-brand-dusk/60 hover:border-brand-saffron'
                }`}
              >
                {t('auth.method.email')}
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
                  {authMethod === 'phone' ? 'Phone number' : 'Email address'}
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    required
                    placeholder={authMethod === 'phone' ? '9876543210' : 'you@example.com'}
                    className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-dusk px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-saffron"
                >
                  {t('auth.sendOtp')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="rounded-2xl bg-brand-sand/60 p-4 text-sm text-brand-dusk/70">
                  OTP sent to {phoneOrEmail}
                </div>
                <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
                  {t('auth.otpLabel')}
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                    placeholder="123456"
                    className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 text-center text-2xl tracking-widest focus:border-brand-saffron focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-dusk px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-saffron"
                >
                  {t('auth.verify')}
                </button>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-sm text-brand-dusk/60 hover:text-brand-saffron"
                >
                  Change number
                </button>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
                {t('auth.signup.first')} *
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
                {t('auth.signup.last')} *
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              {t('auth.signup.contact')} *
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              {t('auth.signup.email')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-brand-dusk px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-saffron"
            >
              {t('auth.signup.cta')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserAccess
