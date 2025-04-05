// import $ from 'cash-dom';
import type { EventName } from 'base-elem-js';
import $be from 'base-elem-js';

const throttledResize = (
    callback: (...args) => void,
    _namespace: string = 'throttledResize',
    manualTrigger: boolean = false,
    delay: number = 100
): void => {

    let _throttledResize = null;
    const namespace = _namespace !== '' ? `.${_namespace}` : '';

    //must pass in a function for the first argument else exit the script
    if (typeof callback !== 'function') {
        console.error('first parameter should be a function');
        return;
    }

    $be(window).on([`resize${namespace}`, manualTrigger ?  _namespace : ''].filter(Boolean) as EventName[], (e) => {

        clearTimeout(_throttledResize);

        _throttledResize = setTimeout(callback, delay, e);
    });

    if (manualTrigger) {
        setTimeout(callback, 0);
    }

}

export default throttledResize;