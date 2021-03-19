const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;

let activeScroll = false;

export default function smoothScroll(elemYPos, _speed = 100, afterScroll = () => { }, afterScrollArgs = []) {
    
    // If an active scroll is going exit until it's done
    if (activeScroll) return;

    activeScroll = true;

    let prevScroll = null;
    const speed = _speed / 1000;
    let animation = null;

    const targetIsAbove = elemYPos < docTop();
    
   
    const scrollDone = () => {
        afterScroll.apply(null, afterScrollArgs);
        window.cancelAnimationFrame(animation);
        activeScroll = false;
    }

    (function smoothScrollInner() {
        const currentScroll = docTop();

        if (prevScroll === currentScroll) {
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