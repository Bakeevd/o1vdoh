"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, SearchIcon } from "lucide-react"

export default function AdminPage() {
  const isAdmin = true;
  
  if (!isAdmin) {
    return (
      <div className="p-4 pt-12 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Доступ запрещен</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          У вас нет прав для доступа к панели администратора.
        </p>
        <Link href="/">
          <button className="gradient-button">
            На главную
          </button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white dark:bg-gray-900 shadow-md hidden md:block p-4">
        <div className="mb-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-primary">Вдохновение</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Панель управления</p>
          </Link>
        </div>
        
        <nav className="space-y-1">
          <Link href="/admin" className="flex items-center py-3 px-4 rounded-lg bg-primary/10 text-primary">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            <span>Обзор</span>
          </Link>
          
          <Link href="/admin/specialists" className="flex items-center py-3 px-4 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Users className="h-5 w-5 mr-3" />
            <span>Специалисты</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4 sm:mb-0">Панель управления</h1>
          
          <div className="relative w-full sm:w-auto">
            <input 
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>
        
        <Tabs defaultValue="specialists" className="mb-8">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="specialists" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Специалисты
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-1">
              <BookOpen className="h-4 w-4 mr-2" />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1">
              <CalendarClock className="h-4 w-4 mr-2" />
              Записи
            </TabsTrigger>
          </TabsList>
          
          {/* Вкладка со специалистами */}
          <TabsContent value="specialists">
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Специалист
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Рейтинг
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {specialists.map((specialist) => (
                    <tr key={specialist.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image 
                              src={specialist.avatar} 
                              alt={specialist.name} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{specialist.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{specialist.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900 dark:text-gray-100">{specialist.rating}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({specialist.reviewsCount})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(specialist.status)}`}>
                          {getStatusLabel(specialist.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Вкладка с услугами */}
          <TabsContent value="services">
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Услуга
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Категория
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Цена
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{service.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{service.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{service.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{service.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(service.status)}`}>
                          {getStatusLabel(service.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Вкладка с записями */}
          <TabsContent value="bookings">
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Клиент
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Услуга
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Дата и время
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{booking.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{booking.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{booking.date}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 