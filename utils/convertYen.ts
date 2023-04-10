export const convertYen = (price: number) => {
  return `¥${price.toLocaleString("ja-JP")}`;
};
