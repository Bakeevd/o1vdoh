import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  text: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div>
      <h2>Отзывы</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.text}</li>
        ))}
      </ul>
      <Button onClick={() => {/* логика добавления отзыва */}}>Оставить отзыв</Button>
    </div>
  );
} 