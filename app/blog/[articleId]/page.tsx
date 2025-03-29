"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Calendar, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
  favorite?: boolean;
  readTime: string;
}

export default function ArticlePage() {
  const params = useParams();
  const articleId = parseInt(params.articleId as string);
  
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Имитация загрузки данных статьи с сервера
    const fetchArticle = async () => {
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        setArticle({
          id: articleId,
          title: "Как правильно начать практику медитации",
          image: "/images/blog/1.jpg",
          content: `
            <p>Медитация стала одной из самых популярных практик для улучшения психического здоровья и общего благополучия. Однако многие новички сталкиваются с трудностями, когда начинают свой путь в медитации.</p>
            
            <h2>Что такое медитация?</h2>
            <p>Медитация — это практика тренировки внимания и осознанности, а также достижения ментальной ясности и эмоционального спокойствия. Существует множество форм медитации, но большинство из них включают в себя нахождение в тихом месте, фокусировку на дыхании и перенаправление внимания от отвлекающих мыслей.</p>
            
            <h2>Подготовка к практике</h2>
            <p>Перед тем как начать медитировать, важно создать комфортную обстановку. Выберите тихое место, где вас не будут беспокоить. Наденьте удобную одежду и выберите удобную позу для сидения — это может быть как традиционная поза лотоса, так и простое сидение на стуле.</p>
            
            <h2>Первые шаги</h2>
            <p>Начните с коротких сессий медитации, примерно по 5-10 минут. Постепенно увеличивайте продолжительность по мере того, как будете чувствовать себя более комфортно. Не стремитесь к совершенству с самого начала — медитация это навык, который развивается со временем.</p>
            
            <h2>Типы медитации для начинающих</h2>
            <ul>
              <li><strong>Медитация дыхания:</strong> Сфокусируйтесь на своем дыхании, наблюдая за вдохами и выдохами.</li>
              <li><strong>Сканирование тела:</strong> Последовательно направляйте внимание на разные части тела, начиная от макушки головы и заканчивая пальцами ног.</li>
              <li><strong>Медитация любящей доброты:</strong> Отправляйте пожелания счастья и благополучия себе и другим.</li>
            </ul>
            
            <h2>Преимущества регулярной практики</h2>
            <p>Регулярная медитация может помочь уменьшить стресс, улучшить концентрацию, повысить самосознание и способствовать общему чувству благополучия. Исследования также показывают, что она может положительно влиять на физическое здоровье, улучшая кровяное давление и помогая с хроническими болями.</p>
            
            <h2>Заключение</h2>
            <p>Помните, что медитация — это путешествие, а не пункт назначения. Будьте терпеливы с собой и наслаждайтесь процессом. Даже несколько минут ежедневной практики могут принести значительные преимущества.</p>
          `,
          category: "Медитация",
          date: "10 апреля 2023",
          author: "Анна Светлова",
          authorAvatar: "/images/authors/1.jpg",
          favorite: false,
          readTime: "5 мин"
        });
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchArticle();
  }, [articleId]);
  
  const toggleFavorite = () => {
    if (article) {
      setArticle({
        ...article,
        favorite: !article.favorite
      });
    }
  };
  
  if (isLoading || !article) {
    return (
      <div className="p-4 pt-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-64 mb-6"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 pt-6 max-w-4xl mx-auto">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <ArrowLeft className="h-5 w-5 mr-2 text-slate-500" />
            <span className="text-slate-500">Назад к блогу</span>
          </Button>
        </Link>
      </div>
      
      {/* Заголовок и мета-информация */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <span className="badge badge-blue">{article.category}</span>
          <Button 
            variant="ghost" 
            className="p-1" 
            onClick={toggleFavorite}
          >
            <Heart 
              className={`h-6 w-6 ${
                article.favorite 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-slate-400'
              }`} 
            />
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 mb-2 gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{article.author}</span>
          </div>
          <div>
            <span>{article.readTime} чтения</span>
          </div>
        </div>
      </div>
      
      {/* Изображение */}
      <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill
          className="object-cover"
        />
      </div>
      
      {/* Содержание статьи */}
      <div className="glass-card p-6 mb-8">
        <div className="prose prose-slate dark:prose-invert prose-img:rounded-xl prose-headings:text-slate-700 dark:prose-headings:text-slate-300 prose-a:text-primary max-w-none"
             dangerouslySetInnerHTML={{ __html: article.content }}>
        </div>
      </div>
      
      {/* Автор и кнопки действий */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image 
              src={article.authorAvatar} 
              alt={article.author} 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-slate-700 dark:text-slate-300">{article.author}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Автор статьи</p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Эксперт в области медитации и духовных практик с опытом более 10 лет. Проводит индивидуальные и групповые занятия.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Поделиться
          </Button>
          <Button className="flex-1 gradient-button">
            Другие статьи автора
          </Button>
        </div>
      </div>
      
      {/* Рекомендуемые статьи будут здесь */}
    </div>
  )
} 