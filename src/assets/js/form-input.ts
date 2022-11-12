import $ from 'cash-dom';

const VERSION = "1.1.0";

const formInputs = {
    version: VERSION, 

    radioCheckboxEnableSpacebar: () => {
        const _ = formInputs;

        $(window).on('keydown.radioCheckboxEnableSpacebar radioCheckboxEnableSpacebar',function(ev){
        
            var e = ev || window.event;
            var key = e.keyCode || e.which;
            var SPACE = 32;
            var ae = document.activeElement;
            
            if (
                key === SPACE && 
                ae.nodeName.toUpperCase() === 'LABEL' &&
                ae instanceof HTMLElement
            ){
                ae.click();
    
                e.preventDefault();
                e.stopPropagation();
    
            }
        });

        return _;
    },

    init: () => {
        const _ = formInputs;

        _.radioCheckboxEnableSpacebar();
    }
}


export default formInputs;