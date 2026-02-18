import { useEffect, useState } from 'react';

const KEY = 'favoriteCurrencies';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (code: string) => {
    setFavorites(prev => {
      const exists = prev.includes(code);
      const next = exists ? prev.filter(c => c !== code) : [...prev, code];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { favorites, toggleFavorite };
}
