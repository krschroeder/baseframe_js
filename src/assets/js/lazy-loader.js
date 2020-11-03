import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json.js';
import { isVisible } from './util/helpers';


const VERSION = '1.0.0';
const DATA_NAME = 'LazyLoad';

const ieScript = document.createElement('script');
const isIE = /MSIE \d|Trident.*rv:/.test(navigator.userAgent);

let isLoaded = false;
let scriptAppended = false;
let lazyElemObserver = null;

const _lazyElemObserver = (_) => {

    const { loadedCb, force, observerOpts, imgSrcName, bgSrcName } = _.params;

    return new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {

            const lazyElem = entry.target;

            if (entry.isIntersecting && isVisible(lazyElem) || force) {

                const src = lazyElem.dataset[imgSrcName];
                const bgImg = lazyElem.dataset[bgSrcName];

                if (src) {
                    lazyElem.src = src;
                }

                if (bgImg) {
                    lazyElem.style.backgroundImage = `url("${bgImg}")`;
                    lazyElem.removeAttribute('data-bg-src');
                }

                lazyElemObserver.unobserve(lazyElem);

                typeof loadedCb === 'function' && loadedCb(lazyElem);
            }
        });
    }, observerOpts);
}


export default class LazyLoad {

    static get version() {
        return VERSION;
    }

    static get pluginName() {
        return DATA_NAME;
    }

    static get defaults() {
        return {
            imgSrcName: 'src',
            bgSrcName: 'bgSrc',
            loadedCb: () => { },
            force: false,
            polyfillSrc: 'https://polyfill.io/v3/polyfill.js?features=IntersectionObserver',
            observerOpts: { rootMargin: '48px' },
            isIE: isIE
        }
    }

    constructor(element, options) {
        const _ = this;

        _.element = element;

        const dataOptions = validJSONFromString(
            $(element).data(DATA_NAME + '-options')
        );

        $.store.set(
            element,
            `${DATA_NAME}_params`,
            $.extend(LazyLoad.defaults, options, dataOptions)
        );

        _.params = $.store.get(element, `${DATA_NAME}_params`);

        _.lazyLoad();
    }

    lazyLoad() {
        const _ = this;

        if (isIE && !isLoaded) {

            if (!scriptAppended) {

                ieScript.src = _.params.polyfillSrc;

                document.body.appendChild(ieScript);

                scriptAppended = true;
            }

            ieScript.addEventListener('load', () => {
                _.lazyLoadInner();
                isLoaded = true;
                console.log('loaded script')
            });

        } else {
            _.lazyLoadInner();
        }
    }

    lazyLoadInner() {
        const _ = this;

        if (window.IntersectionObserver) {

            if (!lazyElemObserver) {
                lazyElemObserver = _lazyElemObserver(_);
            }

            lazyElemObserver.observe(_.element[0]);

        } else {
            console.warn(`You're window doesn't contain the "IntersectionObserver" property, please use a polyfill`);
        }
    }
}