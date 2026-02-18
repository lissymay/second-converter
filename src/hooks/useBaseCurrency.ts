import { useLayoutEffect, useState } from 'react';

const KEY = 'baseCurrency';

export function useBaseCurrency(defaultValue = 'EUR') {
  const [baseCurrency, setBaseCurrency] = useState(defaultValue);

  useLayoutEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setBaseCurrency(saved);
  }, []);

  const update = (value: string) => {
    setBaseCurrency(value);
    localStorage.setItem(KEY, value);
  };

  return { baseCurrency, setBaseCurrency: update };
}
