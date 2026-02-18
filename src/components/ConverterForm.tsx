import React, { useEffect, useState } from 'react';
import { CurrencySelect } from './CurrencySelect';
import { fetchCurrencies } from '../api/currencies';
import { fetchRates } from '../api/rates';

type Props = {
  baseCurrency: string;
};

export const ConverterForm: React.FC<Props> = ({ baseCurrency }) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [from, setFrom] = useState(baseCurrency);
  const [to, setTo] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    fetchCurrencies().then(setCurrencies);
  }, []);

  useEffect(() => {
    setFrom(baseCurrency);
  }, [baseCurrency]);

  const handleConvert = async () => {
    if (!from || !to || amount <= 0) {
      setResult(null);
      return;
    }

    if (from === to) {
      setResult(amount);
      return;
    }

    try {
      const rates = await fetchRates(from, [to]);
      const rate = rates[to];

      if (rate) {
        setResult(amount * rate);
      } else {
        console.warn('Курс не найден:', from, '→', to, rates);
        setResult(null);
      }
    } catch (error) {
      console.error('Ошибка при конвертации:', error);
      setResult(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <CurrencySelect
        label="Из"
        value={from}
        onChange={setFrom}
        options={currencies}
      />
      <CurrencySelect
        label="В"
        value={to}
        onChange={setTo}
        options={currencies}
      />
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span>Сумма</span>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </label>
      <button onClick={handleConvert}>Конвертировать</button>
      {result !== null && (
        <div>
          {amount} {from} = {result.toFixed(4)} {to}
        </div>
      )}
    </div>
  );
};
