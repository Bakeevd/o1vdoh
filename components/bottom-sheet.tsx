"use client"

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomSheetProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function BottomSheet({ children, onClose }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sheetRef.current && contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Анимация при монтировании
    if (sheetRef.current) {
      sheetRef.current.style.opacity = '0';
      sheetRef.current.style.transform = 'translateY(100%)';
      
      setTimeout(() => {
        if (sheetRef.current) {
          sheetRef.current.style.opacity = '1';
          sheetRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  
  const handleClose = () => {
    // Анимация закрытия
    if (sheetRef.current) {
      sheetRef.current.style.transform = 'translateY(100%)';
      sheetRef.current.style.opacity = '0';
      
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end justify-center">
      <div 
        ref={sheetRef}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg transition-all duration-300"
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
} 