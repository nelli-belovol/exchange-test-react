const getForeignCcy = (currency, getCcy, giveValue) => {
  let coeffGive = 0;
  currency.forEach(item =>
    item.ccy === getCcy ? (coeffGive = item.sale) : null,
  );
  const res = Number(giveValue) / coeffGive;
  return res;
};

const getLocalCcy = (currency, giveCcy, giveValue) => {
  let coeffGive = 0;
  currency.forEach(item =>
    item.ccy === giveCcy ? (coeffGive = item.buy) : null,
  );
  const res = Number(giveValue) * coeffGive;
  return res;
};

const getFromForeignToForeign = (currency, giveCcy, getCcy, giveValue) => {
  let coeffGive = 0;
  let coeffGet = 0;
  currency.forEach(item =>
    item.ccy === giveCcy ? (coeffGive = item.buy) : null,
  );
  currency.forEach(item =>
    item.ccy === getCcy ? (coeffGet = item.sale) : null,
  );
  const quantityUAH = Number(giveValue) * coeffGive;
  const res = quantityUAH / coeffGet;
  return res;
};

export const resultObtained = {
  getForeignCcy,
  getLocalCcy,
  getFromForeignToForeign,
};

const giveForeignCcy = (currency, giveCcy, getValue) => {
  let coeff = 0;
  currency.forEach(item => (item.ccy === giveCcy ? (coeff = item.buy) : null));
  const res = Number(getValue) / coeff;
  return res;
};

const giveLocalCcy = (currency, getCcy, getValue) => {
  let coeffGet = 0;
  currency.forEach(item =>
    item.ccy === getCcy ? (coeffGet = item.sale) : null,
  );
  const res = Number(getValue) * coeffGet;
  return res;
};

const giveFromForeignToForeign = (currency, giveCcy, getCcy, getValue) => {
  let coeffGive = 0;
  let coeffGet = 0;
  currency.forEach(item =>
    item.ccy === giveCcy ? (coeffGive = item.buy) : null,
  );
  currency.forEach(item =>
    item.ccy === getCcy ? (coeffGet = item.sale) : null,
  );
  const quantityUAH = Number(getValue) * coeffGet;
  const res = quantityUAH / coeffGive;
  return res;
};

export const resultInitial = {
  giveForeignCcy,
  giveLocalCcy,
  giveFromForeignToForeign,
};
