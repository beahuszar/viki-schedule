import './App.css'

function App() {
  /* 
      paratlan: h sz cs 
      paros: h k cs p sz v
  
  */

  const now = new Date()
  const weekNumber = Math.ceil(
    (now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 604800000
  )
  const isEvenWeek = weekNumber % 2 === 0
  const daysOfWeek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
  const dayOfWeek = daysOfWeek[now.getDay()]

  const vikiSchedule = {
    even: [1, 2, 4, 5, 6, 0],
    odd: [1, 3, 4]
  }

  const schedule = [
    '18:00 - 20:00',
    '10:00 - 20:00',
    '10:00 - 20:00',
    '10:00 - 20:00',
    '10:00 - 20:00',
    '10:00 - 20:00',
    '10:00 - 12:00'
  ]

  const isVikiWorking = false /* isEvenWeek
    ? vikiSchedule.even.includes(now.getDay())
    : vikiSchedule.odd.includes(now.getDay()) */
  const thisWeekSchedule = isEvenWeek ? vikiSchedule.even : vikiSchedule.odd

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ma dolgozik Viki?</h1>
      </header>
      <div className='card'>
        <div>{isVikiWorking ? 'Igen' : 'Nem'}</div>
        <div className='time'>{isVikiWorking ? schedule[now.getDay()] : '-'}</div>
        <div className='emoji'>{isVikiWorking ? '👩🏻‍⚕️' : '🎉'}</div>
      </div>
      <div>Milyen napokon dolgozik a héten?</div>
      <p>{thisWeekSchedule.map((day) => daysOfWeek[day]).join(', ')}</p>
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
