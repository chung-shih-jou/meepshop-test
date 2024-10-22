import { Wrapper } from './styled';

function Row({ children, align, gutter = [0, 0] }) {
    return (
        <Wrapper className="row" align={align} gutter={gutter}>
            {children}
        </Wrapper>
    );
}
export default Row;
