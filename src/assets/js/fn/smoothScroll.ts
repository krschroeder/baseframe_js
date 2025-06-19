import $be, { type EventName} from 'base-elem-js';
import { body, isFunc } from '../util/helpers';
import animate from '../util/animate';
import debounce from './debounce';

import Easing, {type Easings, type EasingFn} from '../util/Easing';

const EVENT_NAME = 'smoothScroll';
const userBreakEvents = [`wheel.${EVENT_NAME}`, `touchstart.${EVENT_NAME}`] as EventName[];

let activeScroll = false;

export default function smoothScroll(
    scrollTargetY: number,
    duration = 500,
    easing: EasingFn | Easings = 'easeOutQuint',
    scrollEndFn?: (...args) => void
): void {
    if (activeScroll) return;

    let progress = 0;
    const 
        startScrollY    = window.scrollY,
        scrollDistance  = Math.abs(startScrollY - scrollTargetY),
        scrollDir       = startScrollY < scrollTargetY ? 1 : -1,
        msPerFrame      = 1000 / 60,
        frames          = duration / msPerFrame,
        progressSize    = scrollDistance / frames
    ;

    if (scrollDistance === 0) return;
    activeScroll = true;

    body.style.scrollBehavior = 'auto';

    const easingFn: EasingFn = isFunc(easing)
        ? easing as EasingFn
        : Easing[easing as Easings]
    ;

    const cancelAnimation = animate(() => {
        progress += progressSize;

        const scrollProgress = scrollDistance * easingFn(progress / scrollDistance);
        const yPos = startScrollY + scrollProgress * scrollDir;

        window.scroll(0, yPos);
        
        if (progress > scrollDistance) cancel();
    });

    const cancel = () => {
        if (isFunc(scrollEndFn)) scrollEndFn();
        cancelAnimation();
        
        $be(window).off([...userBreakEvents, `scroll.${EVENT_NAME}`]);
        body.style.scrollBehavior = null;
        
        activeScroll = false;
    }
     
    $be(window).on(userBreakEvents, cancel);
    debounce(window,`scroll.${EVENT_NAME}`, cancel);
}

