"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
}

export default function Profile() {
  const [favorites, setFavorites] = useState<Article[]>([]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Личный кабинет</h1>
      <h2 className="text-xl mt-4">Избранные статьи</h2>
      <ul>
        {favorites.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      <Button className="mt-4">Добавить статью в избранное</Button>
    </div>
  );
} 