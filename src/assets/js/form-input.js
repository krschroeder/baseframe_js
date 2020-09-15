import $ from 'cash-dom';
const VERSION = "1.0.0";

const formInputs = {
    version: VERSION, 

    radioCheckboxEnableSpacebar: () => {
        const _ = formInputs;

        $(window).on('keydown.radioCheckboxEnableSpacebar radioCheckboxEnableSpacebar',function(ev){
        
            var e = ev || window.event;
            var key = e.keyCode || e.which;
            var SPACE = 32;
            var ACTIVE_ELEM = document.activeElement;
            
            if (key === SPACE && 
                    (
                        ACTIVE_ELEM.nodeName.toUpperCase() === 'LABEL'
                    ) 
                ){
                    
                ACTIVE_ELEM.click();
    
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