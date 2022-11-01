declare function throttleResize(
    callback:(...args) => any,
    namespace?: string, 
    manualTrigger?: boolean, 
    delay?: number
);

export default throttleResize;