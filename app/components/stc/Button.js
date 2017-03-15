import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.button`
  color: ${colors.white};
  background: ${props => props.color};
  margin: ${props => props.margin};
  border-radius: 3px;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  outline: none;
  &:hover {
    background: green;
    text-decoration: none;
    outline: none;
  }
`;

export default stc;
