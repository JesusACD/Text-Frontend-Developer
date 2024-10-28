export function formatNumber(quantity, price, decimales = 2) {
  let result = quantity * price;
  return (
    Math.round((result + Number.EPSILON) * Math.pow(10, decimales)) /
    Math.pow(10, decimales)
  );
}

export const showSubtotal = (price, currency) => {
  if (price > 0) {
    return `${price} ${currency}`;
  }
  return price;
};
