export const isCapitalized = (value: string): boolean => {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  return capitalized === value;
};
