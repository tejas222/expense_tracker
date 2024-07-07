import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/slices/userSlice';
import IncomeScreen from '../screens/IncomeScreen';
import DebitScreen from '../screens/DebitScreen';

const AuthNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const JWT = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('userData');

      if (JWT) {
        dispatch(setUserData(JSON.parse(user)));
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    };
    getToken();
  }, []);
};

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Authnavigator">
      <Stack.Screen
        name="Authnavigator"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" options={{headerShown: false}}>
        {() => <DrawerNavigator />}
      </Stack.Screen>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Credits"
        component={IncomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Debits"
        component={DebitScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
