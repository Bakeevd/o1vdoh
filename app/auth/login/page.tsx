"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LogoBadge } from "@/components/logo-badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация процесса авторизации
    setTimeout(() => {
      // В реальном приложении здесь будет запрос к API
      console.log("Login attempt", { email, password });
      
      // После успешной авторизации перенаправление на главную страницу
      window.location.href = "/";
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <LogoBadge />
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-6 mb-2">Добро пожаловать</h1>
          <p className="text-slate-500 dark:text-slate-400">Войдите в свой аккаунт</p>
        </div>
        
        <div className="glass-card p-6 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@email.com"
                className="w-full py-5"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Пароль
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ваш пароль"
                  className="w-full py-5"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <Link href="/auth/forgot-password" className="text-sm text-primary">
                  Забыли пароль?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full gradient-button font-medium py-5"
              radius="xl"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Еще нет аккаунта?{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 