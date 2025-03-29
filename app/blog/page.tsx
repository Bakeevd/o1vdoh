"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Heart, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Article {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  favorite?: boolean;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [articles, setArticles] = useState<Article[]>([
    { 
      id: 1, 
      title: "Как правильно начать практику медитации",
      image: "/images/blog/1.jpg",
      excerpt: "Советы для новичков в медитации, которые помогут начать этот путь без стресса и разочарований.",
      category: "Медитация",
      date: "10 апреля 2023",
      author: "Анна Светлова",
      favorite: false
    },
    { 
      id: 2, 
      title: "Значение и толкование основных карт Таро",
      image: "/images/blog/2.jpg",
      excerpt: "Базовое понимание старших арканов и их влияние на наше восприятие ситуаций.",
      category: "Таро",
      date: "15 марта 2023",
      author: "Мария Тарова",
      favorite: true
    },
    { 
      id: 3, 
      title: "Энергетические практики для ежедневного применения",
      image: "/images/blog/3.jpg",
      excerpt: "Простые упражнения, которые можно включить в свой распорядок для поддержания энергетического баланса.",
      category: "Практики",
      date: "22 февраля 2023",
      author: "Светлана Энергина",
      favorite: false
    },
    { 
      id: 4, 
      title: "Регрессия в прошлые жизни: что нужно знать",
      image: "/images/blog/4.jpg",
      excerpt: "Исследование метода регрессии и его польза для личностного развития и исцеления.",
      category: "Регрессия",
      date: "5 января 2023",
      author: "Ольга Вечная",
      favorite: false
    },
    { 
      id: 5, 
      title: "Астрологические аспекты 2023 года",
      image: "/images/blog/5.jpg",
      excerpt: "Какие планетарные события ожидают нас в этом году и как они могут повлиять на вашу жизнь.",
      category: "Астрология",
      date: "30 декабря 2022",
      author: "Игорь Звездин",
      favorite: false
    },
  ]);
  
  const categories = ["Все", "Медитация", "Таро", "Практики", "Регрессия", "Астрология"];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Все" || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleFavorite = (id: number) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === id 
          ? { ...article, favorite: !article.favorite } 
          : article
      )
    );
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
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-6">Блог</h1>
      
      {/* Поиск и фильтры */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input 
            type="text"
            placeholder="Поиск статей..." 
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
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Список статей */}
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="glass-card overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-1/3">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="badge badge-blue">{article.category}</span>
                  <Button 
                    variant="ghost" 
                    className="p-1 -mr-1 -mt-1" 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(article.id);
                    }}
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        article.favorite 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-slate-400'
                      }`} 
                    />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">{article.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-grow">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <Link href={`/blog/${article.id}`}>
                    <Button variant="link" className="text-primary p-0">
                      Читать
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Если нет статей */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Статьи не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      )}
    </div>
  )
} 