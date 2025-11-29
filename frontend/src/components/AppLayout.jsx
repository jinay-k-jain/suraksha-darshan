import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'
import { languages, languageNames } from '../i18n/languages'

const navLinks = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
]

const AppLayout = ({ children }) => {
  const location = useLocation()
  const { booking, updateBooking, language, setLanguage } = useBooking()
  const [bookingsOpen, setBookingsOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedHistory, setSelectedHistory] = useState(
    booking.pastBookings[0] ?? null,
  )
  const t = useTranslation()

  useEffect(() => {
    setBookingsOpen(false)
    setLanguageOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    setSelectedHistory(booking.pastBookings[0] ?? null)
  }, [booking.pastBookings])

  const handleCancelCurrent = () => {
    if (!booking.currentBooking) return
    const cancelledRecord = {
      ...booking.currentBooking,
      status: 'Cancelled',
      cancelledOn: new Date().toISOString(),
    }
    updateBooking({
      currentBooking: null,
      pastBookings: [cancelledRecord, ...booking.pastBookings],
    })
  }

  const activeHistory = selectedHistory ?? booking.pastBookings[0]

  return (
    <div className="min-h-screen bg-brand-smoke">
      <header className="border-b border-brand-dusk/5 bg-white">
        <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-saffron text-lg font-bold text-brand-saffron">
              SD
            </div>
            <div>
              <p className="font-display text-lg text-brand-dusk">
                SurakshaDarshan
              </p>
              <p className="text-xs uppercase tracking-wide text-brand-slate/70">
                Temple Crowd Command
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-between md:flex">
            <nav className="flex items-center gap-8 text-sm font-semibold text-brand-slate">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.labelKey}
                    to={item.to}
                    className={`hover:text-brand-saffron ${
                      isActive ? 'text-brand-saffron' : ''
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                )
              })}
              {booking.temple && (
                <Link
                  to="/temple-map"
                  className={`flex items-center gap-1 hover:text-brand-saffron ${
                    location.pathname === '/temple-map' ? 'text-brand-saffron' : ''
                  }`}
                >
                  <span>🗺️</span>
                  Temple Map
                </Link>
              )}
            </nav>
            <div className="relative">
              <button
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-brand-dusk/20 px-4 py-2 text-sm font-semibold text-brand-slate hover:border-brand-saffron hover:text-brand-saffron"
              >
                {t('nav.language', 'Language')} · {languageNames[language]}
                <span aria-hidden>▾</span>
              </button>
              {languageOpen && (
                <div className="absolute right-0 z-30 mt-2 w-48 rounded-2xl border border-brand-dusk/10 bg-white p-2 text-sm shadow-xl">
                  {languages.map((entry) => (
                    <button
                      key={entry.code}
                      onClick={() => {
                        setLanguage(entry.code)
                        setLanguageOpen(false)
                      }}
                      className={`w-full rounded-xl px-3 py-2 text-left ${
                        language === entry.code
                          ? 'bg-brand-sand text-brand-dusk'
                          : 'text-brand-slate hover:bg-brand-smoke'
                      }`}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setBookingsOpen((prev) => !prev)}
              className="rounded-full border border-brand-dusk/20 px-4 py-2 text-sm font-semibold text-brand-slate hover:border-brand-saffron hover:text-brand-saffron"
            >
              {t('nav.myBookings', 'My bookings')}
            </button>
          </div>

          <button
            onClick={() => setBookingsOpen((prev) => !prev)}
            className="rounded-full border border-brand-dusk/20 px-4 py-2 text-sm font-semibold text-brand-slate hover:border-brand-saffron hover:text-brand-saffron md:hidden"
          >
            {t('nav.myBookings', 'My bookings')}
          </button>
          <button
            onClick={() => setLanguageOpen((prev) => !prev)}
            className="rounded-full border border-brand-dusk/20 px-4 py-2 text-sm font-semibold text-brand-slate hover:border-brand-saffron hover:text-brand-saffron md:hidden"
          >
            {t('nav.language', 'Language')} · {languageNames[language]}
          </button>

          {!booking.isAuthenticated ? (
            <Link
              to="/access"
              className="ml-auto rounded-full border border-brand-orange px-5 py-2 text-sm font-semibold text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              {t('nav.login', 'Login / Signup')}
            </Link>
          ) : (
            <Link
              to="/profile"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white font-bold hover:bg-brand-orange-dark"
              title="View Profile"
            >
              {booking.visitors.name ? booking.visitors.name.charAt(0).toUpperCase() : 'U'}
            </Link>
          )}

          {bookingsOpen && (
            <div className="absolute right-0 top-[72px] z-20 w-[420px] max-w-full rounded-3xl border border-brand-dusk/10 bg-white p-6 text-sm shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-brand-slate/70">
                  {t('nav.currentBooking', 'Current booking')}
                </p>
                <button
                  className="text-xs text-brand-slate/60"
                  onClick={() => setBookingsOpen(false)}
                >
                  {t('nav.close', 'Close')} ✕
                </button>
              </div>
              {booking.currentBooking ? (
                <div className="mt-3 space-y-2 rounded-2xl border border-brand-dusk/10 bg-brand-sand/70 p-4">
                  <p className="text-base font-semibold text-brand-dusk">
                    {booking.currentBooking.temple}
                  </p>
                  <p className="text-brand-slate/70">
                    {booking.currentBooking.date} · {booking.currentBooking.slot}
                  </p>
                  <p className="text-brand-slate/70">
                    {t('nav.parkingLabel', 'Parking')}: {booking.currentBooking.parking}
                  </p>
                  <p className="text-brand-slate/70">
                    {t('nav.devotee', 'Devotees')}: {booking.currentBooking.visitors.total} ·{' '}
                    {t('nav.groupSummary', 'Group')} · Elders{' '}
                    {booking.currentBooking.visitors.elders} · Differently abled{' '}
                    {booking.currentBooking.visitors.differentlyAbled}
                  </p>
                  <button
                    onClick={handleCancelCurrent}
                    className="mt-2 inline-flex items-center justify-center rounded-full border border-brand-dusk/30 px-3 py-2 text-xs font-semibold text-brand-dusk hover:border-rose-400 hover:text-rose-500"
                  >
                    {t('nav.cancelBooking', 'Cancel booking')}
                  </button>
                </div>
              ) : (
                <p className="mt-3 rounded-2xl border border-dashed border-brand-dusk/15 p-4 text-brand-slate/60">
                  {t('nav.noActiveBooking')}
                </p>
              )}

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-brand-slate/70">
                  {t('nav.previousSlots', 'Previous slots')}
                </p>
                <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
                  {booking.pastBookings.map((record) => (
                    <button
                      key={record.id}
                      onClick={() => setSelectedHistory(record)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left ${
                        activeHistory?.id === record.id
                          ? 'border-brand-saffron bg-brand-sand/60 text-brand-dusk'
                          : 'border-brand-dusk/10 text-brand-slate'
                      }`}
                    >
                      <p className="text-sm font-semibold">{record.temple}</p>
                      <p className="text-xs">{record.date}</p>
                      <p className="text-xs">{record.slot}</p>
                    </button>
                  ))}
                  {booking.pastBookings.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-brand-dusk/15 p-4 text-center text-brand-slate/60">
                      {t('nav.noHistory')}
                    </p>
                  )}
                </div>
                {activeHistory && (
                  <div className="mt-4 rounded-2xl bg-brand-smoke p-4 text-brand-slate">
                    <p className="text-sm font-semibold text-brand-dusk">
                      {activeHistory.temple}
                    </p>
                    <p className="text-xs text-brand-slate/70">
                      {activeHistory.city}
                    </p>
                    <p className="text-sm">
                      {t('nav.visit', 'Visit')}: {activeHistory.date} · {activeHistory.slot}
                    </p>
                    <p className="text-sm">
                      {t('nav.parkingLabel', 'Parking')}: {activeHistory.parking}
                    </p>
                    <p className="text-sm">
                      {t('nav.devotee', 'Devotee')}: {activeHistory.visitors.name} (
                      {activeHistory.visitors.phone})
                    </p>
                    <p className="text-sm">
                      {t('nav.groupSummary', 'Group')}: {activeHistory.visitors.total} · Elders{' '}
                      {activeHistory.visitors.elders} · Differently abled{' '}
                      {activeHistory.visitors.differentlyAbled}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-brand-slate/50">
                      {t('nav.status', 'Status')}: {activeHistory.status ?? 'Completed'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="page-shell">{children}</main>

      <footer className="border-t border-brand-dusk/5 bg-white py-8 text-center text-sm text-brand-slate">
        Built for Smart India Hackathon 2025 · Heritage & Culture Track · Pilgrim
        helpline 1800-108-1212
      </footer>
    </div>
  )
}

export default AppLayout

