import Link from 'next/link'
import Image from 'next/image'

export function LogoBadge() {
  return (
    <Link href="/" className="fixed top-4 left-0 z-50">
      <div className="glass-badge pl-2 pr-3 py-1.5 rounded-r-full hover:scale-105 transition-transform">
        <Image 
          src="/150x150.png" 
          alt="Вдохновение" 
          width={40} 
          height={40} 
          className="w-[40px] h-[40px]"
        />
      </div>
    </Link>
  )
} 