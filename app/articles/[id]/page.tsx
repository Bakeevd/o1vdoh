import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, MessageSquare, Share2, Bookmark } from "lucide-react"
import GlassPanel from "@/components/glass-panel"
import { Button } from "@/components/ui/button"

type ArticleParams = {
  params: {
    id: string
  }
}

export default function ArticlePage({ params }: ArticleParams) {
  const id = Number.parseInt(params.id)

  // Mock article data
  const articles = [
    {
      id: 1,
      title: "Как правильно начать практику медитации",
      content: `
        <p>Медитация — это практика, которая помогает успокоить ум, снизить стресс и улучшить общее самочувствие. Для тех, кто только начинает свой путь, важно создать правильную основу.</p>
        
        <h2>Начните с малого</h2>
        <p>Не стремитесь сразу медитировать по часу. Начните с 5-10 минут ежедневно и постепенно увеличивайте время. Регулярность важнее продолжительности.</p>
        
        <h2>Создайте специальное место</h2>
        <p>Выделите в своём доме тихий уголок для медитации. Можно использовать подушку для медитации или удобный стул.</p>
        
        <h2>Выберите технику</h2>
        <p>Для начинающих хорошо подходит наблюдение за дыханием. Просто сосредоточьтесь на своём вдохе и выдохе, позволяя мыслям приходить и уходить без суждения.</p>
        
        <h2>Будьте терпеливы</h2>
        <p>Медитация — это навык, который развивается со временем. Не ожидайте мгновенных результатов и не критикуйте себя, если ваш ум блуждает.</p>
      `,
      image: "/placeholder.svg?height=400&width=600",
      author: "Елена",
      authorId: 1,
      date: "10 апреля 2024",
      likes: 24,
      comments: 5,
      categories: ["Практики", "Медитация"],
    },
    {
      id: 2,
      title: "Значение и толкование основных карт Таро",
      content: `
        <p>Таро — это древняя система символов, которая может помочь в самопознании и принятии решений. Старшие Арканы особенно значимы в колоде.</p>
        
        <h2>Шут (0)</h2>
        <p>Символизирует новые начинания, спонтанность и свободу от условностей. Шут напоминает нам о важности рисковать и доверять своему пути.</p>
        
        <h2>Маг (I)</h2>
        <p>Представляет сознательное направление энергии, мастерство и проявление. Маг учит нас, что у нас есть все необходимые инструменты для создания желаемой реальности.</p>
        
        <h2>Верховная Жрица (II)</h2>
        <p>Символизирует интуицию, тайны и подсознание. Она приглашает нас прислушаться к внутреннему голосу и довериться невидимому.</p>
        
        <h2>Императрица (III)</h2>
        <p>Представляет плодородие, изобилие и связь с природой. Императрица напоминает о важности заботы о себе и окружающих.</p>
      `,
      image: "/placeholder.svg?height=400&width=600",
      author: "Олег",
      authorId: 2,
      date: "5 апреля 2024",
      likes: 42,
      comments: 8,
      categories: ["Таро", "Обучение"],
    },
  ]

  const article = articles.find((a) => a.id === id) || articles[0]

  return (
    <div className="p-4 pb-20">
      <Link href="/articles" className="flex items-center text-warm-600 mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Назад к статьям
      </Link>

      <article>
        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>

        <header className="mb-6">
          <div className="flex flex-wrap gap-1 mb-2">
            {article.categories.map((category, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-700">
                {category}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <div className="flex justify-between items-center mt-2">
            <Link href={`/specialists/${article.authorId}`} className="text-sm text-warm-600">
              {article.author} • {article.date}
            </Link>
          </div>
        </header>

        <div className="prose prose-warm max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />

        <GlassPanel className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="glass" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{article.likes}</span>
              </Button>
              <Button variant="glass" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{article.comments}</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassPanel>

        <section>
          <h2 className="text-lg font-medium mb-3">Комментарии ({article.comments})</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/70 border border-warm-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-warm-200 flex items-center justify-center">
                  <span className="text-xs font-medium">МК</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Мария К.</div>
                  <div className="text-xs text-warm-500">8 апреля 2024</div>
                </div>
              </div>
              <p className="text-sm">
                Очень полезная статья! Начала практиковать медитацию по вашим советам, и уже чувствую результат.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/70 border border-warm-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-warm-200 flex items-center justify-center">
                  <span className="text-xs font-medium">АП</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Алексей П.</div>
                  <div className="text-xs text-warm-500">7 апреля 2024</div>
                </div>
              </div>
              <p className="text-sm">
                А что насчет медитации в движении? Можно ли об этом подробнее в следующей статье?
              </p>
            </div>
          </div>
          <Button variant="glass" className="w-full mt-4">
            Оставить комментарий
          </Button>
        </section>
      </article>
    </div>
  )
}

