import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const services = [
    { id: 1, name: "Первая консультация", price: "Бесплатно", duration: "30 мин" },
    { id: 2, name: "ВсеЛенская терапия", price: "4000₽", duration: "2ч" },
    { id: 3, name: "Легализация правды", price: "4000₽", duration: "2ч" },
    { id: 4, name: "Таро", price: "2500₽", duration: "1ч" },
    { id: 5, name: "Регрессия", price: "4000₽", duration: "3ч" },
    { id: 6, name: "Нумерология", price: "от 1500₽", duration: "1ч" },
    { id: 7, name: "Ведическая Астрология", price: "2500₽", duration: "3ч" },
    { id: 8, name: "Руны", price: "2000₽", duration: "1ч" },
    { id: 9, name: "Волшебная лавка артефактов", price: "3500₽", duration: "1ч" },
    { id: 10, name: "PWS - Работа с подсознанием", price: "2000₽", duration: "3ч" },
    { id: 11, name: "Васту", price: "2000₽", duration: "1ч" },
  ]

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Услуги</h1>
        <p className="text-warm-600">Выберите услугу из нашего каталога</p>
      </header>

      <div className="grid gap-3">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <div className="p-4 rounded-lg bg-white/70 border border-warm-200 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium">{service.name}</h2>
                  <p className="text-warm-600 text-sm">{service.duration}</p>
                </div>
                <span className={`text-${service.id === 1 ? "accent" : "warm-800"} font-medium`}>{service.price}</span>
              </div>
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="glass">
                  Подробнее
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

