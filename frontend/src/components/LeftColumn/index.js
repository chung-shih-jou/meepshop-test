import { DraggableCard } from 'components/DragDrop';
import { Conifg, Types } from './define';
import { useState } from 'react';
import { MonitorWrapper, Wrapper } from './styled';
import { DefaultImage, DefaultText } from 'components/RightColumn/define';

function Monitor({ displayType, image, onOk, text }) {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const obj = {};
        data.forEach((value, key) => {
            obj[key] = value;
        });
        onOk(obj);
    };
    if (displayType) {
        const isImageType = displayType === Types.IMAGE;
        return (
            <MonitorWrapper onSubmit={onSubmit}>
                <div className="monitor-column">
                    <div className="monitor-row">
                        <input
                            name="text"
                            className={!isImageType ? '' : 'hidden'}
                            defaultValue={text}
                            placeholder="請輸入文字"
                            onInvalid={(e) => e.target.setCustomValidity(e.target.value ? '' : '請輸入文字')}
                            onMouseEnter={onOk}
                            required
                        />
                        <input
                            className={isImageType ? '' : 'hidden'}
                            name="width"
                            defaultValue={image.width}
                            placeholder="請輸入寬度"
                            onInvalid={(e) => e.target.setCustomValidity(e.target.value ? '' : '請輸入寬度')}
                            required
                        />
                        <input
                            name="height"
                            required
                            className={isImageType ? '' : 'hidden'}
                            defaultValue={image.height}
                            onInvalid={(e) => e.target.setCustomValidity(e.target.value ? '' : '請輸入長度')}
                            placeholder="請輸入長度"
                        />
                        <input
                            name="src"
                            required
                            className={isImageType ? '' : 'hidden'}
                            defaultValue={image.src}
                            placeholder="請輸入連結"
                            pattern="^https:\/\/(.*)"
                            onInvalid={(e) => e.target.setCustomValidity(e.target.value.match('https://') ? '' : '請輸入https連結')}
                        />
                    </div>
                    <div className="monitor-row">
                        <button type="submit">送出</button>
                    </div>
                </div>
            </MonitorWrapper>
        );
    }
    return null;
}
function LeftColumn({ initFinish, setRef, onTextOk, onImageOk }) {
    const [displayType, setDisplayType] = useState('');
    const [image, setImage] = useState(DefaultImage);
    const [text, setText] = useState(DefaultText);
    const [prev, setPrev] = useState();

    const onOk = ({ text, ...image }) => {
        console.log(displayType, image, text);
        if (displayType === Types.TEXT) {
            onTextOk(text);
            setText(text);
        } else {
            onImageOk(image);
            setImage(image);
        }
    };

    const handlePrev = () => {
        setImage(prev.image);
        setText(prev.text);
        setDisplayType(prev.displayType);
    };
    const handleReset = () => {
        setPrev({
            image,
            text,
            displayType
        });
        setImage(DefaultImage);
        setText(DefaultText);
        setDisplayType('');
    };
    if (setRef) setRef({ setDisplayType, handleReset, handlePrev });

    const types = Object.keys(initFinish);
    return (
        <Wrapper>
            <Monitor displayType={displayType} onOk={onOk} image={image} text={text} />
            {Conifg.filter(({ type }) => !types.includes(type)).map(({ type, title }) => (
                <DraggableCard key={type} id={type}>
                    {title}
                </DraggableCard>
            ))}
        </Wrapper>
    );
}
export default LeftColumn;
