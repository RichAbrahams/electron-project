import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import * as colors from '../../colors';

export default styled(FontAwesome)`
    margin: 0 0.5em 0 0.5em;
    color: ${props => props.color};
`;
