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
import {useSelector} from "react-redux";
import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);


const Stack = createNativeStackNavigator();

const RootComponent = () => {
  const isLogged = useSelector(state => state.user.logged);
  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName={isLogged ? "Home": "Login"}
          screenOptions={() => ({
            headerShown: false,
          })}
      >
        { isLogged ? (
          <>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name="Excercise" component={Excercise} />
            <Stack.Screen name="LessonsList" component={LessonsList} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootComponent></RootComponent>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
