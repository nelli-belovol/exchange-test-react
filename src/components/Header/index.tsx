import styled from 'styled-components';
import Currency from '../Currency';

import { mainCl, size } from '../../utils/variables';

const HeaderWrap = styled.header`
  width: 100%;
  background-color: ${mainCl};
  padding: 20px;
  color: white;
  box-shadow: 0px 2px 12px rgb(0 0 0 / 14%);
  min-height: 110px;

  ${size.M} {
    min-height: 70px;
  }
`;

const Header = () => {
  return (
    <HeaderWrap>
      <Currency />
    </HeaderWrap>
  );
};

export default Header;
