import styled from 'styled-components';

const stc = styled.form`
  margin: 2em 0 0 0;
  & div.form-row:nth-child(even) {
    background: rgba(127, 127, 127, 0.25);
}
  & div.form-row:nth-child(odd) {
    background: rgba(213, 214, 213, 0.5);
}
`;

export default stc;
