export const changeCount = num => {
  return num > 10000 ? (num / 10000).toFixed(1) + "万" : num;
};
