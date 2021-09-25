import * as React from 'react';
import Excercise from './Exercise';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
        })}
      >
        <Stack.Screen name="Excersise" component={Excercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
