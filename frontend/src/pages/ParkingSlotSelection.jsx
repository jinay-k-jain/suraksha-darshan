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
  const [selectedSlot, setSelectedSlot] = useState(booking.parkingSlot || null)

  // Simulate occupied slots (in real app, this would come from API)
  const occupiedSlots = ['A2', 'A4', 'B1', 'B5', 'C3', 'D2', 'D4', 'E1', 'E5']
  const slots = generateSlots(6, 6, occupiedSlots)

  useEffect(() => {
    if (!booking.parkingZone) {
      navigate('/parking')
    }
  }, [booking.parkingZone, navigate])

  const handleSlotSelect = (slot) => {
    if (!slot.isOccupied) {
      setSelectedSlot(slot.id)
    }
  }

  const handleConfirm = () => {
    if (!selectedSlot) return
    
    const payload = {
      parkingSlot: selectedSlot,
    }
    
    if (!booking.isAuthenticated) {
      updateBooking({
        ...payload,
        pendingPath: '/details',
      })
      navigate('/access')
      return
    }
    
    updateBooking(payload)
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
            Step 03B · Select Parking Slot
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-black md:text-3xl">
          Choose Your Parking Spot
        </h2>
        <p className="mt-2 text-gray-600">
          Select an available slot in {booking.parkingZone}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg md:p-8">
            {/* Legend */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg border-2 border-green-500 bg-green-100"></div>
                <span className="text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg border-2 border-red-500 bg-red-100"></div>
                <span className="text-gray-700">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg border-2 border-blue-500 bg-blue-100"></div>
                <span className="text-gray-700">Selected</span>
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
                        <button
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={slot.isOccupied}
                          className={`flex h-16 items-center justify-center rounded-lg border-2 font-semibold transition ${
                            selectedSlot === slot.id
                              ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-lg'
                              : slot.isOccupied
                                ? 'cursor-not-allowed border-red-500 bg-red-100 text-red-700 opacity-60'
                                : 'border-green-500 bg-green-100 text-green-700 hover:border-green-600 hover:bg-green-200 hover:shadow-md'
                          }`}
                        >
                          {slot.id}
                        </button>
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

          {selectedSlot && (
            <div className="rounded-3xl border-2 border-blue-500 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Selected Slot
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center rounded-xl bg-blue-100 py-6">
                  <span className="text-4xl font-bold text-blue-600">{selectedSlot}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Zone:</strong> {booking.parkingZone}</p>
                  <p><strong>Date:</strong> {booking.visitDate}</p>
                  <p><strong>Time:</strong> {booking.parkingTime}</p>
                  <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className="w-full rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {selectedSlot ? 'Confirm Slot & Continue →' : 'Select a slot to continue'}
          </button>
        </section>
      </div>
    </div>
  )
}

export default ParkingSlotSelection
