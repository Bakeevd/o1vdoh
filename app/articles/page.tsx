import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Heart, MessageSquare } from "lucide-react"

export default function ArticlesPage() {
  // Mock articles data
  const articles = [
    {
      id: 1,
      title: "Как правильно начать практику медитации",
      excerpt: "Подробное руководство для начинающих: как создать регулярную практику медитации.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Елена",
      date: "10 апреля 2024",
      likes: 24,
      comments: 5,
      categories: ["Практики", "Медитация"],
    },
    {
      id: 2,
      title: "Значение и толкование основных карт Таро",
      excerpt: "Изучаем Старшие Арканы: их символизм и значения в различных раскладах.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Олег",
      date: "5 апреля 2024",
      likes: 42,
      comments: 8,
      categories: ["Таро", "Обучение"],
    },
    {
      id: 3,
      title: "Руны: история и современное применение",
      excerpt: "От древних скандинавов до наших дней: как руны стали мощным инструментом для саморазвития.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Мария",
      date: "28 марта 2024",
      likes: 18,
      comments: 3,
      categories: ["Руны", "История"],
    },
    {
      id: 4,
      title: "Принципы васту: гармония пространства",
      excerpt: "Как организовать пространство согласно древним принципам васту для привлечения благополучия.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Александр",
      date: "22 марта 2024",
      likes: 15,
      comments: 4,
      categories: ["Васту", "Практики"],
    },
  ]

  // Mock categories
  const categories = ["Все", "Практики", "Таро", "Руны", "Медитация", "Васту", "Нумерология", "Астрология"]

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Статьи</h1>
        <p className="text-warm-600">Полезные материалы от наших специалистов</p>
      </header>

      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Поиск статей..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-warm-200 bg-white/70 focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-warm-500" />
      </div>

      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {categories.map((category, index) => (
          <Button key={index} variant={index === 0 ? "accent" : "glass"} size="sm" className="whitespace-nowrap">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <div className="bg-white/70 rounded-lg border border-warm-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 w-full">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {article.categories.map((category, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-700">
                      {category}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
                <p className="text-warm-600 text-sm mb-3">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-warm-500">
                    {article.author} • {article.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-warm-500 text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      {article.likes}
                    </div>
                    <div className="flex items-center text-warm-500 text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {article.comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

