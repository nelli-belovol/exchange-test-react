import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Loading = () => {
  return (
    <LoadingWrap>
      <Circles color="rgba(0,0,0,0.3)" height={80} width={80} />
    </LoadingWrap>
  );
};
