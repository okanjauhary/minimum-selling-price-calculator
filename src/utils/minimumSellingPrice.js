export default function (product) {
  const { additionalFee, priceUnit, totalProduct, rejectionPersentage } = product;
  const totalAdditionalFee = additionalFee.reduce((a, c) => {
    return a + c.price;
  }, 0);
  const HPP = priceUnit * totalProduct + totalAdditionalFee;

  const minPrice = HPP / totalProduct;

  if (rejectionPersentage) {
    const totalProductRejection = rejectionPersentage / 100 * totalProduct;
    const disadvantagePerUnit = totalProductRejection * minPrice / (totalProduct - totalProductRejection);

    return (minPrice + disadvantagePerUnit).toFixed();
  } else {
    return minPrice.toFixed();
  }
}