export function calculateTotal(allItems) {
  const newPrice = allItems.reduce(
    (accumulator, item) =>
      accumulator + (item.quantity ? item.price * item.quantity : item.price),
    0
  );
  return newPrice;
}
