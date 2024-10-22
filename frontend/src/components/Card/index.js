import { Wrapper } from './styled';

function Card({ title, children, border = true }) {
    return (
        <Wrapper className="card" border={border}>
            {title && (
                <h4>
                    <b>{title}</b>
                </h4>
            )}
            <span>{children}</span>
        </Wrapper>
    );
}
export default Card;
