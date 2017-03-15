import styled from 'styled-components';

const stc = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.marginTop}em;
    margin-bottom: ${props => props.marginBottom}em;
`;

export default stc;
