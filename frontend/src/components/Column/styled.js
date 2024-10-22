import styled from 'styled-components';
export const Wrapper = styled.div`
    ${({ align }) => align && `text-align: ${align};`}
    ${({ xl }) =>
        xl === 0
            ? `display:none;`
            : xl &&
              `
    @media (min-width: 1200px) {
        display: block;
        flex: 0 0 ${(xl / 24) * 100}%;
        max-width: ${(xl / 24) * 100}%;
    }
        `}

    ${({ lg }) =>
        lg === 0
            ? `display:none;`
            : lg &&
              `
    @media (min-width: 992px) {
        display: block;
        flex: 0 0 ${(lg / 24) * 100}%;
        max-width: ${(lg / 24) * 100}%;
    }
        `}

        

        ${({ sm }) =>
        sm === 0
            ? `display:none;`
            : sm &&
              `
    @media (min-width: 576px) {
        display: block;
        flex: 0 0 ${(sm / 24) * 100}%;
        max-width: ${(sm / 24) * 100}%;
    }
        `}

        ${({ xs }) =>
        xs === 0
            ? `display:none;`
            : xs &&
              `
    @media (max-width: 575px) {
        display: block;
        flex: 0 0 ${(xs / 24) * 100}%;
        max-width: ${(xs / 24) * 100}%;
    }
        `}

        ${({ md }) =>
        md === 0
            ? `display:none;`
            : md &&
              `
        @media (min-width: 768px) {
            display: block;
            flex: 0 0 ${(md / 24) * 100}%;
            max-width: ${(md / 24) * 100}%;
        }
            `}
            
        ${({ span }) =>
        span === 0
            ? `display:none;`
            : span &&
              `
    display: block;
    flex: 0 0 ${(span / 24) * 100}%;
    max-width: ${(span / 24) * 100}%;
        `}
`;
