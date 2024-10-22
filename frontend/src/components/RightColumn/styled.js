import { Wrapper as CardStyle } from 'components/Card/styled';
import styled from 'styled-components';

export const Wrapper = styled(CardStyle)`
    height: 100%;
    button[type='text'] {
        background: transparent;
        border: 0;
    }
    button {
        background: #e6faef;
        border-radius: 4px;
        padding: 8px 16px;
        border: 0;
        cursor: pointer;
    }
    .reset-btn-wrapper {
        float: right;
    }
`;
