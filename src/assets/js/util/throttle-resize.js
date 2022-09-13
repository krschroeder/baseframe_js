const throttledResize = (callback, _namespace = 'throttledResize', manualTrigger = false, delay = 100) => {


    let _throttledResize = null;
    const namespace = _namespace !== '' ? `.${_namespace}` : '';

    //must pass in a function for the first argument else exit the script
    if (typeof callback !== 'function') {
        console.error('first parameter should be a function');
        return;
    }

    $(window).on(`resize${namespace}${manualTrigger && ' ' + _namespace}`, (e) => {

        clearTimeout(_throttledResize);

        _throttledResize = setTimeout(callback, delay, e);
    });

    if (manualTrigger) {
        setTimeout(callback, 0);
    }

}

export default throttledResize;