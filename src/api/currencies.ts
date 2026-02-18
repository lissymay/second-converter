export async function fetchCurrencies(): Promise<string[]> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('Ошибка при получении валют');
    }

    return Object.keys(data.rates);
  } catch (error) {
    console.error('Ошибка загрузки валют:', error);
    return [];
  }
}
