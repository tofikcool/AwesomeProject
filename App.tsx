import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {TouchableOpacity, Text} from 'react-native';
import ItemScreen from './src/component/product/ItemScreen';
import store from './src/component/redux/store';
import Cart from './src/component/product/Cart';
import Login from './src/component/login/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={ItemScreen}
            options={({navigation}) => ({
              title: 'Home',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.cartButton}>Cart</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Login'}}
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

const styles = {
  cartButton: {
    marginRight: 15,
    color: 'blue',
    fontSize: 16,
  },
};
