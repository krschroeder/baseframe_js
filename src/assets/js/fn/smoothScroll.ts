import $be, { type EventName} from 'base-elem-js';
import { body, docTop, isFunc } from '../util/helpers';
import debounce from './debounce';
 
const EVENT_NAME = 'smoothScroll';

const userBreakEvents = [`wheel.${EVENT_NAME}`, `touchstart.${EVENT_NAME}`] as EventName[];

let activeScroll = false;


export default function smoothScroll(
    scrollTargetY: number,
    duration = 1000,
    easingFn?: (pct: number) => number,
    afterScroll?: (...args) => void
): void {
    if (activeScroll) return;
    activeScroll = true;
     
    let msPrev = window.performance.now();

    const 
        startScrollY    = window.scrollY,
        scrollDistance  = Math.abs(startScrollY - scrollTargetY),
        scrollDir       = startScrollY < scrollTargetY ? 1 : -1,
        useEasing       = isFunc(easingFn),
        msPerFrame      = 1000 / 60,
        frames          = duration / msPerFrame,
        progressSize    = scrollDistance / frames
    ;

  
    console.log('scroll to:', scrollTargetY)
    console.log('progress size:', progressSize)
    // state
    let 
        animation = null,
        breakScroll = false,
        progress = 0
    ;

    const doBreakScroll = () => breakScroll = true;

    $be(window).on(userBreakEvents, doBreakScroll);
    debounce(window,`scroll.${EVENT_NAME}`, doBreakScroll);

    body.style.scrollBehavior = 'auto';
   
    console.time('smoothScroll');

    const cleanUpScroll = () => {
        if (isFunc(afterScroll)) afterScroll();
        cancelAnimationFrame(animation);
        console.timeEnd('smoothScroll');
        
        $be(window).off([...userBreakEvents, `scroll.${EVENT_NAME}`]);
        body.style.scrollBehavior = null;
        
        activeScroll = false;
    }

    
    const scrollFn = () => {
        if (breakScroll) {
            cleanUpScroll();
            
            return;
        }

        animation = requestAnimationFrame(scrollFn);

        const msNow = window.performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed < msPerFrame) return;

        const excessTime = msPassed % msPerFrame;
        msPrev = msNow - excessTime;
        
        progress += progressSize;

        const scrollProgress = useEasing ? (progress * easingFn(progress / scrollDistance)) : progress;
        const yPos = startScrollY + scrollProgress * scrollDir;
        
        window.scroll(0, yPos);
        
        if (progress > scrollDistance) cleanUpScroll();
    };

    scrollFn();
}