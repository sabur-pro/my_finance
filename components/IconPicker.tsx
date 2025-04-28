import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Define a type for the icon names you're using
type IconName =
  | 'credit-card'
  | 'account-balance'
  | 'savings'
  | 'money-off'
  | 'attach-money'
  | 'wallet'
  | 'payment'
  | 'euro'
  | 'monetization-on'
  | 'business-center';
// Add more icon names as needed

// Type the icons array with IconName
const icons: IconName[] = [
  'credit-card',
  'account-balance',
  'savings',
  'money-off',
  'attach-money',
  'wallet',
  'payment',
  'euro',
  'monetization-on',
  'business-center',
];

type IconPickerProps = {
  selectedIcon?: string;
  onSelect: (icon: string) => void;
};

export const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {icons.map((icon) => (
          <Pressable
            key={icon}
            style={[styles.iconContainer, selectedIcon === icon && styles.selected]}
            onPress={() => onSelect(icon)}
          >
            <MaterialIcons name={icon} size={32} color="#4A90E2" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    alignItems: 'center',
  },
  selected: {
    borderColor: '#4A90E2',
    backgroundColor: '#e8f4ff',
  },
});