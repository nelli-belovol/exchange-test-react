import { useContext } from 'react';
import styled from 'styled-components';
import { CurrencyContext } from '../../context/CurrencyContext';
import { size } from '../../utils/variables';

const CurrencyList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${size.M} {
    flex-direction: row;
  }
`;
const CurrencyItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
    ${size.M} {
      margin-bottom: 0;
      margin-right: 30px;
    }
  }
`;

const Text = styled.p`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Span = styled.p`
  margin-right: 10px;
`;

const Currency = () => {
  const currencyContext = useContext(CurrencyContext);

  return (
    <div>
      <CurrencyList>
        {currencyContext.currency.map((item, idx) => {
          return (
            <CurrencyItem key={idx}>
              <Text>{item.ccy}</Text>
              <Text>{item.buy}</Text>
              <Span>/</Span>
              <Text>{item.sale}</Text>
            </CurrencyItem>
          );
        })}
      </CurrencyList>
    </div>
  );
};

export default Currency;
