const ensureTransitionDelay = 100;

const transition = () => {
    let inTransition = false;
    let sto: ReturnType<typeof setTimeout> = null;
    let eto: ReturnType<typeof setTimeout> = null;
    let currEndTransitionFn = () => {};

    return (
        startFn: (...args) => any, 
        endFn: (...args) => any, 
        duration: number = 300
    ) => {
        
        if (inTransition) {
            currEndTransitionFn();
            clearTimeout(sto);
            clearTimeout(eto);
        }

        sto = setTimeout(() => {
            startFn();
        }, ensureTransitionDelay);

        currEndTransitionFn = endFn;

        inTransition = true;
        eto = setTimeout(() => {
            currEndTransitionFn();

            inTransition = false;
        }, duration + ensureTransitionDelay)
    }
}

export default transition;