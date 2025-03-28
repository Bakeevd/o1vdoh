"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

type RegisterFormProps = {
  onSuccess?: () => void
  onLoginClick?: () => void
}

export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const { register, isLoading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    console.log("Начало отправки формы регистрации");

    if (!name || !email || !password || !confirmPassword) {
      console.log("Не все поля заполнены");
      setError("Пожалуйста, заполните все поля")
      return
    }

    if (password !== confirmPassword) {
      console.log("Пароли не совпадают");
      setError("Пароли не совпадают")
      return
    }

    console.log("Вызов функции register с данными:", name, email);
    try {
      const success = await register(name, email, password)
      console.log("Результат регистрации:", success);

      if (success) {
        console.log("Успешная регистрация, вызов onSuccess");
        onSuccess?.()
      } else {
        console.log("Неудачная регистрация, установка ошибки");
        setError("Ошибка при регистрации. Попробуйте другой email.")
      }
    } catch (error) {
      console.error("Ошибка при вызове register:", error);
      setError("Критическая ошибка при регистрации. Пожалуйста, попробуйте позже.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Зарегистрироваться
      </Button>

      <div className="text-center text-sm">
        Уже есть аккаунт?{" "}
        <button type="button" onClick={onLoginClick} className="text-accent hover:underline">
          Войти
        </button>
      </div>
    </form>
  )
}

