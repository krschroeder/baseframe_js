import type { PlainObject } from '../types';
import type { Cash } from 'cash-dom';

import $ from 'cash-dom';

type classOrId = '#' | '.';

const getCssAttr = (styleStr, find: classOrId, rm: classOrId): null | string => {
    const styleProp = styleStr.indexOf(find) !== -1 ? styleStr.split(find)[1] : null;

    if (!styleProp) return null;
    const rmIndex = styleProp.indexOf(rm);
    return rmIndex !== -1 ? styleProp.substring(0, rmIndex) : styleProp;
}

const hyperScript = (selector: string, props: PlainObject<any> = {}): Cash => {
    
    const
        tagName = selector.split(/(\#|\.)/)[0],
        className = getCssAttr(selector, '.', '#'),
        idName = getCssAttr(selector, '#', '.'),
        baseObj = { class: className, id: idName };

    let text = '';

    if (props.text) {
        text = props.text;
        $.extend(props, { text: null });
    }

    const $elem: Cash = $(`<${tagName}>`).attr(Object.assign(baseObj, props));

    text && $elem.text(text);

    return $elem;
}

export default hyperScript;