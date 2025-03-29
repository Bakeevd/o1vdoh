import Image from 'next/image';
import { Clock } from 'lucide-react';

export function ServiceCard({ service, onClick }) {
  return (
    <div 
      className="min-w-[200px] w-[200px] glass-card shadow-sm transition-all duration-300 floating cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-32 w-full rounded-t-xl overflow-hidden">
        <Image 
          src={service.image} 
          alt={service.name} 
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-md text-slate-700 dark:text-slate-300 mb-1">{service.name}</h3>
        <div className="flex justify-between items-center">
          <span className="badge badge-purple">{service.price}</span>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 