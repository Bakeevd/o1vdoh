"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Specialist = {
  id: number
  name: string
  services: string[]
  photo?: string
}

type Service = {
  id: number
  name: string
  price: string
  duration: string
}

type TimeSlot = {
  time: string
  available: boolean
}

type Appointment = {
  id: number
  userId: number
  serviceId: number
  serviceName: string
  specialistId: number
  specialistName: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
}

type BookingContextType = {
  specialists: Specialist[]
  services: Service[]
  appointments: Appointment[]
  getAvailableDates: (specialistId: number, serviceId: number) => { date: string; day: string; available: boolean }[]
  getAvailableTimeSlots: (specialistId: number, serviceId: number, date: string) => TimeSlot[]
  bookAppointment: (
    userId: number,
    serviceId: number,
    specialistId: number,
    date: string,
    time: string,
  ) => Promise<boolean>
  cancelAppointment: (appointmentId: number) => Promise<boolean>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  // Mock specialists data
  const [specialists] = useState<Specialist[]>([
    { id: 1, name: "Елена", services: [1, 2, 3, 5, 10].map(String) },
    { id: 2, name: "Олег", services: [4, 8].map(String) },
    { id: 3, name: "Мария", services: [4, 6].map(String) },
    { id: 4, name: "Александр", services: [7, 11].map(String) },
  ])

  // Mock services data
  const [services] = useState<Service[]>([
    { id: 1, name: "Первая консультация", price: "Бесплатно", duration: "30 мин" },
    { id: 2, name: "ВсеЛенская терапия", price: "4000₽", duration: "2ч" },
    { id: 3, name: "Легализация правды", price: "4000₽", duration: "2ч" },
    { id: 4, name: "Таро", price: "2500₽", duration: "1ч" },
    { id: 5, name: "Регрессия", price: "4000₽", duration: "3ч" },
    { id: 6, name: "Нумерология", price: "от 1500₽", duration: "1ч" },
    { id: 7, name: "Ведическая Астрология", price: "2500₽", duration: "3ч" },
    { id: 8, name: "Руны", price: "2000₽", duration: "1ч" },
    { id: 9, name: "Волшебная лавка артефактов", price: "3500₽", duration: "1ч" },
    { id: 10, name: "PWS - Работа с подсознанием", price: "2000₽", duration: "3ч" },
    { id: 11, name: "Васту", price: "2000₽", duration: "1ч" },
  ])

  // Mock appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Save appointments to localStorage when they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }, [appointments])

  // Get available dates for a specialist and service
  const getAvailableDates = (specialistId: number, serviceId: number) => {
    // Generate dates for the next 14 days
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Format date as "DD месяц"
      const day = date.getDate()
      const month = date.toLocaleString("ru", { month: "long" })

      // Get day of week
      const dayOfWeek = date.toLocaleString("ru", { weekday: "short" })

      // Check if date is available (mock logic)
      const available = date.getDay() !== 0 // Not available on Sundays

      dates.push({
        date: `${day} ${month}`,
        day: dayOfWeek,
        available,
        dateObj: date, // For internal use
      })
    }

    return dates
  }

  // Get available time slots for a specialist, service, and date
  const getAvailableTimeSlots = (specialistId: number, serviceId: number, date: string) => {
    // Mock time slots
    const timeSlots: TimeSlot[] = [
      { time: "10:00", available: true },
      { time: "11:00", available: true },
      { time: "12:00", available: false },
      { time: "13:00", available: true },
      { time: "14:00", available: true },
      { time: "15:00", available: false },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true },
    ]

    // Filter out slots that are already booked
    const bookedSlots = appointments
      .filter((app) => app.specialistId === specialistId && app.date === date && app.status !== "cancelled")
      .map((app) => app.time)

    return timeSlots.map((slot) => ({
      ...slot,
      available: slot.available && !bookedSlots.includes(slot.time),
    }))
  }

  // Book an appointment
  const bookAppointment = async (
    userId: number,
    serviceId: number,
    specialistId: number,
    date: string,
    time: string,
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const service = services.find((s) => s.id === serviceId)
    const specialist = specialists.find((s) => s.id === specialistId)

    if (!service || !specialist) return false

    const newAppointment: Appointment = {
      id: Date.now(),
      userId,
      serviceId,
      serviceName: service.name,
      specialistId,
      specialistName: specialist.name,
      date,
      time,
      status: "upcoming",
    }

    setAppointments((prev) => [...prev, newAppointment])
    return true
  }

  // Cancel an appointment
  const cancelAppointment = async (appointmentId: number): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setAppointments((prev) => prev.map((app) => (app.id === appointmentId ? { ...app, status: "cancelled" } : app)))

    return true
  }

  return (
    <BookingContext.Provider
      value={{
        specialists,
        services,
        appointments,
        getAvailableDates,
        getAvailableTimeSlots,
        bookAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

