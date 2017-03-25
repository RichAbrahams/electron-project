import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.table`
  width: 100%;
& > tbody >tr > td {
  padding: 1em;
  border: 1px solid #999;
}
& thead > tr > th {
  background: ${colors.darkBlue};
  color: ${colors.white};
  padding: 1em;
};
`;

export default stc;
