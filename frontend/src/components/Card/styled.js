import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 0 rgba(255, 38, 5, 0.06);
    ${({ border = true }) => `border: ${border ? '1px solid #d9d9d9' : '0px'};`}
`;
