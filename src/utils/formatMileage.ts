export const formatMileage = (value: number | string): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  return `${new Intl.NumberFormat("uk-UA").format(number)} km`;
};

export const formatWithCommas = (value: string | number): string => {
  if (!value) return "";
  return new Intl.NumberFormat("en-US").format(
    Number(value.toString().replace(/\D/g, ""))
  );
};

export const removeNonDigits = (value: string): string => {
  return value.replace(/\D/g, "");
};
