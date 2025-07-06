/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';

import InputScreen from './src/screens/InputScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await mobileAds().initialize();
      } catch (error) {
        console.error('Failed to initialize mobile ads:', error);
      }
    };
    initializeAds();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{ title: '운세 정보 입력' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: '오늘의 운세 결과' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
