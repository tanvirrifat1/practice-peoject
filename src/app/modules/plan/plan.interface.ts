export type IPlan = {
  name: string;
  description: string;
  unit: number;
  interval: 'day' | 'week' | 'month' | 'year' | 'half-yearly';
  productId: string;
  priceId: string;
};
