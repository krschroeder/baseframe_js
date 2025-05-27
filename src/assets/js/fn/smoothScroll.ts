import $be from 'base-elem-js';
import { docTop } from '../util/helpers';

// We need to debounce the checking of the previous scroll for a bug in IOS
// that says the previous pixel is the same as the current pixel.
// Q: Why do we need to check if the current pixel is the same as the previous?
// A: Because it could indicate that the element cannot be completely scrolled to
//    and as a result we need to break this JS scroll 
const checkIterationAmt = 3;

let activeScroll = false;

export default function smoothScroll(
    elemYPos: number,
    _speed = 100,
    afterScroll?: (...args) => void,
    afterScrollArgs: any[] = []
): void {

    // If an active scroll is going exit until it's done
    if (activeScroll) return;

    const speed = _speed / 1000;
    
    activeScroll = true;
    let 
        prevScroll = null,
        animation = null,
        userBreakScroll = false,
        pxToCheckIteration = 0
    ;

    const targetIsAbove = elemYPos < docTop();

    $be(window).on('wheel.smoothScroll', () => { userBreakScroll = true });

    document.body.style.scrollBehavior = 'auto';

    const scrollDone = () => {
        if (typeof afterScroll === 'function') {
            afterScroll.apply(null, afterScrollArgs);
        }
        window.cancelAnimationFrame(animation);
        activeScroll = false;
        $be(window).off('wheel.smoothScroll');
        document.body.style.scrollBehavior = null;
    }

    (function smoothScrollInner() {
        const currentScroll = docTop();

        if (prevScroll === currentScroll || userBreakScroll) {
            scrollDone();
            return;
        }

        if (pxToCheckIteration === checkIterationAmt) {
            prevScroll = currentScroll;
            pxToCheckIteration = 0;

        } else {
            pxToCheckIteration++;
        }

        const isAtTarget = Math.floor(currentScroll - elemYPos) === 0;
        const isPastTarget = targetIsAbove ? prevScroll < currentScroll : prevScroll > currentScroll;

        if (!isAtTarget || !isPastTarget) {

            animation = window.requestAnimationFrame(smoothScrollInner);
            window.scroll(0, currentScroll + ((elemYPos - currentScroll) * speed));
        } else {
            scrollDone();
            return;
        }
    })();
}