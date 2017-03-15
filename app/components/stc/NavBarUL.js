import styled from 'styled-components';
import * as colors from '../../colors';

const stc = styled.ul`
  background: ${colors.darkBlue};
  display: flex;
  justify-content: space-around;
  margin: 0 3em 0 3em;
  & > li {
    color: ${colors.white};
    position: relative;
    flex: 1;
  };
  & > li.has-children {
    text-align: center;
    padding-top: 1em;
    padding-bottom: 1em;
  };
  & > li.has-children:hover ul{
    display: flex;
    background: ${colors.darkBlue};
 };
  & > li.has-children > ul {
    display: none;
    flex-direction: column;
    position: absolute;
    width: 100%
 };
  & > li.has-children > ul:first-child {
    margin-top: 1em;
 };
`;

export default stc;


// import styled from 'styled-components';
// import * as colors from '../../colors';

// const stc = styled.ul`
//  background: ${colors.darkBlue};
//  display: flex;
//  justify-content: space-around;
//  & > li {
//    color: ${colors.white};
//    position: relative;
//    flex: 1 0 auto;
//  };
//   & > li.has-children {
//    text-align: center;
//  };
//   & > li.has-children:hover ul{
//     display: flex;
//     background: ${colors.darkBlue};
//  };
//   & > li.has-children > ul {
//   display: none;
//   flex-direction: column;
//   position: absolute;
//   width: 100%
//  };
// `;

// export default stc;
