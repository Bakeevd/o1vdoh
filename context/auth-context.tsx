"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Реальная функция входа, которая обращается к API
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Ошибка при входе:', data.message);
        setIsLoading(false);
        return false;
      }

      // Сохраняем пользователя в состоянии и localStorage
      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setIsLoading(false);
      return false;
    }
  }

  // Реальная функция регистрации, которая обращается к API
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Ошибка при регистрации:', data.message);
        setIsLoading(false);
        return false;
      }

      // Сохраняем пользователя в состоянии и localStorage
      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setIsLoading(false);
      return false;
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

