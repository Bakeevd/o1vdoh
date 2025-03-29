"use client"

import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function BookingConfirmationPage() {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="p-4 pt-12 max-w-4xl mx-auto">
      <div className="glass-panel p-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Запись подтверждена!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Мы отправили детали вашей записи на email bakeevd@yandex.ru
        </p>
        
        <div className="glass-card p-4 max-w-md mx-auto mb-8">
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 mb-2">
            <span>Услуга:</span>
            <span className="font-medium">ВсеЛенская терапия</span>
          </div>
          
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 mb-2">
            <span>Дата:</span>
            <span className="font-medium">20 апреля</span>
          </div>
          
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 mb-2">
            <span>Время:</span>
            <span className="font-medium">14:00</span>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
          
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-medium">
            <span>Стоимость:</span>
            <span>4000₽</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="mr-2 h-5 w-5" />
              Мои записи
            </Button>
          </Link>
          
          <Link href="/">
            <Button className="w-full sm:w-auto gradient-button">
              На главную
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        {countdown > 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Автоматический переход на главную через {countdown} сек...
          </p>
        )}
      </div>
    </div>
  )
} 