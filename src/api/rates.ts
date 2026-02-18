export async function fetchRates(from: string, toList: string[]) {
  const url = `https://open.er-api.com/v6/latest/${from}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('Ошибка API');
    }

    const rates = data.rates as Record<string, number>;

    if (toList.length === 0) {
      return rates;
    }

    const result: Record<string, number> = {};
    for (const to of toList) {
      if (rates[to]) {
        result[to] = rates[to];
      }
    }

    return result;
  } catch (error) {
    console.error('Ошибка при получении курсов:', error);
    return {};
  }
}
