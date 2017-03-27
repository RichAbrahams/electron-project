import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.h2`
  margin: ${props => props.margin}
  color: ${props => props.color};
  text-align: center;
`;

export default stc;