import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  FadeOutUp,
  Layout
} from 'react-native-reanimated';
import { Account } from '../types/account';
import { useAccountsStore } from '../store/useAccountsStore';
import { EditAccountModal } from './EditAccountModal';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  account: Account;
};

const getIconName = (type: Account['type']) => {
  switch (type) {
    case 'card': return 'credit-card';
    case 'cash': return 'attach-money';
    default: return 'help-outline';
  }
};

export const AccountCard = ({ account }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { editAccount, deleteAccount } = useAccountsStore();

  const handleSave = (data: Partial<Account>) => {
    editAccount(account.id, data);
  };

  const handleDelete = () => {
    deleteAccount(account.id);
    setModalVisible(false);
  };

  return (
    <>
      <AnimatedPressable
        entering={FadeInDown.duration(300)}
        exiting={FadeOutUp.duration(200)}
        layout={Layout.springify()}
        onPress={() => setModalVisible(true)}
        style={styles.container}
      >
        <MaterialIcons 
          name={(account.icon as any) || getIconName(account.type)} 
          size={28} 
          color="#4A90E2" 
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.name}>{account.name}</Text>
          
          {account.type === 'card' && account.cardType && (
            <Text style={styles.cardType}>
              {account.cardType === 'normal' ? 'Обычная' : 
               account.cardType === 'savings' ? 'Сбережения' : 'Долговая'}
            </Text>
          )}
          
          {account.description && (
            <Text style={styles.description}>{account.description}</Text>
          )}
          
          <Text style={styles.balance}>
            {account.balance.toFixed(2)} {account.currency}
            {account.creditLimit !== undefined && (
              <Text style={styles.limit}> / Лимит: {account.creditLimit}</Text>
            )}
          </Text>
          
          <Text style={styles.includeText}>
            {account.includeInTotal ? 'Учитывается в общем счете' : 'Не учитывается'}
          </Text>
        </View>

        <MaterialIcons 
          name="edit" 
          size={20} 
          color="#666"
          style={styles.editIcon}
        />
      </AnimatedPressable>

      <EditAccountModal
        visible={modalVisible}
        account={account}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
  },
  balance: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  editIcon: {
    marginLeft: 8,
    padding: 8,
  },
  cardType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  limit: {
    color: '#888',
    fontSize: 12,
  },
  includeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});