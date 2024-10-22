import cloneDeep from 'lodash.clonedeep';
import { useState } from 'react';
import { MenuTypes } from 'utils/define';
import Context from './context';

function Provider({ children }) {
    const [menuOpens, setMenuOpens] = useState({ [MenuTypes.SIDE_MENU]: true });

    const open = (key) => {
        const temp = cloneDeep(menuOpens);
        temp[key] = true;
        setMenuOpens(temp);
    };

    const close = (key) => {
        const temp = cloneDeep(menuOpens);
        temp[key] = false;
        setMenuOpens(temp);
    };
    const toggle = (key) => {
        const temp = cloneDeep(menuOpens);
        temp[key] = !temp[key];
        setMenuOpens(temp);
    };
    const getIsOpen = (key) => menuOpens[key];

    const value = { getIsOpen, open, close, toggle };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
