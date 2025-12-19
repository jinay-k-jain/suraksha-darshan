import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parkingZones } from '../data/sampleData'
import { useBooking } from '../context/BookingContext'

const ParkingAvailability = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const [selectedVehicle, setSelectedVehicle] = useState(booking.vehicleType || 'Two Wheeler')

  useEffect(() => {
    if (!booking.temple) {
      navigate('/')
    }
  }, [booking.temple, navigate])

  const selectedParkingData = useMemo(
    () => parkingZones.find((zone) => zone.vehicleType === selectedVehicle),
    [selectedVehicle],
  )

  const handleShowStatus = () => {
    const payload = {
      parkingZone: selectedParkingData.title,
      vehicleType: selectedVehicle,
    }
    updateBooking(payload)
    navigate('/parking-slots')
  }

  if (!booking.temple) {
    return null
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel space-y-4">
        <h2 className="section-heading">Real Time Parking Status</h2>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {parkingZones.map((zone) => {
          const isActive = zone.vehicleType === selectedVehicle
          const occupancy = Math.round((zone.slotsFree / zone.capacity) * 100)
          return (
            <article
              key={zone.id}
              onClick={() => setSelectedVehicle(zone.vehicleType)}
              onDoubleClick={handleShowStatus}
              className={`flex cursor-pointer flex-col gap-4 rounded-3xl border p-6 shadow transition hover:-translate-y-1 hover:shadow-xl ${
                isActive
                  ? 'border-brand-saffron bg-white ring-2 ring-brand-saffron'
                  : 'border-brand-dusk/10 bg-white/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-brand-dusk">{zone.title}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    occupancy > 40
                      ? 'bg-brand-teal/15 text-brand-teal'
                      : occupancy > 15
                        ? 'bg-brand-saffron/10 text-brand-saffron'
                        : 'bg-rose-50 text-rose-500'
                  }`}
                >
                  {zone.slotsFree} free
                </span>
              </div>
              <div className="h-2 rounded-full bg-brand-dusk/10">
                <div
                  className="h-2 rounded-full bg-brand-saffron transition"
                  style={{ width: `${Math.min(100, occupancy)}%` }}
                />
              </div>
              <p className="text-sm text-brand-dusk/60">
                {zone.slotsFree} / {zone.capacity} slots available
              </p>
              <ul className="text-sm text-brand-dusk/70">
                {zone.amenities.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      {selectedParkingData && (
        <div className="glass-panel flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
              Selected Vehicle Type
            </p>
            <h3 className="text-2xl font-semibold text-brand-dusk">
              {selectedVehicle}
            </h3>
            <p className="text-brand-dusk/60">
              {booking.temple?.name}
            </p>
          </div>
          <p className="text-sm text-brand-dusk/70">
            Real-time parking availability for {selectedVehicle.toLowerCase()}. 
            Assistance available for elders and differently abled visitors.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleShowStatus}
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-orange-dark"
            >
              Show Parking Status
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-lg hover:border-brand-orange hover:text-brand-orange"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Return to Temple Info
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParkingAvailability
