import Column from 'components/Column';
import DragDrop, { DraggableCard, DroppableCard } from 'components/DragDrop';
import Header from 'components/Header';
import Row from 'components/Row';
import { useSideMenu } from 'provider/Menu';
import { MenuTypes } from 'utils/define';
import { Wrapper } from './styled';
import Card from 'components/Card';
import LeftColumn from 'components/LeftColumn';
import RightColumn from 'components/RightColumn';
import { Types } from 'components/LeftColumn/define';
import { DefaultImage, DefaultText } from 'components/RightColumn/define';
import { useState } from 'react';

function MainLayout({ children }) {
    const { getIsOpen } = useSideMenu();
    let rightColumnRef = {},
        leftColumnRef = {};
    const [initFinish, setInitFinish] = useState({});
    const [prev, setPrev] = useState();
    const isSideMenuOpen = getIsOpen(MenuTypes.SIDE_MENU);
    const sideMenuWidth = isSideMenuOpen ? { xl: 6, lg: 8, md: 8, sm: 8, xs: 24 } : { span: 0 };
    const mainContentWidth = isSideMenuOpen ? { xl: 18, lg: 16, md: 16, sm: 16, xs: 24 } : { span: 24 };

    const onReset = () => {
        setPrev({ initFinish });
        setInitFinish({});
        if (leftColumnRef.handleReset) leftColumnRef.handleReset();
    };

    const onDrag = (from, to) => {
        if (to === 'column-2') {
            setInitFinish({ ...initFinish, [from]: true });
            if (from === Types.IMAGE) onImageOk(DefaultImage);
            else if (from === Types.TEXT) onTextOk(DefaultText);
        }
    };

    const onTextOk = (text) => {
        if (rightColumnRef.setText && text) rightColumnRef.setText(text);
    };
    const onImageOk = (image) => {
        if (rightColumnRef.setImage) rightColumnRef.setImage(image);
    };
    const setRef = (type, ref) => {
        if (type === 'left') leftColumnRef = ref;
        else rightColumnRef = ref;
    };
    const onDisplay = (type) => {
        if (leftColumnRef.setDisplayType) leftColumnRef.setDisplayType(type);
    };
    const onPrev = () => {
        setInitFinish(prev.initFinish);
        if (leftColumnRef.handlePrev) leftColumnRef.handlePrev();
    };
    return (
        <Wrapper>
            <Header />
            <div className="content">
                <DragDrop>
                    <Row gutter={[16, 16]}>
                        <Column {...sideMenuWidth}>
                            <DroppableCard id="column-1" onDrag={onDrag}>
                                <LeftColumn
                                    initFinish={initFinish}
                                    setRef={(ref) => setRef('left', ref)}
                                    onTextOk={onTextOk}
                                    onImageOk={onImageOk}
                                />
                            </DroppableCard>
                        </Column>
                        <Column {...mainContentWidth}>
                            <DroppableCard id="column-2" onDrag={onDrag}>
                                <RightColumn
                                    onPrev={onPrev}
                                    onReset={onReset}
                                    initFinish={initFinish}
                                    setRef={(ref) => setRef('right', ref)}
                                    onDisplay={onDisplay}
                                />
                            </DroppableCard>
                        </Column>
                    </Row>
                </DragDrop>
            </div>
        </Wrapper>
    );
}
export default MainLayout;
