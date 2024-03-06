import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account } from './components/Account';
import { Login } from './components/Login';
import { Data } from './components/Data';
import { Signup } from './components/Signup';


const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerStyle:{backgroundColor:'#65c3cd'}, headerShown: false, orientation:'portrait' }}/>
        <Stack.Screen name="Account" component={Account} options={{
        headerStyle:{backgroundColor:'#65c3cd'},
        headerShown: false,
        orientation:'landscape',
        }} />
        <Stack.Screen name="Data" component={Data} options={{
        headerStyle:{backgroundColor:'#65c3cd'},
        headerShown: false,
        orientation:'landscape',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
