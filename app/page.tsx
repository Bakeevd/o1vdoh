"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Sparkles, Star, Clock, Users, User, Copy, ChevronRight, Wallet, Share2, Gift, Info, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { LogoBadge } from "@/components/logo-badge"
import { ServiceCard } from "@/components/service-card"
import { EventCard } from "@/components/event-card"
import { BottomSheet } from "@/components/bottom-sheet"
import { SwipeCarousel } from "@/components/swipe-carousel"

// Определяем типы данных
interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  image: string;
}

interface Article {
  id: number;
  title: string;
  image: string;
  excerpt: string;
}

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const messageText = "Здесь вы найдёте безусловную поддержку и понимание. Мы поможем найти инструменты для решения любых ваших ситуаций. Готовы пройти этот путь вместе с вами.😇";
  
  // Состояние для запуска волновой анимации
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  
  // Функция для запуска волновой анимации
  const startWaveAnimation = () => {
    // Предотвращаем повторный запуск анимации
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(false);
    }, 8000);
  };

  const popularServices: Service[] = [
    { 
      id: 1, 
      name: "ВсеЛенская терапия", 
      price: "4000₽", 
      duration: "2ч",
      image: "/images/services/1.jpg",
      description: "Уникальная терапия, объединяющая древние техники и современные методики для глубинной трансформации личности."
    },
    { 
      id: 2, 
      name: "Таро", 
      price: "2500₽", 
      duration: "1ч",
      image: "/images/services/2.jpg",
      description: "Глубинный анализ ситуации через карты Таро, позволяющий получить ответы на важные жизненные вопросы."
    },
    { 
      id: 3, 
      name: "Регрессия", 
      price: "4000₽", 
      duration: "3ч",
      image: "/images/services/3.jpg",
      description: "Путешествие в прошлые воплощения для исцеления травм и раскрытия скрытых талантов и потенциала."
    },
    { 
      id: 4, 
      name: "Медитации", 
      price: "1500₽", 
      duration: "1ч",
      image: "/images/services/4.jpg",
      description: "Групповые и индивидуальные медитации для гармонизации энергетических центров и внутреннего баланса."
    },
  ]

  const upcomingEvents: Event[] = [
    { 
      id: 1, 
      name: "Вебинар: Таро для начинающих", 
      date: "15 апреля", 
      time: "19:00",
      image: "/images/events/1.jpg"
    },
    { 
      id: 2, 
      name: "Мастер-класс по рунам", 
      date: "20 апреля", 
      time: "18:30",
      image: "/images/events/2.jpg"
    },
    { 
      id: 3, 
      name: "Групповая медитация", 
      date: "25 апреля", 
      time: "20:00",
      image: "/images/events/3.jpg"
    },
  ]

  const popularArticles: Article[] = [
    { 
      id: 1, 
      title: "Как правильно начать практику медитации",
      image: "/images/blog/1.jpg",
      excerpt: "Советы для новичков в медитации, которые помогут начать этот путь без стресса и разочарований."
    },
    { 
      id: 2, 
      title: "Значение и толкование основных карт Таро",
      image: "/images/blog/2.jpg",
      excerpt: "Базовое понимание старших арканов и их влияние на наше восприятие ситуаций."
    },
    { 
      id: 3, 
      title: "Энергетические практики для ежедневного применения",
      image: "/images/blog/3.jpg",
      excerpt: "Простые упражнения, которые можно включить в свой распорядок для поддержания энергетического баланса."
    },
  ]

  const handleOpenServiceDetails = (service: Service) => {
    setActiveService(service);
    setShowBottomSheet(true);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition z-50"
        aria-label="Переключить тему"
      >
        {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
      </button>
      
      <div className="p-4 pt-6 max-w-4xl mx-auto">
        <LogoBadge />
        <header className="mb-4">
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base">Центр духовного развития и практик</p>
        </header>

        {/* Главное изображение с наложенным названием */}
        <div className="mb-8 p-2 rounded-[1.5rem] bg-white/50 dark:bg-gray-800/30 shadow-lg">
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
              <div 
                className="frosted-band inline-block px-4 py-2 md:px-12 md:py-5 rounded-xl md:rounded-2xl cursor-pointer relative mx-auto text-center"
                onClick={() => setShowTooltip(!showTooltip)}
                style={{ maxWidth: 'fit-content' }}
              >
                <h2 className="text-base md:text-5xl font-bold text-white drop-shadow-md tracking-wider neon-text whitespace-nowrap text-center px-1">
                  ВДОХНОВЕНИЕ
                </h2>
                
                {/* Иконка информации */}
                <div className="absolute top-1 right-1 md:top-2 md:right-2">
                  <div className="bg-white/30 rounded-full w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
                    <Info className="w-2 h-2 md:w-4 md:h-4 text-white" />
                  </div>
                </div>
              
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

        {/* Популярные услуги в виде свайп-карусели */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Популярные услуги</h2>
            <Link href="/services" className="text-sm badge badge-blue flex items-center">
              Все <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          <SwipeCarousel>
            {popularServices.map((service) => (
              <div key={service.id} className="min-w-[200px] w-[200px] glass-card shadow-sm transition-all duration-300 cursor-pointer" onClick={() => handleOpenServiceDetails(service)}>
                <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-md text-slate-700 dark:text-slate-300 mb-1">{service.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="badge badge-purple">{service.price}</span>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SwipeCarousel>
        </div>

        {/* Предстоящие события в виде свайп-карусели */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Предстоящие события</h2>
            <Link href="/events" className="text-sm badge badge-purple flex items-center">
              Все <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          <SwipeCarousel>
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="min-w-[240px] w-[240px] glass-card shadow-sm transition-all duration-300">
                  <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
                    <Image 
                      src={event.image} 
                      alt={event.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-md text-slate-700 dark:text-slate-300 mb-2 line-clamp-2">{event.name}</h3>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SwipeCarousel>
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/booking" className="glass-card p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Запись</h2>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Выбрать время</span>
            </div>
          </Link>

          <Link href="/blog" className="glass-card p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Блог</h2>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">{popularArticles.length} статей</span>
            </div>
          </Link>
        </div>

        {/* Первая консультация - баннер */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 glass-panel p-6 relative overflow-hidden shadow-md mb-8">
          <div className="relative z-10 md:max-w-lg md:mx-auto lg:max-w-xl">
            <h2 className="text-2xl font-semibold mb-3 text-slate-700 dark:text-slate-300">Первая консультация</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Начните свой путь с бесплатной 30-минутной консультацией</p>
            <Link href="/booking/consultation">
              <Button className="w-full gradient-button font-medium py-6" radius="xl">
                <Calendar className="mr-2 h-5 w-5" />
                Записаться
              </Button>
            </Link>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-20 animate-float">
            <Sparkles className="w-full h-full text-primary" />
          </div>
        </div>

        {/* Популярные статьи */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Интересные статьи</h2>
            <Link href="/blog" className="text-sm badge badge-pink flex items-center">
              Все <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularArticles.slice(0, 2).map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <div className="glass-card p-4 h-full flex flex-col transition-all duration-300 hover:shadow-md">
                  <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg text-slate-700 dark:text-slate-300 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ссылка на личный кабинет или регистрацию */}
        <div className="glass-panel p-6 relative overflow-hidden shadow-md mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Ваше пространство</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Войдите для доступа к вашим записям, избранным статьям и персональным рекомендациям</p>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="glass-button p-3">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Нижний Sheet для деталей услуги */}
        {showBottomSheet && activeService && (
          <BottomSheet onClose={() => setShowBottomSheet(false)}>
            <div className="p-4">
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                <Image 
                  src={activeService.image} 
                  alt={activeService.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">{activeService.name}</h2>
                <span className="badge badge-purple">{activeService.price}</span>
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>{activeService.duration}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{activeService.description}</p>
              <Link href={`/booking/${activeService.id}`}>
                <Button className="w-full gradient-button font-medium py-5" radius="xl">
                  Записаться на сеанс
                </Button>
              </Link>
            </div>
          </BottomSheet>
        )}
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



