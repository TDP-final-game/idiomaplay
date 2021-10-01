import * as React from 'react';
import store from './redux/store';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import Excercise from './screens/Excercise';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
            })}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Excercise" component={Excercise} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
