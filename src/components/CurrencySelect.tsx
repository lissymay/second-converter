import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label?: string;
};

export const CurrencySelect: React.FC<Props> = ({ value, onChange, options, label }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {label && <span>{label}</span>}
    <select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(code => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  </label>
);
