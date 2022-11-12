import $ from 'cash-dom';

const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;

let activeScroll = false;

export default function smoothScroll(
    elemYPos: number, 
    _speed = 100, 
    afterScroll?:(...args) => void, 
    afterScrollArgs: any[] = []
):void {
    
    // If an active scroll is going exit until it's done
    if (activeScroll) return;

    activeScroll = true;

    let prevScroll = null;
    const speed = _speed / 1000;
    let animation = null;
    let userBreakScroll = false;

    const targetIsAbove = elemYPos < docTop();
    
    $(window).on('wheel.smoothScroll',()=> {userBreakScroll = true})
   
    const scrollDone = () => {
        if (typeof afterScroll === 'function') {
            afterScroll.apply(null, afterScrollArgs);
        }
        window.cancelAnimationFrame(animation);
        activeScroll = false;
        $(window).off('wheel.smoothScroll');
    }

    (function smoothScrollInner() {
        const currentScroll = docTop();

        if (prevScroll === currentScroll || userBreakScroll) {
            scrollDone();
            return;
        }

        prevScroll = currentScroll;

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