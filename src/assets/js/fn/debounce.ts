import type { EventFn, EventName, SelectorElem  } from 'base-elem-js';
import type { WinSetTimeout } from '../types';

import $be from 'base-elem-js';

interface debounceConfig {
    immediate?: boolean;
    delay?: number;
}

const defaultConfig = {
    immediate: false,
    delay: 100
}

export const debounceResize = (
    cb: EventFn,
    namespace: string = 'debounceResize',
    immediate: boolean = false,
    delay: number = 100
): void => {
    const nm = namespace !== '' ? `.${namespace}` : '';
    const events = [`resize${nm}`] as EventName[];
   
    debounce(window, events, cb, {immediate, delay});
}

const debounce = (
    elem: SelectorElem | string,
    event: EventName | EventName[],
    cb: EventFn,
    config?: debounceConfig
): void => {

    const $elem = $be(elem); 
    const p = {...defaultConfig, ...config};

    let timer = null;
    if (elem !== window) console.log(elem,p)
   
    $elem.on(event, (ev, elem) => {
        clearTimeout(timer);
        timer = setTimeout(cb, p.delay, ev, elem);
    });

    if (p.immediate) {
        $elem.each((elem) => {
            const ev = new Event(typeof event === 'string' ? event : event[0]);
            setTimeout(cb, 0, ev, elem);
        });
    }
} 

export default debounce;