export default function Sidebar() {
  return (
    <nav className="sidebar">
      <Link href="/profile">Личный кабинет</Link>
      <Link href="/services">Услуги</Link>
      <Link href="/articles">Статьи</Link>
      <Link href="/events">События</Link>
    </nav>
  );
} 

@media (max-width: 768px) {
  .glass-card {
    padding: 2rem;
  }
} 

.glass-card {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5); /* Полупрозрачный фон */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Тень */
  border-radius: 10px; /* Скругление углов */
} 