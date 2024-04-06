
const transition = () => {
    let inTransition = false;
    let tto: ReturnType<typeof setTimeout> = null;
    let currEndTransitionFn = () => {};

    return (
        startFn: (...args) => any, 
        endFn: (...args) => any, 
        duration: number = 300
    ) => {
        
        if (inTransition) {
            currEndTransitionFn();
            clearTimeout(tto);
        }

        startFn();

        currEndTransitionFn = endFn;

        inTransition = true;
        tto = setTimeout(() => {
            currEndTransitionFn();

            inTransition = false;
        }, duration)
    }
}

export default transition;