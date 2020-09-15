
export default function smoothScroll(top, amount = 10) {

    let prevScroll = null;

    (function smoothScrollInner() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop || 0;

        //to stop the scroll if some other action prevents it from going
        if (prevScroll === currentScroll) return;
        prevScroll = currentScroll;

        if (currentScroll < top) {

            window.requestAnimationFrame(smoothScrollInner);

            window.scroll(0, currentScroll + ((top - currentScroll) / amount));
        }
    })();
}