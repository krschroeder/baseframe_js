
declare function throttleResize(
    callback:(...args) => {},
    namespace: 'string', 
    manualTrigger: boolean, 
    delay: number
);

export default throttleResize;