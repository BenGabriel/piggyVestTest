import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LandingScreen from './src/screens/landingScreen';
import HomeScreen from './src/screens/HomeScreen';
import {StackParamList} from './src/types/types';
import {Provider} from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import MealDetailsScreen from './src/screens/mealDetailsScreen';

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="Screen1" component={HomeScreen} />
            <Stack.Screen name="Screen2" component={MealDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
