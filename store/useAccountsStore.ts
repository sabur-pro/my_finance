import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, AccountType, Currency } from '../types/account';

type AccountsState = {
  accounts: Account[];
  sortBy: 'name' | 'balance' | 'createdAt';
  filterType: AccountType | 'all';
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  editAccount: (id: string, data: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  setSort: (sort: 'name' | 'balance' | 'createdAt') => void;
  setFilter: (filter: AccountType | 'all') => void;
};

export const useAccountsStore = create<AccountsState>()(
  persist(
    (set) => ({
      accounts: [
        {
          id: 'initial-card',
          name: 'Основная карта',
          balance: 0,
          type: 'card',
          currency: 'RUB',
          createdAt: new Date(),
        },
        {
          id: 'initial-cash',
          name: 'Наличные',
          balance: 0,
          type: 'cash',
          currency: 'RUB',
          createdAt: new Date(),
        },
      ],
      sortBy: 'name',
      filterType: 'all',
      
      addAccount: (account) =>
        set((state) => ({
          accounts: [
            ...state.accounts,
            {
              ...account,
              id: `acc-${Date.now()}`,
              createdAt: new Date(),
            },
          ],
        })),

      editAccount: (id, data) =>
        set((state) => ({
          accounts: state.accounts.map(acc => 
            acc.id === id ? { ...acc, ...data } : acc
          )
        })),

      deleteAccount: (id) =>
        set((state) => ({
          accounts: state.accounts.filter(acc => acc.id !== id)
        })),

      setSort: (sortBy) => set({ sortBy }),
      setFilter: (filterType) => set({ filterType }),
    }),
    {
      name: 'accounts-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper functions
export const sortAccounts = (accounts: Account[], sortBy: AccountsState['sortBy']) => {
  return [...accounts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'balance') return b.balance - a.balance;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

export const filterAccounts = (
  accounts: Account[], 
  filterType: AccountsState['filterType']
) => {
  return filterType === 'all' 
    ? accounts 
    : accounts.filter(acc => acc.type === filterType);
};