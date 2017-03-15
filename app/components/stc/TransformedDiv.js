import styled from 'styled-components';

const stc = styled.div`
  position: absolute;
  transform: translate(${props => props.translateX}px, ${props => props.translateY}px)
`;

export default stc;
