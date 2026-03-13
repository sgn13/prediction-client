import { useEffect, useState } from 'react'

function Countdown({ kickoff }) {
  const [timeLeft, setTimeLeft] = useState(
    new Date(kickoff).getTime() - Date.now()
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(new Date(kickoff).getTime() - Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [kickoff])

  if (timeLeft <= 0) return <span>Started</span>

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return (
    <span>
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  )
}

export default Countdown
