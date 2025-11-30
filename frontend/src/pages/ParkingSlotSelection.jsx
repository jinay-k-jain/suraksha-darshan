import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

// Generate parking slots for a zone
const generateSlots = (rows, slotsPerRow, occupiedSlots = []) => {
  const slots = []
  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F']
  
  for (let row = 0; row < rows; row++) {
    for (let slot = 1; slot <= slotsPerRow; slot++) {
      const slotId = `${rowLabels[row]}${slot}`
      slots.push({
        id: slotId,
        row: rowLabels[row],
        number: slot,
        isOccupied: occupiedSlots.includes(slotId),
      })
    }
  }
  return slots
}

const ParkingSlotSelection = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()

  // Simulate occupied slots (in real app, this would come from API)
  const occupiedSlots = ['A2', 'A4', 'B1', 'B5', 'C3', 'D2', 'D4', 'E1', 'E5']
  const slots = generateSlots(6, 6, occupiedSlots)

  useEffect(() => {
    if (!booking.parkingZone) {
      navigate('/parking')
    }
  }, [booking.parkingZone, navigate])

  const handleContinue = () => {
    if (!booking.isAuthenticated) {
      updateBooking({
        pendingPath: '/details',
      })
      navigate('/access')
      return
    }
    navigate('/details')
  }

  if (!booking.parkingZone) {
    return null
  }

  const availableCount = slots.filter(s => !s.isOccupied).length
  const totalCount = slots.length

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-orange bg-brand-orange/5 px-3 py-1">
          <span className="text-sm">🅿️</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            Real-Time Parking Status
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-black md:text-3xl">
          Real-Time Parking Status
        </h2>
        <p className="mt-2 text-gray-600">
          Live availability in {booking.parkingZone}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg md:p-8">
            {/* Legend */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg border-2 border-green-500 bg-green-100"></div>
                <span className="text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg border-2 border-red-500 bg-red-100"></div>
                <span className="text-gray-700">Occupied</span>
              </div>
            </div>

            {/* Entry marker */}
            <div className="mb-4 flex items-center justify-end gap-2 text-sm font-semibold text-gray-600">
              <span>Entry</span>
              <span className="text-xl">→</span>
            </div>

            {/* Parking Grid */}
            <div className="space-y-4">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700">
                    {row}
                  </div>
                  <div className="grid flex-1 grid-cols-6 gap-2">
                    {slots
                      .filter((slot) => slot.row === row)
                      .map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex h-16 items-center justify-center rounded-lg border-2 font-semibold ${
                            slot.isOccupied
                              ? 'border-red-500 bg-red-100 text-red-700'
                              : 'border-green-500 bg-green-100 text-green-700'
                          }`}
                        >
                          {slot.id}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Exit marker */}
            <div className="mt-4 flex items-center justify-end gap-2 text-sm font-semibold text-gray-600">
              <span>Exit</span>
              <span className="text-xl">→</span>
            </div>

            {/* Divider indicator */}
            <div className="mt-6 flex items-center justify-center">
              <div className="rounded-full border-2 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600">
                Walking Path / Divider
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Availability
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available Slots</span>
                <span className="text-xl font-bold text-green-600">{availableCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Slots</span>
                <span className="text-xl font-bold text-gray-800">{totalCount}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(availableCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">ℹ️</span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Booking Summary
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Zone:</strong> {booking.parkingZone}</p>
              <p><strong>Date:</strong> {booking.visitDate}</p>
              <p><strong>Time:</strong> {booking.parkingTime}</p>
              <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              * Parking slot will be assigned automatically upon arrival
            </p>
          </div>

          <button
            onClick={handleContinue}
            className="w-full rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-orange-dark"
          >
            Continue to Details →
          </button>
        </section>
      </div>
    </div>
  )
}

export default ParkingSlotSelection
