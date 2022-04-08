import { elData } from "./util/store";
import validJSONFromString from './util/formatting-valid-json';
import { KEYS } from "./util/constants";
import { isMobileOS, IE_Event } from "./util/helpers";
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role


const VERSION = "2.2.0";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';


const DEFAULTS = {
    cssPrefix: 'select-enhance',
    mobileNative: true,
    emptyValAsPlaceholder: true,
    focusIn: (el) => { },
    focusOut: (el) => { },
    beforeChange: (el) => { },
    afterChange: (el) => { },
    blurDuration: 250,
    typeAheadDuration: 500,
    observeSelectbox: true
};

// wrap the select first
const mobileOS = isMobileOS();

// helper
const getSelectedOptNode = ($el) => $el.find('option').filter(function () { return this.selected })[0];

// global private state props
let to = null,
    $currSelectEnhance = null,
    listPosTop = true,
    registerEventScroll = false,
    currSelectInstance = null
    ;


export default class SelectEnhance {


    static get version() {
        return VERSION;
    }

    static get pluginName() {
        return DATA_NAME;
    }

    static get defaults() {
        return DEFAULTS
    }

    constructor(element, options, index) {
        const _ = this;

        _.index = index;
        _.$element = $(element);
        _.id = _.$element.attr('id') || _.$element.attr('name') || 'select_enhance_' + index;
        _.selectId = _.id + '_enhance';
        _.$label = $(`label[for="${_.id}"]`);
        _.$selectEnhance = null;
        _.$textInput = null;
        _.$selectList = null;
        _.optionSet = new WeakMap();
        _.selectboxObserver = null;
        _.selectListBoxInFullView = true;
        _.keyedInput = "";

        if (_.$label.length) {
            _.$label.attr({ id: _.selectId + '_lbl' });
        }

        const dataOptions = validJSONFromString(
            $(element).data(DATA_NAME + '-options')
        );

        elData(
            element,
            `${DATA_NAME}_params`,
            $.extend({}, SelectEnhance.defaults, options, dataOptions)
        );
        _.params = elData(element, `${DATA_NAME}_params`);


        _.setUpSelectHtml();

        if (mobileOS && _.params.mobileNative) {

            _.mobileOnlyIfNavite();

        } else {

            // 
            // attach events
            // 

            if (_.params.observeSelectbox) {
                _.selectInputMutationObserver();
            }
            _.eventLabelClick();
            _.eventKeyboardSearch();
            _.eventShowOptions();
            _.eventOptionClick();
            _.eventSelectToggle();
            _.eventArrowKeys();
            _.observeSelectListBoxInFullView();
            // _.eventTabBlur();
            SelectEnhance.eventScrollGetListPosition();
        }

        return this;
    }

    mobileOnlyIfNavite() {
        const _ = this;

        let prevElSelectedVal = getSelectedOptNode(_.$element);

        _.$element.on('mouseup.' + EVENT_NAME, 'option', function (e) {

            if (!this.isSameNode(prevElSelectedVal)) {
                _.params.beforeChange(_.$element);
            }

        }).on('change.' + EVENT_NAME, function (e) {
            _.params.afterChange(_.$element);
            prevElSelectedVal = getSelectedOptNode(_.$element);
        });
    }

    // Events 

    blurSelect() {
        const _ = this;

        _.$selectEnhance.addClass(_.params.cssPrefix + '--blurring');
        _.$selectEnhance.removeClass(_.params.cssPrefix + '--focused')

        _.$textInput.attr({ 'aria-expanded': false });

        setTimeout(() => {
            _.$selectEnhance.removeClass(_.params.cssPrefix + '--blurring');

            $currSelectEnhance = null;
            currSelectInstance = null;

        }, _.params.blurDuration);
    }

    setSelectionState($btn, doBlur = true) {
        const _ = this;
        const { cssPrefix } = _.params;

        const selectedOpt = _.optionSet.get($btn[0]);

        _.params.beforeChange(_.$element);

        selectedOpt.selected = true;

        _.params.afterChange(_.$element);

        // update the selected
        _.$selectEnhance
            .find('button[aria-selected]')
            .attr({ 'aria-selected': false });

        $btn.attr({ 'aria-selected': true });
        _.$textInput.attr({ 'aria-activedescendant': $btn[0].id });

        // add a class whether there is an input value or not
        _.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());

