import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import first_page from '../first_page';
import second_page from '../second_page';
import ProductDetailsPage from '../ProductDetailsPage';
import CartPage from '../CartPage';
import PaymentPage from '../PaymentPage';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="First" component={first_page} />
    <Stack.Screen name="Second" component={second_page} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
    <Stack.Screen name="CartPage" component={CartPage} />
    <Stack.Screen name="PaymentPage" component={PaymentPage} />
    
  </Stack.Navigator>
);

const MainNavigation = () => (
  <NavigationContainer independent={true}>
    <StackNavigator />
  </NavigationContainer>
);

export default MainNavigation;
