"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestApiPage() {
  const [name, setName] = useState("Тестовый Пользователь")
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [result, setResult] = useState("")

  const testRegisterApi = async () => {
    setResult("Отправка запроса...")
    
    try {
      const baseUrl = window.location.origin
      const apiUrl = `${baseUrl}/api/register`
      
      console.log("URL запроса:", apiUrl)
      console.log("Отправляемые данные:", { name, email, password: "********" })
      
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
      })
      
      const responseText = await response.text()
      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        data = { raw: responseText }
      }
      
      console.log("Ответ сервера:", {
        status: response.status,
        statusText: response.statusText,
        data
      })
      
      setResult(
        `Статус: ${response.status} ${response.statusText}\n` +
        `Ответ: ${JSON.stringify(data, null, 2)}`
      )
    } catch (error: any) {
      console.error("Ошибка при тестировании API:", error)
      setResult(`Ошибка: ${error.toString()}`)
    }
  }

  return (
    <div className="container p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Тестирование API</h1>
      
      <div className="grid gap-4 max-w-md mb-6">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        
        <Button onClick={testRegisterApi} className="w-full">
          Тест регистрации
        </Button>
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Результат:</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap overflow-auto max-h-60">
          {result || "Здесь будет отображаться результат запроса"}
        </pre>
      </div>
    </div>
  )
} 