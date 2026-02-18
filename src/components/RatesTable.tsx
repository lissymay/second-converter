import React from 'react';

type Props = {
  base: string;
  rates: Record<string, number>;
  favorites: string[];
  toggleFavorite: (code: string) => void;
};

export const RatesTable: React.FC<Props> = ({ base, rates, favorites, toggleFavorite }) => {
  const entries = Object.entries(rates).sort(([a], [b]) => a.localeCompare(b));

  const sorted = [
    ...entries.filter(([code]) => favorites.includes(code)),
    ...entries.filter(([code]) => !favorites.includes(code)),
  ];

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px' }}>★ Валюта</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Курс к {base}</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(([code, rate]) => (
          <tr key={code}>
            <td style={{ padding: '8px', cursor: 'pointer' }} onClick={() => toggleFavorite(code)}>
              {favorites.includes(code) ? '★' : '☆'} {code}
            </td>
            <td style={{ padding: '8px' }}>{rate.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
