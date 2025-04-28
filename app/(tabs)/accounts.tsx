import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AccountCard } from '../../components/AccountCard';
import { useAccountsStore, sortAccounts, filterAccounts } from '../../store/useAccountsStore';
import { MaterialIcons } from '@expo/vector-icons';
import { AccountType, Currency, CardType } from '../../types/account';
import { useState } from 'react';
import { CreateCardModal } from '../../components/CreateCardModal';

export default function AccountsScreen() {
  const { 
    accounts,
    sortBy,
    filterType,
    addAccount,
    setSort,
    setFilter
  } = useAccountsStore();

  const [createCardVisible, setCreateCardVisible] = useState(false);

  const processedAccounts = sortAccounts(
    filterAccounts(accounts, filterType),
    sortBy
  );

  const handleCreateCard = (data: {
    name: string;
    currency: Currency;
    cardType: CardType;
    icon?: string;
    description?: string;
    creditLimit?: number;
    includeInTotal: boolean;
  }) => {
    addAccount({
      ...data,
      balance: 0,
      type: 'card',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <View style={styles.filterRow}>
          {['all', 'card', 'cash'].map((type) => (
            <Button
              key={type}
              mode={filterType === type ? 'contained' : 'outlined'}
              onPress={() => setFilter(type as AccountType | 'all')}
              style={styles.filterButton}
              labelStyle={styles.filterLabel}
            >
              {type === 'all' ? 'Все' : type === 'card' ? 'Карты' : 'Наличные'}
            </Button>
          ))}
        </View>

        <View style={styles.sortRow}>
          {['name', 'balance'].map((sortType) => (
            <Button
              key={sortType}
              mode={sortBy === sortType ? 'contained' : 'outlined'}
              onPress={() => setSort(sortType as 'name' | 'balance')}
              style={styles.sortButton}
              labelStyle={styles.sortLabel}
            >
              {sortType === 'name' ? 'По имени' : 'По балансу'}
            </Button>
          ))}
        </View>
      </View>

      <FlatList
        data={processedAccounts}
        renderItem={({ item }) => <AccountCard account={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="account-balance-wallet" size={64} color="#ddd" />
            <Text style={styles.emptyText}>Нет счетов</Text>
          </View>
        }
      />
      
      <Button 
        mode="contained" 
        onPress={() => setCreateCardVisible(true)}
        style={styles.addButton}
        labelStyle={styles.addButtonLabel}
        icon="credit-card-plus"
      >
        Добавить карту
      </Button>

      <CreateCardModal
        visible={createCardVisible}
        onClose={() => setCreateCardVisible(false)}
        onSave={handleCreateCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  controlsContainer: {
    marginBottom: 16,
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    borderRadius: 8,
  },
  filterLabel: {
    fontSize: 12,
  },
  sortButton: {
    borderRadius: 8,
  },
  sortLabel: {
    fontSize: 14,
  },
  listContent: {
    gap: 12,
    paddingBottom: 16,
  },
  addButton: {
    borderRadius: 8,
    marginTop: 'auto',
    paddingVertical: 10,
    backgroundColor: '#4A90E2',
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
  },
});