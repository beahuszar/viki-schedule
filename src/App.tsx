import { useState } from 'react'
import './App.css'

const daysOfWeek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
const workingDays = [1, 2, 3, 4, 5]
// Kezdés fix, a vége nem fix, de legkésőbb 16:00-ig tart
const schedule: Record<number, string> = {
  1: '14:30-tól, legkésőbb 16:00-ig',
  2: '13:30-tól, legkésőbb 16:00-ig',
  3: '13:30-tól, legkésőbb 16:00-ig',
  4: '13:00-tól, legkésőbb 16:00-ig',
  5: '11:30-tól, legkésőbb 16:00-ig'
}

function App() {
  const now = new Date()
  const [selectedDate, setSelectedDate] = useState(now)
  const isTodaySelected = now.getDay() === selectedDate.getDay()
  const isVikiWorking = workingDays.includes(selectedDate.getDay())

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
      <p>{workingDays.map((day) => daysOfWeek[day]).join(', ')}</p>
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
