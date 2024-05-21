import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import ItemScreen from '../product/ItemScreen';
import Login from '../login/Login';
import Cart from '../product/Cart';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Login'}}
          />
            <Stack.Screen
            name="Home"
            component={ItemScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{title: 'Cart'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
