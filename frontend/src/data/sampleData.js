export const temples = [
  {
    id: 'kv',
    name: 'Shri Kashi Vishwanath Temple',
    city: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    wait: '45 min',
    crowdLevel: 'High',
    nextSlot: '07:30 AM',
    tags: ['Ganga Aarti', 'River shuttle', 'Priority queue'],
    history:
      'One of the twelve Jyotirlingas rebuilt multiple times, the present structure was commissioned by Maharani Ahilyabai Holkar in 1780.',
    origin:
      'Legends say Lord Shiva manifested here after the cosmic churning, sanctifying the confluence of the Ganga with divine energy.',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'tirupati',
    name: 'Tirumala Tirupati Devasthanams',
    city: 'Tirupati, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    wait: '60 min',
    crowdLevel: 'Very High',
    nextSlot: '06:45 AM',
    tags: ['Elderly lane', 'Sheegra darshan'],
    history:
      'The hill shrine of Lord Venkateswara receives over 50,000 pilgrims a day and is known for its laddu prasadam tradition since 1712.',
    origin:
      'Mythology narrates that Lord Venkateswara descended to Tirumala to save humanity during Kali Yuga, with the temple foundation laid by the Pallavas.',
    image:
      'https://images.unsplash.com/photo-1508675801607-925cd1f7ddf2?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'madurai',
    name: 'Meenakshi Amman Temple',
    city: 'Madurai, Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Madurai',
    wait: '25 min',
    crowdLevel: 'Moderate',
    nextSlot: '08:15 AM',
    tags: ['Audio guide', 'Mandapam tour'],
    history:
      'A Dravidian architectural marvel with 14 gopurams, the temple celebrates the celestial wedding of Meenakshi and Sundareswarar every April.',
    origin:
      'Built by the Nayak dynasty in the 16th century, the shrine marks the legend of the warrior princess Meenakshi and Lord Shiva’s union.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'puri',
    name: 'Shri Jagannath Puri',
    city: 'Puri, Odisha',
    state: 'Odisha',
    district: 'Puri',
    wait: '35 min',
    crowdLevel: 'High',
    nextSlot: '05:50 AM',
    tags: ['Live queue feed', 'Mahaprasad slot'],
    history:
      'Home to the iconic Rath Yatra, the shrine of Lord Jagannath is believed to have been originally built in the 12th century by King Anantavarman.',
    origin:
      'Texts describe Lord Jagannath emerging from a sacred log found by King Indradyumna, symbolizing universal brotherhood and compassion.',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=60',
  },
]

export const locationFilters = temples.reduce((acc, temple) => {
  if (!acc[temple.state]) {
    acc[temple.state] = {}
  }
  if (!acc[temple.state][temple.district]) {
    acc[temple.state][temple.district] = []
  }
  acc[temple.state][temple.district].push(temple)
  return acc
}, {})

export const slotTemplates = [
  { label: '05:00 - 06:00 AM', status: 'few' },
  { label: '06:00 - 07:00 AM', status: 'available' },
  { label: '07:00 - 08:00 AM', status: 'available' },
  { label: '08:00 - 09:00 AM', status: 'filling' },
  { label: '09:00 - 10:00 AM', status: 'waitlist' },
  { label: '10:00 - 11:00 AM', status: 'available' },
  { label: '11:00 - 12:00 AM', status: 'few' },
  { label: '12:00 - 01:00 PM', status: 'available' },
  { label: '01:00 - 02:00 PM', status: 'available' },
  { label: '02:00 - 03:00 PM', status: 'filling' },
  { label: '03:00 - 04:00 PM', status: 'waitlist' },
  { label: '04:00 - 05:00 PM', status: 'available' },
  { label: '05:00 - 06:00 PM', status: 'available' },
  { label: '06:00 - 07:00 PM', status: 'filling' },
  { label: '07:00 - 08:00 PM', status: 'waitlist' },
  { label: '08:00 - 09:00 PM', status: 'available' },
  { label: '09:00 - 10:00 PM', status: 'waitlist' },
  { label: '10:00 - 11:00 PM', status: 'available' },
]

export const parkingZones = [
  {
    id: 'north-gate',
    title: 'North Gate Multi-level',
    walkingTime: '5 min walk',
    slotsFree: 32,
    capacity: 120,
    amenities: ['Solar roof', 'Lift', 'Help desk'],
  },
  {
    id: 'riverfront',
    title: 'Riverfront Shuttle Bay',
    walkingTime: 'Shuttle every 6 min',
    slotsFree: 12,
    capacity: 60,
    amenities: ['EV charging', 'Security', 'Shuttle'],
  },
  {
    id: 'vip-south',
    title: 'South Mandap VIP Zone',
    walkingTime: 'Entry gate opposite',
    slotsFree: 4,
    capacity: 25,
    amenities: ['Covered', 'Wheelchair', 'Priority exit'],
  },
]

