import { createContext, useEffect, useState } from 'react';
import { getDataCurrency } from '../api/api';
import { ICurrencyItem } from '../components/types/types';

type ContextProviderProps = {
  children: React.ReactNode;
};

interface ContextCurrencyType {
  currency: ICurrencyItem[];
  error: string | null;
  isLoading: boolean;
}
export const CurrencyContext = createContext({} as ContextCurrencyType);

export const CurrencyProvider = ({ children }: ContextProviderProps) => {
  const [currency, setCurrency] = useState<ICurrencyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrency = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await getDataCurrency();
      setCurrency(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, isLoading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
};
