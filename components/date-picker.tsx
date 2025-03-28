"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  availableDates?: Date[]
  className?: string
}

export function DatePicker({ selectedDate, onDateSelect, availableDates = [], className }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  // Format date as YYYY-MM-DD for comparison
  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  // Check if date is available
  const isDateAvailable = (date: Date) => {
    if (availableDates.length === 0) return true
    return availableDates.some(
      (availableDate) => formatDateForComparison(availableDate) === formatDateForComparison(date),
    )
  }

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return formatDateForComparison(date) === formatDateForComparison(today)
  }

  // Check if date is selected
  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return formatDateForComparison(date) === formatDateForComparison(selectedDate)
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() - 1)
      return newDate
    })
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    onDateSelect(date)
    setIsOpen(false)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />)
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const available = isDateAvailable(date)

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => available && handleDateSelect(date)}
          disabled={!available}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors",
            isSelected(date) && "bg-accent text-white",
            isToday(date) && !isSelected(date) && "border border-accent text-accent",
            !available && "text-warm-300 cursor-not-allowed",
            available && !isSelected(date) && !isToday(date) && "hover:bg-warm-100",
          )}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString("ru", { month: "long", year: "numeric" })
  }

  return (
    <div className={className}>
      <div className="relative">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          {selectedDate
            ? selectedDate.toLocaleDateString("ru", { day: "numeric", month: "long", year: "numeric" })
            : "Выберите дату"}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-2 w-full bg-white rounded-lg shadow-lg p-3 border border-warm-200">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="p-1 rounded-full hover:bg-warm-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="font-medium">{formatMonthYear(currentMonth)}</div>
              <button onClick={nextMonth} className="p-1 rounded-full hover:bg-warm-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                <div key={day} className="h-8 flex items-center justify-center text-xs text-warm-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
          </div>
        )}
      </div>
    </div>
  )
}

