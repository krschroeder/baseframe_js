import $ from 'cash-dom';

const submenuBtn = (params, menuText) => {
    const $btn = $('<button>').attr({
        class: params.submenuBtnCss,
        type: 'button'
    });

    $btn.html(`<span class="sr-only">toggle submenu for "${menuText}"</span>`);

    return $btn;
}

export default submenuBtn