"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useBooking } from "@/context/booking-context"
import { ArrowRight, User, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassPanel from "@/components/glass-panel"
import { DatePicker } from "@/components/date-picker"
import { LoginForm } from "@/components/login-form"

export default function BookingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { specialists, services, getAvailableDates, getAvailableTimeSlots, bookAppointment } = useBooking()

  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState<{ time: string; available: boolean }[]>([])
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Reset specialist when service changes
  useEffect(() => {
    setSelectedSpecialist(null)
    setSelectedDate(null)
    setSelectedTime(null)
  }, [selectedService])

  // Reset date when specialist changes
  useEffect(() => {
    setSelectedDate(null)
    setSelectedTime(null)
  }, [selectedSpecialist])

  // Reset time when date changes
  useEffect(() => {
    setSelectedTime(null)

    if (selectedSpecialist && selectedService && selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("ru", { day: "numeric", month: "long" })
      const times = getAvailableTimeSlots(selectedSpecialist, selectedService, formattedDate)
      setAvailableTimes(times)
    }
  }, [selectedDate, selectedSpecialist, selectedService, getAvailableTimeSlots])

  // Handle booking confirmation
  const handleBookingConfirm = async () => {
    if (!user || !selectedService || !selectedSpecialist || !selectedDate || !selectedTime) {
      return
    }

    setIsBooking(true)

    const formattedDate = selectedDate.toLocaleDateString("ru", { day: "numeric", month: "long" })

    const success = await bookAppointment(user.id, selectedService, selectedSpecialist, formattedDate, selectedTime)

    setIsBooking(false)

    if (success) {
      setBookingSuccess(true)
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    }
  }

  // If booking was successful, show success message
  if (bookingSuccess) {
    return (
      <div className="p-4 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <GlassPanel className="w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Запись подтверждена!</h1>
          <p className="text-warm-600 mb-6">
            Ваша запись успешно создана. Вы можете управлять своими записями в личном кабинете.
          </p>
          <Button variant="accent" onClick={() => router.push("/profile")}>
            Перейти в личный кабинет
          </Button>
        </GlassPanel>
      </div>
    )
  }

  // If user is not logged in, show login form
  if (!user) {
    return (
      <div className="p-4 pb-20">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Запись на прием</h1>
          <p className="text-warm-600">Для записи необходимо войти в аккаунт</p>
        </header>

        <GlassPanel>
          <LoginForm onSuccess={() => router.refresh()} />
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Запись на прием</h1>
        <p className="text-warm-600">Выберите услугу, специалиста и время</p>
      </header>

      <div className="space-y-6">
        <GlassPanel>
          <h2 className="text-lg font-medium mb-3">Выберите услугу</h2>
          <div className="space-y-2">
            {services.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className={`p-3 rounded-md ${
                  selectedService === service.id
                    ? "bg-accent/10 border border-accent/30"
                    : "bg-white/40 border border-warm-200"
                } cursor-pointer transition-colors`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{service.name}</span>
                  <span className={selectedService === service.id ? "text-accent" : ""}>{service.price}</span>
                </div>
                <span className="text-sm text-warm-600">{service.duration}</span>
              </div>
            ))}
            <Button variant="ghost" className="w-full justify-between mt-1">
              Смотреть все услуги
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </GlassPanel>

        {selectedService && (
          <GlassPanel>
            <h2 className="text-lg font-medium mb-3">Выберите специалиста</h2>
            <div className="grid grid-cols-2 gap-2">
              {specialists
                .filter((specialist) => specialist.services.includes(String(selectedService)))
                .map((specialist) => (
                  <div
                    key={specialist.id}
                    className={`p-3 rounded-md ${
                      selectedSpecialist === specialist.id
                        ? "bg-accent/10 border border-accent/30"
                        : "bg-white/40 border border-warm-200"
                    } cursor-pointer flex flex-col items-center transition-colors`}
                    onClick={() => setSelectedSpecialist(specialist.id)}
                  >
                    <div className="h-10 w-10 rounded-full bg-warm-200 flex items-center justify-center mb-1">
                      <User className="h-5 w-5 text-warm-600" />
                    </div>
                    <span className="text-sm font-medium">{specialist.name}</span>
                  </div>
                ))}
            </div>
          </GlassPanel>
        )}

        {selectedSpecialist && (
          <GlassPanel>
            <h2 className="text-lg font-medium mb-3">Выберите дату</h2>
            <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} className="w-full" />
          </GlassPanel>
        )}

        {selectedDate && (
          <GlassPanel>
            <h2 className="text-lg font-medium mb-3">Выберите время</h2>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((slot, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md text-center cursor-pointer transition-colors ${
                    !slot.available
                      ? "bg-warm-100 border border-warm-200 opacity-50 cursor-not-allowed"
                      : selectedTime === slot.time
                        ? "bg-accent/10 border border-accent/30"
                        : "bg-white/40 border border-warm-200 hover:bg-white/60"
                  }`}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                >
                  <div className="text-sm">{slot.time}</div>
                </div>
              ))}
            </div>
          </GlassPanel>
        )}

        <Button
          variant="accent"
          className="w-full"
          disabled={!selectedService || !selectedSpecialist || !selectedDate || !selectedTime || isBooking}
          onClick={handleBookingConfirm}
        >
          {isBooking ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Подтверждение...
            </>
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Подтвердить запись
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

