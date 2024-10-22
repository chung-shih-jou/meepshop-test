import Row from 'components/Row';
import Column from 'components/Column';
import { useSideMenu } from 'provider/Menu';

import { MenuSvg } from 'assets';
import { Wrapper } from './styled';
import { MenuTypes } from 'utils/define';

function Header() {
    const { toggle } = useSideMenu();
    const onClickMenu = () => {
        toggle(MenuTypes.SIDE_MENU);
    };
    return (
        <Wrapper>
            <Row align={'center'} gutter={[64, 64]}>
                <Column md={2} sm={0} xs={0}>
                    <MenuSvg className="menu-icon" onClick={onClickMenu} />
                </Column>
                <Column md={22} sm={24} xs={24} align={'start'}>
                    <h1>Meepshop Frontend Test</h1>
                </Column>
            </Row>
        </Wrapper>
    );
}
export default Header;
