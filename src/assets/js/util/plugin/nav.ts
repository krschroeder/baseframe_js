import $ from 'cash-dom';

const submenuBtn = (params, menuText) => {
    const $btn = $('<button>').attr({
        class: params.submenuBtnCss,
        type: 'button',
        'aria-label': menuText
    });

    return $btn;
}

export default submenuBtn