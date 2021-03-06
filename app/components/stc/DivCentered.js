import styled from 'styled-components';

const stc = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${props => props.color};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

export default stc;