        _.$element[0].dispatchEvent(new (Event || IE_Event)('change'));

        if (_.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            _.$textInput.val('');
            _.$textInput.attr({ placeholder: selectedOpt.text });
        } else {
            _.$textInput.val(selectedOpt.text);
        }

        if (doBlur) {

            _.$textInput[0].focus();

            _.blurSelect();

        } else {
            $btn[0].focus();
        }
    }

    eventLabelClick() {
        const _ = this;

        _.$label.on('click.' + EVENT_NAME, function (e) {
            e.preventDefault();
            if (!_.$element[0].disabled) {
                _.$textInput[0].focus();
            }
        })
    }

    eventShowOptions() {
        const _ = this;

        function showOptions(e) {
            if (_.$element[0].disabled) { return }

            _.$selectEnhance.toggleClass(_.params.cssPrefix + '--focused');
            _.$textInput.attr({ 'aria-expanded': true });

            const $selectedBtn = _.$selectEnhance.find('button[aria-selected="true"]');

            if ($selectedBtn.length) {
                $selectedBtn[0].focus();
            }

            $currSelectEnhance = _.$selectEnhance;
            currSelectInstance = _;

            SelectEnhance.getListPosition();
        }

        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__enable-text', showOptions);

        _.$textInput.on('keypress.' + EVENT_NAME, function (e) {

            if (e.key !== KEYS.TAB || e.shiftKey && e.key !== KEYS.TAB) {
                e.preventDefault();
            }

            if (
                e.key === KEYS.ENTER ||
                e.keyCode === KEYS.SPACE && _.keyedInput.trim() === '' ||
                e.ctrlKey && e.altKey && e.shiftKey && KEYS.SPACE === e.keyCode
            ) {

                showOptions(e);
            }
        });
    }

    eventOptionClick() {
        const _ = this;

        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__list-btn', function (e) {

            e.preventDefault();

            _.$selectEnhance.removeClass(_.params.cssPrefix + '--focused');
            _.$textInput.attr({ 'aria-expanded': false });

            _.setSelectionState($(this));

        });
    }

    eventSelectToggle() {
        const _ = this;

        _.$selectEnhance.on('focusin.' + EVENT_NAME, function (e) {
            _.params.focusIn(_.$element);

            $(document.body).on(
                'click.close_' + _.selectId + EVENT_NAME, function (e) {
                    setTimeout(() => {
                        const ae = document.activeElement;

                        if (
                            !_.$selectEnhance.has(ae).length ||
                            _.$selectEnhance[0].isSameNode(ae)
                        ) {
                            _.blurSelect();
                            $(document.body).off('click.close_' + _.selectId + EVENT_NAME);

                        }
                    }, 100);
                });

        });
    }

    eventKeyboardSearch() {
        const _ = this;

        let keyInputTo = null,
            keyedFound = []
            ;

        _.$selectEnhance.on('keypress.' + EVENT_NAME, function (e) {

            if (_.$element[0].disabled) { return }
            const keyCurr = (e.key.length === 1 ? e.key : '');

            _.keyedInput += keyCurr;

            clearTimeout(keyInputTo);
            keyInputTo = setTimeout(() => {
                _.keyedInput = "";
            }, _.params.typeAheadDuration);

            if (_.keyedInput.trim()) {

                const rgx = RegExp('^' + _.keyedInput.trim(), 'i');

                keyedFound = [].slice.call(
                    _.$element.find('option').filter((i, el) => rgx.test(el.text) === true)
                );

                if (keyedFound.length) {

                    _.setSelectionState(_.optionSet.get(keyedFound[0]), false);
                }
            }
        });
    }

    eventArrowKeys() {

        const _ = this;

        _.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {

            if (_.$element[0].disabled) { return }

            let to = null;

            if (e.key === KEYS.DOWN || e.key === KEYS.TAB && !e.shiftKey) {
                if (!_.$textInput[0].isSameNode(document.activeElement)) {

                    e.preventDefault();
                }
                _.nextOptionButton('next');

            }

            if (e.key === KEYS.UP) {
                e.preventDefault();

                _.nextOptionButton('prev');
            }

            if (e.key === KEYS.ESC && $currSelectEnhance) {

                _.blurSelect();
                _.$textInput[0].focus();
            }

            if (e.key === KEYS.TAB && e.shiftKey) {
                clearTimeout(to);
                to = setTimeout(() => {
                    if (_.$textInput[0].isSameNode(document.activeElement)) {
                        _.blurSelect();
                    }
                }, 100)
            }
        });
    }

    //  build the HTML for it

    setUpSelectHtml() {
        const _ = this;


        const $selectEnhance = $('<div />').attr({
            class: _.params.cssPrefix,
            id: _.selectId + '_wrap'
        });

        const $textInput = $('<input>').attr({
            type: 'text',
            class: _.params.cssPrefix + '__enable-text',
            role: "combobox",
            'aria-controls': _.selectId + '_listbox',
            'aria-labelledby': _.selectId + '_lbl',
            'aria-autocomplete': 'list',
            'aria-expanded': false,
            id: _.selectId + '_input'
        });


        _.$element.wrap($selectEnhance);

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$selectEnhance = _.$element.parent();

        if (mobileOS && _.params.mobileNative) {
            // exit if its a mobile device after wrapping for styling
            return;
        }

        $textInput.insertAfter(_.$element);
        _.$element.attr({ tabindex: '-1', 'aria-hidden': true });

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$textInput = _.$element.parent().find('#' + _.selectId + '_input');

        SelectEnhance.buildOptionsList(_);
    }

    static buildOptionsList(_) {

        const { cssPrefix } = _.params;

        const optGroup = _.$element[0].getElementsByTagName('optgroup');
        const hasOptGroup = !!optGroup.length;
        const $optGroupWm = new WeakMap();

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];

                $optGroupWm.set(group, $('<div/>').attr({
                    class: cssPrefix + '__optgroup',
                    role: 'group',
                    label: group.label || ""
                }).append($('<span>').attr({
                    class: cssPrefix + '__optgroup-label',
                    'aria-hidden': true
                }).text(group.label || "")));
            }
        }

        const options = _.$element[0].getElementsByTagName('option');


        _.$selectList = $('<div>').attr({
            class: cssPrefix + '__list',
            role: 'listbox',
            id: _.selectId + '_listbox',
            'aria-label': _.$label.text() || ''
        });


        const optId = _.selectId || 'select_' + index;


        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;

            if (opt.hidden) continue;

            const valCssStatus = opt.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';
            
            const attrs = {
                type: 'button',
                role: 'option', id,
                'data-value': opt.value,
                'aria-selected': opt.selected,
                disabled: opt.disabled ? 'disabled' : null,
                class: cssPrefix + '__list-btn' + valCssStatus
            };
            const $btn = $('<button/>').attr(attrs).text(opt.textContent);

            _.optionSet.set($btn[0], opt);
            _.optionSet.set(opt, $btn);
            // append to list or optgroup

            hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ?
                $optGroupWm.get(opt.parentElement).append($btn) :
                _.$selectList.append($btn)
                ;

            if (opt.selected) {
                _.$textInput.attr({ 'aria-activedescendant': id });
                _.$selectEnhance.toggleClass(cssPrefix + '--empty-val' , !opt.value.trim());
                
                if (_.params.emptyValAsPlaceholder && opt.value.trim() === '') {
                    _.$textInput.val('');
                    _.$textInput.attr({ placeholder: opt.text });
                } else {
                    _.$textInput.val(opt.text);
                }

            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                _.$selectList.append($optGroupWm.get(group))
            }
        }
        _.$selectList.insertAfter(_.$textInput);

    }

    nextOptionButton(dir) {

        const _ = this;
        const ae = document.activeElement;
        const $btnList = _.$selectList.find('button');
        const l = $btnList.length;

        if (_.$textInput[0].isSameNode(ae)) {
            $btnList.eq(dir === 'next' ? 0 : l - 1)[0].focus();
            return;
        }

        for (let i = 0; i < l; i++) {
            const el = $btnList[i];

            if (ae.isSameNode(el)) {

                if (dir === 'next') {

                    const isLast = i === l - 1;
                    $btnList.eq(isLast ? i : i + 1)[0].focus();
                } else {
                    const isFirst = i === 0;
                    $btnList.eq(isFirst ? i : i - 1)[0].focus();
                }

                break;
            }
        }
    }

    selectInputMutationObserver() {
        const _ = this;

        const selectNode = _.$element[0];
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {

                    SelectEnhance.refreshOptions(_.$element[0]);
                }
                else if (mutation.type === 'attributes') {
                    _.$selectEnhance.toggleClass(
                        _.params.cssPrefix + '--disabled',
                        _.$element[0].disabled
                    );
                }
            }
        };

        // Create an observer instance linked to the callback function
        _.selectboxObserver = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        _.selectboxObserver.observe(selectNode, config);

        // Later, you can stop observing
        // _.selectboxObserver.disconnect();

    }

    static eventScrollGetListPosition() {

        if (!registerEventScroll) {
            $(window).on('scroll.' + EVENT_NAME, () => {
                to && clearTimeout(to);

                to = setTimeout(SelectEnhance.getListPosition, 100);
            });

            registerEventScroll = true;
        }
    }

    observeSelectListBoxInFullView() {
        const _ = this;

        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {

                _.selectListBoxInFullView = selects[0].intersectionRatio === 1

            }, { threshold: [0, 1] });

            selectIntersectionObserver.observe(_.$selectList[0]);
        }
    }

    static getListPosition() {
        const _ = currSelectInstance;
        if (_ && _.$selectEnhance) {


            const selWrapPosTop = _.$selectEnhance.offset().top;
            const selListHeight = _.$selectList.height();

            const listPosAndHeight = _.$selectEnhance.offset().top +
                _.$selectEnhance.height() +
                selListHeight
                ;
            const winPosAndHeight = window.scrollY + $(window).height();

            if (
                listPosAndHeight > winPosAndHeight &&
                selWrapPosTop > selListHeight &&
                !_.selectListBoxInFullView
            ) {
                _.$selectEnhance.addClass(_.params.cssPrefix + '--pos-bottom');
                listPosTop = false;

            } else {
                _.$selectEnhance.removeClass(_.params.cssPrefix + '--pos-bottom');

                listPosTop = true;
            }
        }
    }

    static refreshOptions(element) {
        $(element).each(function () {
            const _ = elData(this, `${DATA_NAME}_instance`);

            if (_) {

                _.$selectList.remove();
                _.optionSet = new WeakMap();
                SelectEnhance.buildOptionsList(_);
            } else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }

    static remove(element) {

        $(element).each(function () {
            const _ = elData(this, `${DATA_NAME}_instance`);

            _.$selectEnhance.off('keydown.' + EVENT_NAME);
            _.$selectEnhance.off('keydown.navigate_' + EVENT_NAME);
            _.$selectEnhance.off('click.' + EVENT_NAME);
            _.$selectEnhance.off('focusout.' + EVENT_NAME);
            _.$selectEnhance.off('blur.' + EVENT_NAME);
            _.$label.off('click.' + EVENT_NAME);
            $(document.body).off('click.close_' + _.selectId + EVENT_NAME);
            // the window event will just stay
            _.$element.insertAfter(_.$selectEnhance);
            _.$element.attr({ tabindex: null, 'aria-hidden': null });
            _.$element.off('mouseup.' + EVENT_NAME);
            _.$element.off('change.' + EVENT_NAME);

            if (_.selectboxObserver) {
                _.selectboxObserver.disconnect();
            }
            _.$selectEnhance.remove();

            elData(this, `${DATA_NAME}_params`, null, true);
            elData(this, `${DATA_NAME}_instance`, null, true);
        });
    }

}
