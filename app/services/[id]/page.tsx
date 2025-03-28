import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft } from "lucide-react"
import GlassPanel from "@/components/glass-panel"

type ServiceParams = {
  params: {
    id: string
  }
}

export default function ServiceDetailPage({ params }: ServiceParams) {
  const id = Number.parseInt(params.id)

  // Mocked data for now
  const services = [
    {
      id: 1,
      name: "Первая консультация",
      price: "Бесплатно",
      duration: "30 мин",
      description:
        "Первая ознакомительная консультация поможет определить, какие практики и методики будут наиболее эффективны именно для вас. На консультации вы сможете задать интересующие вопросы и получить общее представление о наших услугах.",
      specialists: [
        { id: 1, name: "Елена", photo: "/placeholder.svg?height=80&width=80" },
        { id: 2, name: "Олег", photo: "/placeholder.svg?height=80&width=80" },
      ],
    },
    {
      id: 2,
      name: "ВсеЛенская терапия",
      price: "4000₽",
      duration: "2ч",
      description:
        "ВсеЛенская терапия — это глубокая трансформационная работа, направленная на восстановление баланса энергии и гармонии. Данная практика помогает раскрыть потенциал человека и увидеть истинную причину текущих жизненных ситуаций.",
      specialists: [{ id: 1, name: "Елена", photo: "/placeholder.svg?height=80&width=80" }],
    },
    {
      id: 3,
      name: "Легализация правды",
      price: "4000₽",
      duration: "2ч",
      description:
        "Уникальная методика, которая помогает увидеть истинную реальность, скрываемую от нас. В процессе работы раскрываются глубинные аспекты вашей жизни, что позволяет сделать осознанный выбор и изменить направление жизненного пути.",
      specialists: [{ id: 1, name: "Елена", photo: "/placeholder.svg?height=80&width=80" }],
    },
    {
      id: 4,
      name: "Таро",
      price: "2500₽",
      duration: "1ч",
      description:
        "Таро — древняя система символов, которая помогает заглянуть за завесу будущего, разобраться в настоящем и проанализировать прошлое. Консультация поможет найти ответы на волнующие вопросы и получить рекомендации для принятия важных решений.",
      specialists: [
        { id: 2, name: "Олег", photo: "/placeholder.svg?height=80&width=80" },
        { id: 3, name: "Мария", photo: "/placeholder.svg?height=80&width=80" },
      ],
    },
    {
      id: 5,
      name: "Регрессия",
      price: "4000₽",
      duration: "3ч",
      description:
        "Регрессивная терапия — метод, который позволяет заглянуть в прошлые жизни или в раннее детство, чтобы найти причины текущих проблем. Процесс поможет обнаружить и устранить блоки, травмы и негативные программы, влияющие на вашу нынешнюю жизнь.",
      specialists: [{ id: 1, name: "Елена", photo: "/placeholder.svg?height=80&width=80" }],
    },
  ]

  const service = services.find((s) => s.id === id) || services[0]

  return (
    <div className="p-4 pb-20">
      <Link href="/services" className="flex items-center text-warm-600 mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Назад к услугам
      </Link>

      <header className="mb-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <span className="text-accent font-medium">{service.price}</span>
        </div>
        <div className="flex items-center text-warm-600 text-sm mt-1">
          <Clock className="w-4 h-4 mr-1" />
          <span>{service.duration}</span>
        </div>
      </header>

      <GlassPanel className="mb-6">
        <h2 className="text-lg font-medium mb-2">Описание</h2>
        <p className="text-warm-700">{service.description}</p>
      </GlassPanel>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-3">Специалисты</h2>
        <div className="grid grid-cols-2 gap-3">
          {service.specialists.map((specialist) => (
            <Link key={specialist.id} href={`/specialists/${specialist.id}`}>
              <div className="p-3 rounded-lg bg-white/70 border border-warm-200 hover:shadow-sm transition-shadow flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <Image
                    src={specialist.photo || "/placeholder.svg"}
                    alt={specialist.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{specialist.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Button variant="accent" className="w-full">
        <Calendar className="mr-2 h-4 w-4" />
        Записаться на приём
      </Button>
    </div>
  )
}

