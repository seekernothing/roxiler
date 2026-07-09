import { useState } from "react";
import { setRating } from "../api/userApi";

export default function RatingStars({
  storeId,
  myRating,
  onRated,
}: {
  storeId: number;
  myRating: number | null;
  onRated: () => void;
}) {
  const [hover, setHover] = useState(0);

  async function submit(value: number) {
    await setRating(storeId, value);
    onRated();
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => submit(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-colors ${
            star <= (hover || myRating || 0) ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}