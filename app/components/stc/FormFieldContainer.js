import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0em 3em 0em 0em;
  & div.error ~ input.text-input {
    box-shadow: 0px 0px 0px 2px rgba(231,76,60,1);
  }
`;

export default stc;
