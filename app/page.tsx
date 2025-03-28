"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Sparkles, Star, Clock, Users, User, Copy, ChevronRight, Wallet, Share2, Gift, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { LogoBadge } from "@/components/logo-badge"

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const messageText = "Здесь вы найдёте безусловную поддержку и понимание. Мы поможем найти инструменты для решения любых ваших ситуаций. Готовы пройти этот путь вместе с вами.😇";
  
  // Состояние для запуска волновой анимации
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Функция для запуска волновой анимации
  const startWaveAnimation = () => {
    // Предотвращаем повторный запуск анимации
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(false);
    }, 8000); // 6 секунд для первой части + 2 секунды для затухающего пульса
  };

  const popularServices = [
    { id: 1, name: "ВсеЛенская терапия", price: "4000₽", duration: "2ч" },
    { id: 2, name: "Таро", price: "2500₽", duration: "1ч" },
    { id: 3, name: "Регрессия", price: "4000₽", duration: "3ч" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Вебинар: Таро для начинающих", date: "15 апреля", time: "19:00" },
    { id: 2, name: "Мастер-класс по рунам", date: "20 апреля", time: "18:30" },
  ]

  const popularArticles = [
    { id: 1, title: "Как правильно начать практику медитации" },
    { id: 2, title: "Значение и толкование основных карт Таро" },
  ]

  const referralLevels = [
    { level: 1, reward: "10%", users: 0 },
    { level: 2, reward: "5%", users: 0 },
    { level: 3, reward: "3%", users: 0 },
  ]

  const miningStats = {
    totalReferrals: 0,
    activeReferrals: 0,
    profit: "0.00 EVA"
  }

  const activeLevel = 1

  const navigationItems = [
    { name: "Майнинг", icon: <Mining className="w-6 h-6" />, href: "/mining" },
    { name: "Друзья", icon: <Users className="w-6 h-6" />, href: "/friends", badge: null },
    { name: "Квесты", icon: <Gift className="w-6 h-6" />, href: "/quests", badge: 7 },
    { name: "Токен", icon: <Coins className="w-6 h-6" />, href: "/token" },
    { name: "Баланс", icon: <Wallet className="w-6 h-6" />, href: "/balance" },
  ]

  return (
    <div className="p-4 pt-6 max-w-4xl mx-auto">
      <LogoBadge />
      <header className="mb-4">
        <p className="text-center text-slate-500 text-sm md:text-base">Центр духовного развития и практик</p>
      </header>

      {/* Главное изображение с наложенным названием */}
      <div className="mb-8 p-2 rounded-[1.5rem] bg-white/50 shadow-lg">
        <div className="relative rounded-[1.2rem] overflow-hidden">
          <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-0 w-52 h-52 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
          <Image 
            src="/spiritual-woman.jpg" 
            alt="Духовное вдохновение" 
            width={1200} 
            height={800} 
            className="w-full h-[200px] md:h-[280px] object-cover"
            priority
          />
          
          {/* Название с матовым стеклом */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              className="frosted-band inline-flex px-8 md:px-12 py-4 md:py-5 rounded-2xl cursor-pointer relative"
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <h2 className="text-2xl md:text-5xl font-bold text-white drop-shadow-md tracking-wider neon-text whitespace-nowrap">
                ВДОХНОВЕНИЕ
              </h2>
            
              {/* Всплывающее окно при нажатии */}
              {showTooltip && (
                <div 
                  className="info-tooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                >
                  <p>{messageText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Popular Services Tile */}
        <Link href="/services" className="glass-card p-5 flex flex-col justify-between transition-all duration-300 floating">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-slate-700">Услуги</h2>
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-medium text-slate-500">{popularServices.length} услуг</span>
            <div className="glass-button p-1 group">
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Upcoming Events Tile */}
        <Link href="/events" className="glass-card p-5 flex flex-col justify-between transition-all duration-300 floating">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-slate-700">События</h2>
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-medium text-slate-500">{upcomingEvents.length} событий</span>
            <div className="glass-button p-1 group">
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Articles Tile */}
        <Link href="/articles" className="glass-card p-5 flex flex-col justify-between sm:col-span-2 lg:col-span-1 transition-all duration-300 floating">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-slate-700">Статьи</h2>
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-medium text-slate-500">{popularArticles.length} статей</span>
            <div className="glass-button p-1 group">
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Featured Tile - First Consultation */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 glass-panel p-6 relative overflow-hidden shadow-md">
          <div className="relative z-10 md:max-w-lg md:mx-auto lg:max-w-xl">
            <h2 className="text-2xl font-semibold mb-3 text-slate-700">Первая консультация</h2>
            <p className="text-slate-500 text-sm mb-5">Начните свой путь с бесплатной 30-минутной консультацией</p>
            <Button className="w-full gradient-button font-medium py-6" radius="xl">
              <Calendar className="mr-2 h-5 w-5" />
              Записаться
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-20 animate-float">
            <Sparkles className="w-full h-full text-primary" />
          </div>
        </div>

        {/* Featured Service Tile */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 glass-card p-6 relative overflow-hidden shadow-md">
          <div className="relative z-10 md:max-w-lg md:mx-auto lg:max-w-xl">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-semibold text-slate-700">ВсеЛенская терапия</h2>
              <span className="badge badge-purple">4000₽</span>
            </div>
            <div className="flex items-center text-slate-500 text-sm mb-5">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              <span>2 часа</span>
            </div>
            <Button className="w-full gradient-button font-medium py-6" radius="xl">
              Подробнее
            </Button>
          </div>
          <div className="absolute top-5 right-5 w-20 h-20 opacity-10 animate-float">
            <Star className="w-full h-full text-primary" />
          </div>
        </div>

        {/* Booking Tile */}
        <Link href="/booking" className="col-span-1 sm:col-span-2 lg:col-span-3 glass-panel p-5 flex flex-col justify-between shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-slate-700">Запись</h2>
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-medium text-slate-500">Выбрать время</span>
            <Button className="glow-button py-2 px-4" radius="xl">
              Записаться
            </Button>
          </div>
        </Link>

        {/* Popular Services List */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-700">Популярные услуги</h2>
            <Link href="/services" className="text-sm badge badge-blue flex items-center">
              Все <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <div className="p-4 glass-card shadow-sm transition-all duration-300 floating">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg text-slate-700">{service.name}</h3>
                    <span className="badge badge-purple">{service.price}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {service.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom icons
function Coins(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function Mining(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M11 12H3" />
      <path d="M16 6H3" />
      <path d="M16 18H3" />
      <path d="M19 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M19 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M19 16v-4" />
    </svg>
  )
}

function InfoIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function HistoryIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
}

function BarChart(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}



