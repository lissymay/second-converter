import React, { useEffect, useState } from 'react';
import { useBaseCurrency } from '../hooks/useBaseCurrency';
import { useFavorites } from '../hooks/useFavorites';
import { fetchCurrencies } from '../api/currencies';
import { fetchRates } from '../api/rates';
import { CurrencySelect } from '../components/CurrencySelect';
import { RatesTable } from '../components/RatesTable';
import './Page.css';

const RatesPage: React.FC = () => {
  const { baseCurrency, setBaseCurrency } = useBaseCurrency();
  const { favorites, toggleFavorite } = useFavorites();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  const loadRates = () => {
    if (!baseCurrency) return;
    fetchRates(baseCurrency, []).then(setRates).catch(console.error);
  };

  useEffect(() => {
    loadRates();
  }, [baseCurrency]);

  return (
    <div className="page">
      <h1>Текущие курсы</h1>
      <CurrencySelect
        label="Базовая валюта"
        value={baseCurrency}
        onChange={setBaseCurrency}
        options={currencies}
      />
      <RatesTable
        base={baseCurrency}
        rates={rates}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onUpdateRates={loadRates}
      />
    </div>
  );
};

export default RatesPage;
