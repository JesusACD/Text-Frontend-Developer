function formatCurrency(total, currency = "COP") {
  const currencyFormat = {
    style: "currency",
    currency: currency,
  };
  return `${Intl.NumberFormat("es-ES", currencyFormat).format(total)}`;
}

// export function formatNumber(quantity, price, decimales = 2) {
//   let result = quantity * price;
//   let numeroRegexp = new RegExp("\\d\\.(\\d){" + decimales + ",}"); // Agregamos el let aqui
//   if (numeroRegexp.test(result)) {
//     // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
//     return Number(result.toFixed(decimales));
//   } else {
//     return Number(result.toFixed(decimales)) === 0 ? 0 : result; // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
//   }
// }

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
