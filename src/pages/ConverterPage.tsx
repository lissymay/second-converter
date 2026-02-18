import React from 'react';
import { useBaseCurrency } from '../hooks/useBaseCurrency';
import { ConverterForm } from '../components/ConverterForm';
import './Page.css';

const ConverterPage: React.FC = () => {
  const { baseCurrency } = useBaseCurrency();

  return (
    <div className="page">
      <h1>Конвертер валют</h1>
      <ConverterForm baseCurrency={baseCurrency} />
    </div>
  );
};

export default ConverterPage;
