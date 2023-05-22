import { useContext } from 'react';
import './App.css';

import Exchange from './components/Exchange';
import Header from './components/Header';
import { Loading } from './components/Loading';
import { CurrencyContext } from './context/CurrencyContext';

function App() {
  const currencyContext = useContext(CurrencyContext);
  const { error, isLoading } = currencyContext;
  return (
    <div className="App">
      <Header />
      <div className="container">
        {error && <p className="error">{error}</p>}
        <Exchange />
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

export { App };
