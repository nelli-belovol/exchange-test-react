import axios from 'axios';

axios.defaults.baseURL =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';

export async function getDataCurrency() {
  const res = await axios.get();

  res.data.forEach(item => {
    item.buy = +Number(item.buy).toFixed(2);
    item.sale = +Number(item.sale).toFixed(2);
  });

  return res.data;
}
