
import validJSONFromString from './util/formatting-valid-json.js';
import { isVisible } from './util/helpers';
import { elData } from './util/store';

const ieScript = document.createElement('script');
const isIE = /MSIE \d|Trident.*rv:/.test(navigator.userAgent);

const VERSION = '1.0.0';
const DATA_NAME = 'LazyLoad';


let isLoaded = false;
let scriptAppended = false;

const lazyElemObservers = new Map();

const _lazyElemObserver = (_) => {

    
    
    const { observerOpts } = _.params;
    return new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const { inEvt, outEvt, force, unobserve, loadImgs } = _.params;

            const lazyElem = entry.target;

            if (entry.isIntersecting && isVisible(lazyElem) || force) {

                loadImgs && _.imgAndBg(_,lazyElem);

                typeof inEvt === 'function' && inEvt(lazyElem);
        
                unobserve && _.lazyElemObserver.unobserve(lazyElem);

            } else {
                typeof outEvt === 'function' && outEvt(lazyElem);
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
            loadImgs: true,
            inEvt: null,
            outEvt: null,
            force: false,
            polyfillSrc: 'https://polyfill.io/v3/polyfill.js?features=IntersectionObserver',
            observerID: null,
            unobserve: true,
            observerOpts: { rootMargin: '48px' },
            isIE: isIE
        };
    }

    constructor(element, options) {
        const _ = this;

        _.element = element;

        const dataOptions = validJSONFromString(
            $(element).data(DATA_NAME + '-options')
        );
       
        elData(
            element,
            `${DATA_NAME}_params`,
            $.extend(
                LazyLoad.defaults,
                options, 
                dataOptions
            )
        );

        _.lazyElemObserver = null;

        _.params = elData(element, `${DATA_NAME}_params`);
        
        _.lazyLoad();

        return this;
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

            });

        } else {
            _.lazyLoadInner();
        }
    }

    imgAndBg(_,lazyElem) {

        const {imgSrcName, bgSrcName } = _.params;

        const src = lazyElem.dataset[imgSrcName];
        const bgImg = lazyElem.dataset[bgSrcName];

        if (src) {
            lazyElem.src = src;
        }

        if (bgImg) {
            lazyElem.style.backgroundImage = `url("${bgImg}")`;
            lazyElem.removeAttribute('data-bg-src');
        }

    }

    lazyLoadInner() {
        const _ = this;
        const {observerID} = _.params;

        if (window.IntersectionObserver) {

            if (observerID && !lazyElemObservers.has(observerID)) {

                lazyElemObservers.set(observerID,_lazyElemObserver(_));

                _.lazyElemObserver = lazyElemObservers.get(observerID);

            } else {
                _.lazyElemObserver = _lazyElemObserver(_);
            }

            if (!observerID) {
                console.warn(`It recommended to set an 'observerID', so the element group can leverage the same one.`,_.element);
            }

            _.lazyElemObserver.observe(_.element[0]);

        } else {
            console.warn(`You're window doesn't contain the "IntersectionObserver" property, please use a polyfill`);
        }
    }
}