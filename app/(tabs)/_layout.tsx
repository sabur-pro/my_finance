import BottomTabs  from '../navigation/BottomTabs';
import { SafeAreaView } from 'react-native';
import { Layouts } from '../../constants/constants';

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Layouts.backgroundColor }}>
      <BottomTabs />
    </SafeAreaView>
  );
}