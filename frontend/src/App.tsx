import React, { useEffect } from 'react';
import Navigation from 'navigation/Navigation';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'translations';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
