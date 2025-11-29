import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const Profile = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()

  const handleLogout = () => {
    updateBooking({
      isAuthenticated: false,
      otpVerified: false,
      visitors: {
        name: '',
        phone: '',
        total: 1,
        elders: 0,
        differentlyAbled: 0,
        notes: '',
      },
    })
    navigate('/')
  }

  if (!booking.isAuthenticated) {
    navigate('/access')
    return null
  }

  // Calculate temples visited (from past bookings)
  const templesVisited = booking.pastBookings.filter(b => b.status === 'Completed').length
  const totalPoints = templesVisited * 10 // 10 points per temple visit

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-orange bg-brand-orange/5 px-3 py-1">
          <span className="text-sm">👤</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            User Profile
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-black md:text-3xl">
          My Account
        </h2>
        <p className="mt-2 text-gray-600">Manage your profile and view your activity</p>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange text-4xl font-bold text-white">
                {booking.visitors.name ? booking.visitors.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{booking.visitors.name || 'User'}</h3>
                <p className="mt-1 text-gray-600">{booking.visitors.phone || 'No phone number'}</p>
                {booking.visitors.email && (
                  <p className="mt-1 text-gray-600">{booking.visitors.email}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleLogout}
                    className="rounded-full border-2 border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-xl font-bold text-black">Booking History</h3>
            {booking.pastBookings.length === 0 ? (
              <p className="text-center text-gray-500">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {booking.pastBookings.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-xl border-2 border-gray-200 bg-white p-4 transition hover:border-brand-orange"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-black">{record.temple}</h4>
                        <p className="text-sm text-gray-600">{record.city}</p>
                        <p className="mt-2 text-sm text-gray-600">
                          {record.date} · {record.slot}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          record.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'Cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {record.status || 'Completed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🛕</span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Temples Visited
              </p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-brand-orange">{templesVisited}</p>
              <p className="mt-2 text-sm text-gray-600">Through SurakshaDarshan</p>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Reward Points
              </p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-brand-orange">{totalPoints}</p>
              <p className="mt-2 text-sm text-gray-600">Earn 10 points per visit</p>
            </div>
            <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
              <p className="font-semibold">Benefits:</p>
              <ul className="mt-2 space-y-1">
                <li>• Priority booking at 100 points</li>
                <li>• Free parking at 200 points</li>
                <li>• VIP darshan at 500 points</li>
              </ul>
            </div>
          </div>

          {booking.currentBooking && (
            <div className="rounded-3xl border-2 border-blue-500 bg-blue-50 p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Current Booking
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-black">{booking.currentBooking.temple}</p>
                <p className="text-gray-700">{booking.currentBooking.date}</p>
                <p className="text-gray-700">{booking.currentBooking.slot}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Profile
