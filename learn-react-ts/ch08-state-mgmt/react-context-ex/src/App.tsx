import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { AppProvider } from './AppContext';

function App() {
  return (
    <div className="max-w-7x1 mx-auto px-4">
      <AppProvider>
        <Header />
        <Main />
      </AppProvider>
    </div>
  );
}

export default App;
