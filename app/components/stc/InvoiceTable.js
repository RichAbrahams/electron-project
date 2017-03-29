import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.table`
  width: 100%;
& > tbody >tr > td {
  padding: 0.5em;
  border: 1px solid #999;
}
& thead > tr > th {
  padding: 0.5em;
};
`;

export default stc;
