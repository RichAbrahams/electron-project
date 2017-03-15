import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.button`
   color: ${colors.white};
   padding: 1em;
   width: 100%;
   outline: none;
   &:hover {
     background: ${colors.orange}
   }
`;

export default stc;
