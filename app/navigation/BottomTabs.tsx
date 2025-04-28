import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Layouts } from '../../constants/constants';
import AccountsScreen from '../(tabs)/accounts';
import CategoriesScreen from '../(tabs)/categories';
import OperationsScreen from '../(tabs)/operations';
import StatisticsScreen from '../(tabs)/statistics';
import MoreScreen from '../(tabs)/more';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Layouts.activeTintColor,
        tabBarInactiveTintColor: Layouts.inactiveTintColor,
        tabBarStyle: { 
          backgroundColor: Layouts.tabBarBackground,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="accounts"
        component={AccountsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-balance-wallet" color={color} />
          ),
          tabBarLabel: 'Счета',
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="category" color={color} />
          ),
          tabBarLabel: 'Категории',
        }}
      />
      <Tab.Screen
        name="operations"
        component={OperationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="swap-horiz" color={color} />
          ),
          tabBarLabel: 'Операции',
        }}
      />
      <Tab.Screen
        name="statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pie-chart" color={color} />
          ),
          tabBarLabel: 'Статистика',
        }}
      />
      <Tab.Screen
        name="more"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="menu" color={color} />
          ),
          tabBarLabel: 'Еще',
        }}
      />
    </Tab.Navigator>
  );
}