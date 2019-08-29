export const changeCount = num => {
  return num > 10000 ? (num + "").slice(0, -4) : num;
};
