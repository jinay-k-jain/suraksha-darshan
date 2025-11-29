import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'

const UserAccess = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const t = useTranslation()

  const [showSignup, setShowSignup] = useState(false)
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
      <section className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange bg-brand-orange/5 px-3 py-1">
          <span className="text-sm">🔐</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            {t('auth.heading')}
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-black md:text-3xl">{t('auth.title')}</h2>
        <p className="mt-2 text-gray-600">{t('auth.subtitle')}</p>
      </section>

      <div className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        {!showSignup ? (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-black">Login to Your Account</h3>
              <p className="mt-1 text-sm text-gray-600">Enter your credentials to continue</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                  authMethod === 'phone'
                    ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                    : 'border-gray-300 text-gray-600 hover:border-brand-orange'
                }`}
              >
                {t('auth.method.phone')}
              </button>
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                  authMethod === 'email'
                    ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                    : 'border-gray-300 text-gray-600 hover:border-brand-orange'
                }`}
              >
                {t('auth.method.email')}
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <label className="flex flex-col text-sm font-medium text-black">
                  {authMethod === 'phone' ? 'Phone number' : 'Email address'}
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    required
                    placeholder={authMethod === 'phone' ? '9876543210' : 'you@example.com'}
                    className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-orange-dark"
                >
                  {t('auth.sendOtp')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  OTP sent to {phoneOrEmail}
                </div>
                <label className="flex flex-col text-sm font-medium text-black">
                  {t('auth.otpLabel')}
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                    placeholder="123456"
                    className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-center text-2xl tracking-widest transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-orange-dark"
                >
                  {t('auth.verify')}
                </button>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-sm text-gray-600 hover:text-brand-orange"
                >
                  Change number
                </button>
              </form>
            )}
            
            <div className="mt-6 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account already?{' '}
                <button
                  onClick={() => setShowSignup(true)}
                  className="font-semibold text-brand-orange hover:underline"
                >
                  Sign up first
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-black">Create New Account</h3>
              <p className="mt-1 text-sm text-gray-600">Sign up to continue with your booking</p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-black">
                  {t('auth.signup.first')} *
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-black">
                  {t('auth.signup.last')} *
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col text-sm font-medium text-black">
                {t('auth.signup.contact')} *
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                />
              </label>

              <label className="flex flex-col text-sm font-medium text-black">
                {t('auth.signup.email')}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition hover:border-brand-orange focus:border-brand-orange focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-orange-dark"
              >
                {t('auth.signup.cta')}
              </button>
            </form>
            
            <div className="mt-6 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setShowSignup(false)}
                  className="font-semibold text-brand-orange hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAccess
