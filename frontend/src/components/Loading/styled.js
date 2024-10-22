import styled from 'styled-components';

export const Wrapper = styled.div`
    animation: spin infinite 20s linear;
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
