import { Picker } from '@react-native-picker/picker';
import { Currency } from '../types/account';
import { StyleSheet } from 'react-native';

type Props = {
  selected: Currency;
  onChange: (currency: Currency) => void;
};

export const CurrencyPicker = ({ selected, onChange }: Props) => (
  <Picker
    selectedValue={selected}
    onValueChange={onChange}
    style={styles.picker}
    dropdownIconColor="#666"
  >
    <Picker.Item label="₽ RUB" value="RUB" />
    <Picker.Item label="$ USD" value="USD" />
    <Picker.Item label="€ EUR" value="EUR" />
    <Picker.Item label="£ GBP" value="GBP" />
    <Picker.Item label="¥ JPY" value="JPY" />
  </Picker>
);

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});