import React, { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import {
  borderAccentCl,
  borderCl,
  mainCl,
  size,
  titleCl,
} from '../../utils/variables';
import { resultInitial, resultObtained } from '../../utils/currencyCalc';

import styled from 'styled-components';

const ExchangeWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;

  ${size.M} {
    flex-direction: row;
  }

  ${size.L} {
    width: max-content;
  }
`;

const ExchangeValue = styled.input`
  font-size: 28px;
  line-height: 33px;
  font-weight: bold;
  color: ${mainCl};
  border: 0px;
  outline: 0px;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 24px;
  border: 1px solid ${borderCl};
  border-radius: 2px;
  width: 100%;

  ${size.M} {
    width: 40%;
  }

  :hover,
  :focus {
    border: 1px solid ${borderAccentCl};
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Title = styled.h3`
  width: 100%;
  text-align: left;
  font-size: 12px;
  line-height: 14px;
  color: ${titleCl};
`;

const Select = styled.select`
  background-color: transparent;
  outline: none;
  border: 1px solid ${borderCl};
  padding: 18px;

  :hover,
  :focus {
    border: 1px solid ${borderAccentCl};
  }
`;

const Option = styled.option`
  width: 100%;
  border-radius: none;
`;

const Slash = styled.div`
  width: 48px;
  height: 48px;
  font-size: 36px;
  box-shadow: 0px 2px 12px rgb(0 0 0 / 14%);
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
  border-radius: 50%;
  background-color: #fff;
  color: black;
  user-select: none;
  margin: 20px 0;

  ${size.M} {
    margin: 0 20px;
  }
`;

const options = ['USD', 'EUR', 'UAH'];

const Exchange = () => {
  const currencyContext = useContext(CurrencyContext);
  const { currency, isLoading, error } = currencyContext;

  const [giveValue, setGiveValue] = useState<number>(0);
  const [getValue, setGetValue] = useState<number>(0);
  const [currentPart, setCurrentPart] = useState('left');
  const [giveCcy, setGiveCcy] = useState('UAH');
  const [getCcy, setGetCcy] = useState('USD');

  const LOCAL_CURRENCY = 'UAH';

  // when the right or left select is changed
  useEffect(() => {
    if (currency.length > 0) {
      if (currentPart === 'left') {
        calcGetRes(giveValue);
      } else {
        calcGiveRes(getValue);
      }
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giveCcy, getCcy]);

  //calculation of funds received
  const calcGetRes = (value: number) => {
    if (giveCcy === LOCAL_CURRENCY) {
      const res = resultObtained.getForeignCcy(currency, getCcy, value);
      setGetValue(Number(res.toFixed(2)));
    } else {
      if (getCcy === LOCAL_CURRENCY) {
        const res = resultObtained.getLocalCcy(currency, giveCcy, value);
        setGetValue(Number(res.toFixed(2)));
      } else {
        const res = resultObtained.getFromForeignToForeign(
          currency,
          giveCcy,
          getCcy,
          value,
        );
        setGetValue(Number(res.toFixed(2)));
      }
    }
  };
  //calculation of how much money need to give
  const calcGiveRes = (value: number) => {
    if (getCcy === LOCAL_CURRENCY) {
      const res = resultInitial.giveForeignCcy(currency, giveCcy, value);
      setGiveValue(Number(res.toFixed(2)));
    } else {
      if (giveCcy === LOCAL_CURRENCY) {
        const res = resultInitial.giveLocalCcy(currency, getCcy, value);
        setGiveValue(Number(res.toFixed(2)));
      } else {
        const res = resultInitial.giveFromForeignToForeign(
          currency,
          giveCcy,
          getCcy,
          value,
        );
        setGiveValue(Number(res.toFixed(2)));
      }
    }
  };

  const handleGiveValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setGiveValue(v);
    calcGetRes(v);
    setCurrentPart('left');
  };

  const handleGetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setGetValue(v);
    calcGiveRes(v);
    setCurrentPart('right');
  };

  return (
    <ExchangeWrap>
      <Label>
        <Title>Change</Title>
        <InputWrap>
          <ExchangeValue
            type="number"
            disabled={error ? true : false}
            value={isLoading ? 0 : giveValue.toString()}
            onChange={handleGiveValue}
          />
          <Select
            defaultValue="UAH"
            onChange={e => setGiveCcy(e.target.value)}
            disabled={error ? true : false}
          >
            {options.map((option, idx) => (
              <Option
                key={idx}
                value={option}
                disabled={getCcy === option && true}
              >
                {option}
              </Option>
            ))}
          </Select>
        </InputWrap>
      </Label>
      <Slash>=</Slash>
      <Label>
        <Title>Receive </Title>
        <InputWrap>
          <ExchangeValue
            type="number"
            disabled={error ? true : false}
            value={isLoading ? 0 : getValue.toString()}
            onChange={handleGetValue}
          />
          <Select
            defaultValue="USD"
            onChange={e => setGetCcy(e.target.value)}
            disabled={error ? true : false}
          >
            {options.map((option, idx) => (
              <Option
                key={idx}
                value={option}
                disabled={giveCcy === option && true}
              >
                {option}
              </Option>
            ))}
          </Select>
        </InputWrap>
      </Label>
    </ExchangeWrap>
  );
};

export default Exchange;
