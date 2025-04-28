import { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet, Alert, Switch, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { CurrencyPicker } from './CurrencyPicker';
import { IconPicker } from './IconPicker';
import { Account, CardType, Currency } from '../types/account';
import { ScrollView } from 'react-native';

type Props = {
  visible: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (data: Partial<Account>) => void;
  onDelete?: () => void;
};

export const EditAccountModal = ({ 
  visible, 
  account, 
  onClose, 
  onSave,
  onDelete 
}: Props) => {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [cardType, setCardType] = useState<CardType>('normal');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [includeInTotal, setIncludeInTotal] = useState(true);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setCurrency(account.currency);
      setCardType(account.cardType || 'normal');
      setIcon(account.icon || '');
      setDescription(account.description || '');
      setCreditLimit(account.creditLimit?.toString() || '');
      setIncludeInTotal(account.includeInTotal);
    }
  }, [account]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Название счета не может быть пустым');
      return;
    }
    
    const updatedData: Partial<Account> = {
      name: name.trim(),
      currency,
      includeInTotal,
    };
    
    if (account?.type === 'card') {
      updatedData.cardType = cardType;
      updatedData.icon = icon;
      updatedData.description = description;
      updatedData.creditLimit = creditLimit ? Number(creditLimit) : undefined;
    }
    
    onSave(updatedData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.container}>
        <TextInput
          placeholder="Название счета"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <CurrencyPicker selected={currency} onChange={setCurrency} />
        
        {account?.type === 'card' && (
          <>
            <Text style={styles.label}>Тип карты:</Text>
            <View style={styles.buttonGroup}>
              {(['normal', 'savings', 'debt'] as CardType[]).map((type) => (
                <Button
                  key={type}
                  mode={cardType === type ? 'contained' : 'outlined'}
                  onPress={() => setCardType(type)}
                  style={styles.typeButton}
                >
                  {type === 'normal' ? 'Обычная' : type === 'savings' ? 'Сбережения' : 'Долг'}
                </Button>
              ))}
            </View>
            
            <Text style={styles.label}>Иконка:</Text>
            <IconPicker selectedIcon={icon} onSelect={setIcon} />
            
            <TextInput
              placeholder="Описание"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
            />
            
            <TextInput
              placeholder="Кредитный лимит"
              value={creditLimit}
              onChangeText={setCreditLimit}
              keyboardType="numeric"
              style={styles.input}
            />
          </>
        )}
        
        <View style={styles.switchRow}>
          <Text>Учитывать в общем счёте:</Text>
          <Switch
            value={includeInTotal}
            onValueChange={setIncludeInTotal}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={includeInTotal ? '#4A90E2' : '#f4f3f4'}
          />
        </View>
        
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Сохранить
        </Button>
        
        {onDelete && (
          <Button 
            mode="outlined" 
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}
            labelStyle={styles.deleteLabel}
          >
            Удалить счет
          </Button>
        )}
        
        <Button mode="text" onPress={onClose} style={styles.button}>
          Отмена
        </Button>
      </View>
      </ScrollView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: '#ff4444',
  },
  deleteLabel: {
    color: '#ff4444',
  },
  cancelButton: {
    marginTop: 16,
  },
  cancelLabel: {
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});