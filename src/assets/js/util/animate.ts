
 
type AnimateCbFn = (cancelAnimation: () => void) => void;

const animate = (fn: AnimateCbFn, fps = 60) => {
    let requestAnimate = null;
    let msPrev = performance.now();
    const msPerFrame = 1000 / fps;

    const cancelAnimation = () => cancelAnimationFrame(requestAnimate);
    const refresh = (msNow: DOMHighResTimeStamp) => {
        requestAnimate = window.requestAnimationFrame(refresh)
        const msPassed = msNow - msPrev;
        if (msPassed < msPerFrame) return;
        const excessTime = msPassed % msPerFrame;
        msPrev = msNow - excessTime;
        
        fn(cancelAnimation);
    }

    refresh(msPrev);

    return cancelAnimation;
}

export default animate;
 