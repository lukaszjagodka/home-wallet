import React, { useState } from 'react';
import ChoiceLoginOrCreateAccount from './components/ChoiceLoginOrCreateAccount/ChoiceLoginOrCreateAccount';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isX, setIsX] = useState(false);
  if (!isX) {
    const retrievedSelectedAccObject: string | null = localStorage.getItem('selectedAccount');
    if (retrievedSelectedAccObject) {
      setIsLogged(true);
      setIsX(true);
    }
  }
  return (
    <div className="App">
      {
        isLogged
          ? (
            <>
              <Navbar />
              <Dashboard />
            </>
          ) : <ChoiceLoginOrCreateAccount />
      }
    </div>
  );
}

export default App;
