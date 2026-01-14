const FormatAmount = (amount) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default FormatAmount;
