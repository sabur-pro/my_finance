export type AccountType = 'card' | 'cash' | 'custom' | 'all';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  currency: Currency;
  createdAt: Date;
}