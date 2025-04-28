import { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { CurrencyPicker } from './CurrencyPicker';
import { Account, Currency } from '../types/account';

type Props = {
  visible: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (data: { name: string; currency: Currency }) => void;
  onDelete?: () => void;
};

export const EditAccountModal = ({ 
  visible, 
  account, 
  onClose, 
  onSave,
  onDelete 
}: Props) => {
  const [name, setName] = useState(account?.name || '');
  const [currency, setCurrency] = useState<Currency>(account?.currency || 'RUB');

  useEffect(() => {
    if (account) {
      setName(account.name);
      setCurrency(account.currency);
    }
  }, [account]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Название счета не может быть пустым');
      return;
    }
    onSave({ name: name.trim(), currency });
    onClose();
  };

  const confirmDelete = () => {
    Alert.alert(
      'Удаление счета',
      'Вы уверены, что хотите удалить этот счет?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: onDelete, style: 'destructive' },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Название счета"
          placeholderTextColor="#888"
          style={styles.input}
          maxLength={32}
        />
        
        <CurrencyPicker
          selected={currency}
          onChange={setCurrency}
        />

        <Button 
          mode="contained" 
          onPress={handleSave}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Сохранить
        </Button>

        {onDelete && (
          <Button 
            mode="outlined" 
            onPress={confirmDelete}
            style={[styles.button, styles.deleteButton]}
            labelStyle={[styles.buttonLabel, styles.deleteLabel]}
          >
            Удалить счет
          </Button>
        )}

        <Button 
          mode="text" 
          onPress={onClose}
          style={styles.cancelButton}
          labelStyle={styles.cancelLabel}
        >
          Отмена
        </Button>
      </View>
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
});