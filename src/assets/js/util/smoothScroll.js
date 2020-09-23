const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;

export default function smoothScroll(elemYPos, _speed = 100, afterScroll = () => { }, afterScrollArgs = []) {

    let prevScroll = null;
    const speed = _speed / 1000;
    let animation = null;

    const targetIsAbove = elemYPos < docTop();

    (function smoothScrollInner() {
        const currentScroll = docTop();

        if (prevScroll === currentScroll) {
            afterScroll.apply(null, afterScrollArgs);
            window.cancelAnimationFrame(animation);
            return;
        }

        prevScroll = currentScroll;

        const isAtTarget = Math.floor(currentScroll - elemYPos) === 0;
        const isPastTarget = targetIsAbove ? prevScroll < currentScroll : prevScroll > currentScroll;

        if (!isAtTarget || !isPastTarget) {

            animation = window.requestAnimationFrame(smoothScrollInner);

            window.scroll(0, currentScroll + ((elemYPos - currentScroll) * speed));
        } else {
            afterScroll.apply(null, afterScrollArgs);
            window.cancelAnimationFrame(animation);
            return;
        }
    })();
}