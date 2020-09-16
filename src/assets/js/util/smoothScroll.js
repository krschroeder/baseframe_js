const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;

export default function smoothScroll(elemYPos, _speed = 100) {

    let prevScroll = null;
    const speed = _speed / 1000;

    (function smoothScrollInner() {
        const currentScroll = docTop();
       

        if ( prevScroll === currentScroll) {
            return;
        }

        prevScroll = currentScroll;

        if (Math.floor(currentScroll - elemYPos) !== 0 ) {
            console.log('whatt',currentScroll, elemYPos)
            window.requestAnimationFrame(smoothScrollInner);

            window.scroll(0, currentScroll + ((elemYPos - currentScroll) * speed));
        }
    })();
}