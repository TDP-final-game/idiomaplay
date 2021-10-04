import * as React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Excercise from './screens/Excercise';
import ExamEntry from './screens/ExamEntry';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={() => ({
              headerShown: false,
            })}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name="Excercise" component={Excercise} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
