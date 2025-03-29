"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomSheet } from "@/components/bottom-sheet"

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  category: string;
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Все");
  const [showFilters, setShowFilters] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    { 
      id: 1, 
      name: "ВсеЛенская терапия", 
      price: "4000₽", 
      duration: "2ч",
      image: "/images/services/1.jpg",
      description: "Уникальная терапия, объединяющая древние техники и современные методики для глубинной трансформации личности.",
      category: "Терапия"
    },
    { 
      id: 2, 
      name: "Таро", 
      price: "2500₽", 
      duration: "1ч",
      image: "/images/services/2.jpg",
      description: "Глубинный анализ ситуации через карты Таро, позволяющий получить ответы на важные жизненные вопросы.",
      category: "Предсказания"
    },
    { 
      id: 3, 
      name: "Регрессия", 
      price: "4000₽", 
      duration: "3ч",
      image: "/images/services/3.jpg",
      description: "Путешествие в прошлые воплощения для исцеления травм и раскрытия скрытых талантов и потенциала.",
      category: "Терапия"
    },
    { 
      id: 4, 
      name: "Медитации", 
      price: "1500₽", 
      duration: "1ч",
      image: "/images/services/4.jpg",
      description: "Групповые и индивидуальные медитации для гармонизации энергетических центров и внутреннего баланса.",
      category: "Практики"
    },
    { 
      id: 5, 
      name: "Духовная консультация", 
      price: "3500₽", 
      duration: "1.5ч",
      image: "/images/services/5.jpg",
      description: "Индивидуальная консультация по вопросам духовного развития, кармы и предназначения.",
      category: "Консультации"
    },
    { 
      id: 6, 
      name: "Космоэнергетика", 
      price: "3000₽", 
      duration: "1ч",
      image: "/images/services/6.jpg",
      description: "Работа с космическими энергиями для гармонизации, очищения и оздоровления энергетических структур.",
      category: "Практики"
    },
  ];

  const categories = ["Все", "Терапия", "Практики", "Консультации", "Предсказания"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === "Все" || service.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const openServiceDetails = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  return (
    <div className="p-4 pt-6 max-w-4xl mx-auto">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <ArrowLeft className="h-5 w-5 mr-2 text-slate-500" />
            <span className="text-slate-500">Назад</span>
          </Button>
        </Link>
      </div>
      
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-6">Услуги</h1>
      
      {/* Поиск и фильтры */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input 
            type="text"
            placeholder="Поиск услуг..." 
            className="pl-10 py-6 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar py-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeFilter === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300'
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
          
          <button
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>
      
      {/* Список услуг */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="glass-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
            onClick={() => openServiceDetails(service)}
          >
            <div className="relative h-40 w-full">
              <Image 
                src={service.image} 
                alt={service.name} 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-slate-700 dark:text-slate-300 mb-2">{service.name}</h3>
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
      </div>
      
      {/* Нижний лист для фильтров */}
      {showFilters && (
        <BottomSheet onClose={() => setShowFilters(false)}>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Фильтры</h2>
            <div className="flex flex-col space-y-2">
              <h3 className="text-md font-medium text-slate-600 dark:text-slate-400">Категории</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      activeFilter === category 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300'
                    }`}
                    onClick={() => {
                      setActiveFilter(category);
                      setShowFilters(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => setShowFilters(false)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </BottomSheet>
      )}
      
      {/* Детали услуги */}
      {showServiceDetails && selectedService && (
        <BottomSheet onClose={() => setShowServiceDetails(false)}>
          <div className="p-4">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image 
                src={selectedService.image} 
                alt={selectedService.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">{selectedService.name}</h2>
              <span className="badge badge-purple">{selectedService.price}</span>
            </div>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>{selectedService.duration}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{selectedService.description}</p>
            <Link href={`/booking/${selectedService.id}`}>
              <Button className="w-full gradient-button font-medium py-5" radius="xl">
                Записаться на сеанс
              </Button>
            </Link>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}

