import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import Navigator from '@navigator';
import { persistor, store } from '@utils/store';
import { loadImages, loadFonts } from '@theme';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DateSelectorProvider } from './src/context/DateSelectorContext/DateSelectorContext';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setReady] = useState<boolean>(false);

  const preloadAssets = async () => {
    try {
      await Promise.all([loadImages(), loadFonts()]);
    } finally {
      setReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  if (!isReady) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <DateSelectorProvider>
                <Navigator initialRouteName="Home" />
              </DateSelectorProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
