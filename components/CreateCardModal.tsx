import { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, Alert, Switch, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { CurrencyPicker } from './CurrencyPicker';
import { IconPicker } from './IconPicker';
import { CardType, Currency } from '../types/account';
import { ScrollView } from 'react-native';


type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    currency: Currency;
    cardType: CardType;
    icon?: string;
    description?: string;
    creditLimit?: number;
    includeInTotal: boolean;
  }) => void;
};

export const CreateCardModal = ({ visible, onClose, onSave }: Props) => {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [cardType, setCardType] = useState<CardType>('normal');
  const [icon, setIcon] = useState<string>('credit-card');
  const [description, setDescription] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [includeInTotal, setIncludeInTotal] = useState(true);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Название карты не может быть пустым');
      return;
    }
    
    onSave({
      name: name.trim(),
      currency,
      cardType,
      icon,
      description: description.trim(),
      creditLimit: creditLimit ? Number(creditLimit) : undefined,
      includeInTotal,
    });
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
          placeholder="Название карты"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <CurrencyPicker selected={currency} onChange={setCurrency} />
        
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
        <Button mode="outlined" onPress={onClose} style={styles.button}>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
    marginVertical: 12,
  },
  button: {
    marginTop: 8,
  },
});