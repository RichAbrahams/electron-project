import styled from 'styled-components';

const stc = styled.input`
  display: inline;
  background-color: #fff;
  padding: 3px;
  line-height: 30px;
  margin: 0 0 2px;
  overflow: hidden;
  transition: border-color .2s ease;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 2px #eee;
  outline: none;
  width: ${props => props.width}em;
`;

export default stc;
