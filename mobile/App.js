import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import firebase from 'firebase';
import Home from './screens/Home';
import Market from './screens/Market';
import Login from './screens/Login';
import Exercise from './screens/Exercise';
import ExamEntry from './screens/ExamEntry';
import UnitModulesList from './screens/UnitModulesList';
import UnitsList from './screens/UnitsList';
import SignupConfirmation from './screens/SignupConfirmation';
import { useSelector } from 'react-redux';
import { firebaseConfig } from './config';
import { TopBar } from './components/TopBar';
import { screens } from './config/screens';
import { Tutorial } from './screens/Tutorial';
import { ChapterHeader, UnitHeader } from './components/ChapterHeader';
import registerForPushNotificationsAsync from './services/pushNotificationService';
import { MarketTopbar } from './components/MarketTopbar';

const Stack = createNativeStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const RootComponent = () => {
  const isLogged = useSelector((state) => state.user.logged);

  const header = {
    [screens.HOME]: ({ cartButtonFunction }) => <TopBar cartButtonFunction={cartButtonFunction} />,
    [screens.MARKET]: ({ returnButtonFunction }) => (
      <MarketTopbar returnButtonFunction={returnButtonFunction} />
    ),
    [screens.UNITS_LIST]: ({ cartButtonFunction }) => (
      <TopBar cartButtonFunction={cartButtonFunction} />
    ),
    [screens.UNIT_MODULES_LIST]: ({ unit, returnButtonFunction, cartButtonFunction }) => (
      <UnitHeader
        unit={unit}
        cartButtonFunction={cartButtonFunction}
        returnButtonFunction={returnButtonFunction}
      />
    ),
    [screens.EXERCISE]: ({ returnButtonFunction, unit, lesson, isExam }) => (
      <ChapterHeader
        unit={unit}
        lesson={lesson}
        isExam={isExam}
        returnButtonFunction={returnButtonFunction}
      />
    ),
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogged ? 'Home' : 'Login'}
        screenOptions={() => ({
          header: (props) =>
            isLogged &&
            header[props.route.name] && (
              <SafeAreaView style={{ flex: 0.15, marginTop: '7%' }}>
                {header[props.route.name](props.options)}
              </SafeAreaView>
            ),
        })}
      >
        {isLogged ? (
          <>
            <Stack.Screen name={screens.HOME} component={Home} />
            <Stack.Screen name={screens.MARKET} component={Market} />
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name={screens.EXERCISE} component={Exercise} />
            <Stack.Screen name={screens.UNIT_MODULES_LIST} component={UnitModulesList} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
            <Stack.Screen name={screens.UNITS_LIST} component={UnitsList} />
            <Stack.Screen name={screens.TUTORIAL} component={Tutorial} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function App() {
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootComponent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
