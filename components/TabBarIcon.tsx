import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue } from 'react-native';

type TabBarIconProps = {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: ColorValue;
  size?: number;
};

export const TabBarIcon = ({ name, color, size = 24 }: TabBarIconProps) => (
  <MaterialIcons name={name} size={size} color={color} />
);