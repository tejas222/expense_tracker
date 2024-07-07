import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addExpense} from '../redux/slices/expenseSlice';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user.userData);

  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home_Screen"
        options={{headerShown: false, title: 'Home'}}>
        {props => <HomeScreen {...props} user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="Add Expense">
        {props => <AddExpenseScreen {...props} user={user} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Logout"
        listeners={{
          drawerItemPress: handleLogout,
        }}>
        {() => <LoginScreen />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
