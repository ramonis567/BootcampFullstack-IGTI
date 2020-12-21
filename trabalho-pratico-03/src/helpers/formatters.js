const moneyFormatter = Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL"
});

function formatMoney(value){
  return moneyFormatter.format(value);
}

function formatPercent(value){
  return `${value.replace(".",",")}%`;
}

export { formatMoney, formatPercent };