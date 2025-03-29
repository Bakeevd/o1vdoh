"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, User, Heart, Calendar, Clock, Star, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Booking {
  id: number;
  serviceName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  specialistName: string;
  specialistAvatar: string;
  price: string;
}

interface FavoriteArticle {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
}

export default function ProfilePage() {
  const user = {
    name: "Владимир Бакеев",
    email: "bakeevd@yandex.ru",
    avatar: "/images/avatars/user.jpg",
    phone: "+7 (999) 123-45-67"
  };
  
  const bookings: Booking[] = [
    {
      id: 1,
      serviceName: "ВсеЛенская терапия",
      date: "15 апреля 2023",
      time: "14:00",
      status: "upcoming",
      specialistName: "Анна Светлова",
      specialistAvatar: "/images/specialists/1.jpg",
      price: "4000₽"
    },
    {
      id: 2,
      serviceName: "Таро",
      date: "10 марта 2023",
      time: "16:30",
      status: "completed",
      specialistName: "Мария Тарова",
      specialistAvatar: "/images/specialists/2.jpg",
      price: "2500₽"
    },
    {
      id: 3,
      serviceName: "Медитация",
      date: "15 февраля 2023",
      time: "18:00",
      status: "cancelled",
      specialistName: "Светлана Энергина",
      specialistAvatar: "/images/specialists/3.jpg",
      price: "1500₽"
    }
  ];
  
  const favoriteArticles: FavoriteArticle[] = [
    {
      id: 2,
      title: "Значение и толкование основных карт Таро",
      image: "/images/blog/2.jpg",
      excerpt: "Базовое понимание старших арканов и их влияние на наше восприятие ситуаций.",
      date: "15 марта 2023"
    }
  ];
  
  const getStatusBadgeClass = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getStatusLabel = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return "Предстоит";
      case "completed":
        return "Завершено";
      case "cancelled":
        return "Отменено";
      default:
        return "Неизвестно";
    }
  };
  
  return (
    <div className="p-4 pt-6 max-w-4xl mx-auto">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <ArrowLeft className="h-5 w-5 mr-2 text-slate-500" />
            <span className="text-slate-500">На главную</span>
          </Button>
        </Link>
      </div>
      
      {/* Профиль пользователя */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden">
            <Image 
              src={user.avatar} 
              alt={user.name} 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-1">{user.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{user.email}</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Link href="/profile/edit">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </Link>
              
              <Button variant="outline" size="sm" className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Вкладки */}
      <Tabs defaultValue="bookings" className="mb-8">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="bookings" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Мои записи
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Избранное
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Ваши записи</h2>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="glass-card overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg text-slate-700 dark:text-slate-300">{booking.serviceName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                        <Image 
                          src={booking.specialistAvatar} 
                          alt={booking.specialistName} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{booking.specialistName}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{booking.price}</span>
                  </div>
                </div>
                
                {booking.status === "upcoming" && (
                  <div className="flex border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 py-2 text-center text-sm text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Перенести
                    </button>
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                    <button className="flex-1 py-2 text-center text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Отменить
                    </button>
                  </div>
                )}
                
                {booking.status === "completed" && (
                  <div className="flex border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 py-2 text-center text-sm text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Оставить отзыв
                    </button>
                    <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                    <button className="flex-1 py-2 text-center text-sm text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Записаться снова
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {bookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 mb-4">У вас пока нет записей</p>
              <Link href="/services">
                <Button className="gradient-button">
                  Записаться на сеанс
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Избранные статьи</h2>
          
          <div className="space-y-4">
            {favoriteArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-40 md:h-auto md:w-1/3">
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5 md:w-2/3 flex flex-col">
                      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">{article.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-grow">{article.excerpt}</p>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {favoriteArticles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 mb-4">У вас пока нет избранных статей</p>
              <Link href="/blog">
                <Button className="gradient-button">
                  Перейти в блог
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

