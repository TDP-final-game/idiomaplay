import * as React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import Excercise from './screens/Excercise';
import ExamEntry from './screens/ExamEntry';
import LessonsList from './screens/LessonsList';
import SignupConfirmation from './screens/SignupConfirmation';

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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name="Excercise" component={Excercise} />
            <Stack.Screen name="LessonsList" component={LessonsList} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
