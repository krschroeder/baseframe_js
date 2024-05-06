
type EventFn = (...args:any) => void;

const eventsMap: Map<HTMLElement,Record<string,EventFn>> = new Map();





function addEventListener(el: HTMLElement, eventName: string, selector, fn: EventFn) {

    const [evtName] = eventName.split('.');


    const outerFn =  function(event) {
        const possibleTargets = el.querySelectorAll(selector);
        const target = event.target;

        for (let i = 0, l = possibleTargets.length; i < l; i++) {
            let el = target;
            const p = possibleTargets[i];

            while(el && el !== el) {
                if (el === p) {
                    return fn.call(p, event);
                }

                el = el.parentNode;
            }
        }
    };

    if (eventsMap.has(el)) {
       const elRecord = eventsMap.get(el);

        elRecord[eventName] = outerFn;
    } else {
        eventsMap.set(el, {[eventName]: outerFn});
    }
   

    el.addEventListener(evtName, eventsMap.get(el)[eventName]);
}

export default function on(el: HTMLElement, eventName: string, selector, fn: EventFn) {
    
    const elSelIsHTMLElem = el instanceof HTMLElement;
    const elIsHTMLCollection = el instanceof HTMLCollection;
    const elIsStr = 'string' === typeof el;
    const isID = elIsStr && (/^#/).test(el);
    const isCls = elIsStr && (/^\./).test(el);

    const el = elSelIsHTMLElem || elIsHTMLCollection ? el : 
        isID ? document.getElementById(el.slice(1)) : 
        isCls ? document.getElementsByClassName(el.slice(1)) :
        document.querySelectorAll(el)
    ;

    const events = eventName.split(' ').filter(e => e);

    if (isID || elSelIsHTMLElem) {

        for (let thisEventName of events) { 
            addEventListener(el, thisEventName, selector, fn);
        }
        
        return;
    }

    for (let i = 0, l = el.length; i < l; i++) {
        const currElem = el[i];
        for (let thisEventName of events) {
            addEventListener(currElem, thisEventName, selector, fn);
        }
    }
}