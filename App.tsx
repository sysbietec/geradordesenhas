import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screen/Home';
import { SavedPasswords } from './src/screen/SavedPasswords';
import { WelcomeScreen } from './src/screen/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Welcome');


  // Verifica se o usuário já entrou no app antes
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('firstLaunch');
      if (isFirstLaunch) {
        setInitialRoute('Home');
      } else {
        await AsyncStorage.setItem('firstLaunch', 'true');
      }
    };
    checkFirstLaunch();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SavedPasswords"
          component={SavedPasswords}
          options={{ title: 'Senhas Salvas', headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
