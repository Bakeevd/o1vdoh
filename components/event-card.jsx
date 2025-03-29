import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export function EventCard({ event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="min-w-[240px] w-[240px] glass-card shadow-sm transition-all duration-300 floating">
        <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.name} 
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-md text-slate-700 dark:text-slate-300 mb-2 line-clamp-2">{event.name}</h3>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-1">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>{event.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 