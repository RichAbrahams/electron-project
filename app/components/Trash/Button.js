import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.button`
  width: 100%;
  padding: 1em;
  margin: 0;
  background: ${(props) => props.color};
  color: ${colors.white};
  border-radius: 3px;
  &:hover {
    background: green;
  }
`;

export default stc;
