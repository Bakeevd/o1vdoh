"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useBooking } from "@/context/booking-context"
import { Button } from "@/components/ui/button"
import GlassPanel from "@/components/glass-panel"
import { User, Settings, Clock, MessageSquare, Heart, LogOut } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { appointments } = useBooking()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // Filter appointments for the current user
  const userAppointments = user ? appointments.filter((app) => app.userId === user.id && app.status === "upcoming") : []

  if (!user) {
    return (
      <div className="p-4 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <GlassPanel className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {authMode === "login" ? "Вход в личный кабинет" : "Регистрация"}
          </h1>
          <p className="text-warm-600 mb-6 text-center">
            {authMode === "login"
              ? "Войдите, чтобы управлять записями и сохранять избранные статьи"
              : "Создайте аккаунт для записи на приём и доступа к личному кабинету"}
          </p>

          {authMode === "login" ? (
            <LoginForm onRegisterClick={() => setAuthMode("register")} />
          ) : (
            <RegisterForm onLoginClick={() => setAuthMode("login")} />
          )}
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <GlassPanel className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-warm-200 flex items-center justify-center">
          <User className="h-8 w-8 text-warm-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-warm-600">{user.email}</p>
        </div>
      </GlassPanel>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-3">Мои записи</h2>
        {userAppointments.length > 0 ? (
          <div className="space-y-3">
            {userAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 rounded-lg bg-white/70 border border-warm-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{appointment.serviceName}</h3>
                    <p className="text-warm-600 text-sm">Специалист: {appointment.specialistName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-accent font-medium">{appointment.date}</div>
                    <div className="text-sm">{appointment.time}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      // This would normally call cancelAppointment from the booking context
                      // but we'll just show an alert for now
                      alert("Запись отменена")
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Clock className="mr-2 h-4 w-4" />
              История записей
            </Button>
          </div>
        ) : (
          <div className="text-center p-6 bg-white/40 rounded-lg border border-warm-200">
            <p className="text-warm-600 mb-3">У вас пока нет активных записей</p>
            <Button variant="accent" as="a" href="/booking">
              Записаться на приём
            </Button>
          </div>
        )}
      </section>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="glass" className="h-24 flex flex-col items-center justify-center">
          <Heart className="h-6 w-6 mb-2" />
          <span>Избранное</span>
          <span className="text-xs text-warm-500 mt-1">0 статей</span>
        </Button>
        <Button variant="glass" className="h-24 flex flex-col items-center justify-center">
          <MessageSquare className="h-6 w-6 mb-2" />
          <span>Отзывы</span>
          <span className="text-xs text-warm-500 mt-1">0 отзывов</span>
        </Button>
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => logout()}>
        <LogOut className="mr-2 h-4 w-4" />
        Выйти
      </Button>
    </div>
  )
}

