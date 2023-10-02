import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainScreen } from './app/screens/MainScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './app/store/reducers';

const store = configureStore({
  reducer: rootReducer
})

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <MainScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6da73',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
