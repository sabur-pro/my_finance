export type AccountType = 'card' | 'cash' | 'custom';
export type CardType = 'normal' | 'savings' | 'debt';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  cardType?: CardType;
  currency: Currency;
  createdAt: Date;
  icon?: string;
  description?: string;
  creditLimit?: number;
  includeInTotal: boolean;
}