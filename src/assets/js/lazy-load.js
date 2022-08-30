
import validJSONFromString from './util/formatting-valid-json.js';
import { isVisible } from './util/helpers';
import { elData } from './util/store';

const VERSION = '2.0.1';
const DATA_NAME = 'LazyLoad';
const EVENT_NAME = 'lazyLoad';
const DEFAULTS = {
    imgSrcName: 'src',
    bgSrcName: 'bgSrc',
    loadImgs: true,
    inEvt: null,
    outEvt: null,
    force: false,
    observerID: null,
    unobserve: true,
    observerOpts: { rootMargin: '48px' }
};

const lazyElemObservers = new Map();

const _lazyElemObserver = (_) => {
    
    const { observerOpts } = _.params;
    return new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const { inEvt, outEvt, force, unobserve, loadImgs } = _.params;

            const lazyElem = entry.target;

            if (entry.isIntersecting && isVisible(lazyElem) || force) {

                loadImgs && _.imgAndBg(_,lazyElem);

                typeof inEvt === 'function' && inEvt(lazyElem, entry);
        
                unobserve && _.lazyElemObserver.unobserve(lazyElem);

            } else {
                typeof outEvt === 'function' && outEvt(lazyElem, entry);
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

    static remove(element) {

		$(element).each(function () {
			const instance = elData(this, `${DATA_NAME}_instance`);
			const params = elData(this, `${DATA_NAME}_params`);

            lazyElemObservers.delete(params.observerID);

			instance.lazyElemObserver.unobserve(this);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

    constructor(element, options) {
        const _ = this;

        _.element = element;

        const dataOptions = validJSONFromString(
            $(element).data(EVENT_NAME + '-options')
        );
       
        elData(
            element,
            `${DATA_NAME}_params`,
            $.extend(
                {},
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

    imgAndBg(_,lazyElem) {

        const {imgSrcName, bgSrcName } = _.params;

        const src = lazyElem.dataset[imgSrcName];
        const bgImg = lazyElem.dataset[bgSrcName];
        

        if (lazyElem.loading === 'lazy') {
            lazyElem.loading = 'eager';
        }

        if (src) {
            lazyElem.src = src;
        }

        if (bgImg) {
            lazyElem.style.backgroundImage = `url("${bgImg}")`;
            lazyElem.removeAttribute('data-bg-src');
        }

    }

    lazyLoad() {
        const _ = this;
        const {observerID} = _.params;

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
    }
}

LazyLoad.defaults = DEFAULTS;