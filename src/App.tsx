import { useState } from 'react'
import './App.css'

const daysOfWeek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
const vikiSchedule = {
  even: [1, 2, 3, 6, 0],
  odd: [1, 2, 3]
}
const schedule = [
  '18:00 - 20:00',
  '10:00 - 20:00',
  '10:00 - 16:00',
  '10:00 - 20:00',
  '10:00 - 20:00',
  '10:00 - 20:00',
  '10:00 - 12:00'
]

function App() {
  const now = new Date()
  const [selectedDate, setSelectedDate] = useState(now)
  const isTodaySelected = now.getDay() === selectedDate.getDay()
  const weekNumber = getWeekNumber(selectedDate)
  const isEvenWeek = weekNumber % 2 === 0

  const isVikiWorking = isEvenWeek
    ? vikiSchedule.even.includes(selectedDate.getDay())
    : vikiSchedule.odd.includes(selectedDate.getDay())
  const thisWeekSchedule = isEvenWeek ? vikiSchedule.even : vikiSchedule.odd

  function getWeekNumber(date: Date) {
    const jan1 = new Date(date.getFullYear(), 0, 1)
    const dayOfJan1 = jan1.getDay() || 7 // Adjust if Jan 1 is Sunday (0)
    const dayOfYear = Math.floor((date.getTime() - jan1.getTime()) / (24 * 60 * 60 * 1000)) + 1 // difference in days between the selected date and January 1st.
    const adjustedDayOfYear = dayOfYear + (dayOfJan1 - 1) // Adjust for the first day of the year (e.g.: starting on a wednesday should still calculate from that week's monday)
    return Math.ceil(adjustedDayOfYear / 7)
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = new Date(event.target.value || now.toISOString())
    setSelectedDate(selectedDate)
  }

  function getDefaultDateInput() {
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{isTodaySelected ? 'Ma dolgozik Viki?' : 'A kiválasztott napon dolgozik Viki?'}</h1>
      </header>
      <div className='card'>
        <div>{isVikiWorking ? 'Igen' : 'Nem'}</div>
        <div className='time'>{isVikiWorking ? schedule[selectedDate.getDay()] : '-'}</div>
        <div className='emoji'>{isVikiWorking ? '👩🏻‍⚕️' : '🎉'}</div>
      </div>
      <div>
        {isTodaySelected
          ? 'Milyen napokon dolgozik a héten?'
          : 'Milyen napokon dolgozik a kiválasztott héten?'}
      </div>
      <p>{thisWeekSchedule.map((day) => daysOfWeek[day]).join(', ')}</p>
      <div className='date-selector-container'>
        <label htmlFor='datePicker'>Megnéznék egy másik napot:</label>
        <input
          type='date'
          id='datePicker'
          onChange={handleDateChange}
          defaultValue={getDefaultDateInput()}
        />
      </div>
      <footer>
        <p>
          A változtatás jogát fenntartjuk, szabadság és ünnepnapok jelenleg nincsenek kezelve a
          rendszerben. Rugalmasságukat és megértésüket köszönjük.
        </p>
        <p>© {now.getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
