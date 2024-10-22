import { Wrapper } from './styled';

function Column({ children, align, span, xl, lg, md, sm, xs }) {
    console.log(span);
    return (
        <Wrapper className="column" {...{ span, xl, lg, md, sm, xs, align }}>
            <div>{children}</div>
        </Wrapper>
    );
}
export default Column;
