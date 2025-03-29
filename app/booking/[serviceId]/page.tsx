"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

export default function BookingPage() {
  const params = useParams();
  const serviceId = params?.serviceId;
  
  return (
    <div className="p-4 pt-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/services">
          <button className="flex items-center text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Назад к услугам</span>
          </button>
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Запись на сеанс #{serviceId}</h1>
      <p>Форма записи в разработке...</p>
      
      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Контактная информация</h2>
        <div className="mb-3">
          <p className="text-slate-600 dark:text-slate-400">+7 (999) 123-45-67</p>
        </div>
      </div>
    </div>
  )
} 