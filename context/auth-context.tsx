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

// Получаем базовый URL сайта
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://app.vdohnovenie.pro'; // Fallback для SSR
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const baseUrl = getBaseUrl();

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
    console.log('Начало логина:', email);
    console.log('Базовый URL:', baseUrl);

    try {
      const apiUrl = `${baseUrl}/api/login`;
      console.log('Отправка запроса к:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('Получен ответ:', response.status);
      const data = await response.json();
      console.log('Данные ответа:', data);

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
      
      console.log('Пользователь успешно вошел:', newUser);
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
    console.log('Начало регистрации:', name, email);
    console.log('Базовый URL:', baseUrl);

    try {
      const apiUrl = `${baseUrl}/api/register`;
      console.log('Отправка запроса к:', apiUrl);
      const response = await fetch(apiUrl, {
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

      console.log('Получен ответ:', response.status);
      const data = await response.json();
      console.log('Данные ответа:', data);

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
      
      console.log('Пользователь успешно зарегистрирован:', newUser);
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

