import { useEffect, useState } from 'react'

export type Duration = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
}

function diff(start: Date, now: Date): Duration {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    // dias do mês anterior ao "agora"
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += daysInPrevMonth
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }

  const totalDays = Math.floor((now.getTime() - start.getTime()) / 86_400_000)

  return { years, months, days, hours, minutes, seconds, totalDays }
}

/** Conta o tempo decorrido desde `startISO`, atualizando a cada segundo. */
export function useTimeTogether(startISO: string): Duration {
  const start = new Date(startISO)
  const [duration, setDuration] = useState<Duration>(() => diff(start, new Date()))

  useEffect(() => {
    const id = setInterval(() => setDuration(diff(start, new Date())), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startISO])

  return duration
}
