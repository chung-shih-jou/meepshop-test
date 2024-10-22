import { Types } from 'components/LeftColumn/define';
import { useState } from 'react';
import { Wrapper } from './styled';
import { DefaultImage, DefaultText } from './define';

function Image({ show, image, onDisplay }) {
    return show ? (
        <button type="text" onClick={() => onDisplay(Types.IMAGE)}>
            <img {...image} alt={'meepshop-test=image'} />
        </button>
    ) : (
        ''
    );
}
function Text({ show, text, onDisplay }) {
    return show ? (
        <button type="text" onClick={() => onDisplay(Types.TEXT)}>
            <p>{text}</p>
        </button>
    ) : (
        ''
    );
}
function RightColumn({ onPrev, initFinish, onDisplay, setRef, onReset }) {
    const [image, setImage] = useState(DefaultImage);
    const [text, setText] = useState(DefaultText);
    const [prev, setPrev] = useState();

    const handleReset = () => {
        setPrev({ image, text });
        setImage(DefaultImage);
        setText(DefaultText);
        onReset();
    };

    const handlePrev = () => {
        setImage(prev.image);
        setText(prev.text);
        onPrev();
    };

    const types = Object.keys(initFinish);

    if (setRef) setRef({ setImage, setText });
    if (!types.length)
        return (
            <Wrapper>
                {prev && (
                    <div className="reset-btn-wrapper">
                        <button onClick={handlePrev}>還原</button>
                    </div>
                )}
                請選擇左欄元件
            </Wrapper>
        );
    return (
        <Wrapper>
            <div className="reset-btn-wrapper">
                <button onClick={handleReset}>重新開始</button>
            </div>
            <div>
                <Image show={types.includes(Types.IMAGE)} image={image} onDisplay={onDisplay} />
            </div>
            <div>
                <Text show={types.includes(Types.TEXT)} text={text} onDisplay={onDisplay} />
            </div>
        </Wrapper>
    );
}
export default RightColumn;
