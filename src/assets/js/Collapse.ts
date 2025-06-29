import type { LocationTracking, StringPluginArgChoices } from './types';
import $be, { type BaseElem } from "base-elem-js";

import { getDataOptions, isFunc, noop, reflow, setParams } from './util/helpers';

import smoothScroll from './fn/smoothScroll';
import UrlState 	from "./core/UrlState"; 
import Store 		from "./core/Store";

 
export interface ICollapseDefaults extends LocationTracking {
	cssPrefix: string;
	toggleDuration: number;
	toggleGroup: boolean;
	moveToTopOnOpen: boolean;
	moveToTopOffset: number;
    moveToTopDuration: number;
	afterOpen(btnElems: HTMLElement[], collapsibleItem: HTMLElement[]): void;
	afterClose(btnElems: HTMLElement[], collapsibleItem: HTMLElement[]): void;
	afterInit(element: HTMLElement): void;
}

export interface ICollapseOptions extends Partial<ICollapseDefaults> {};


const 
    VERSION = "4.0.0",
    DATA_NAME = 'Collapse',
    EVENT_NAME = 'collapse',
    DEFAULTS: ICollapseDefaults = {
        cssPrefix: 'collapse',
        toggleDuration: 500,
        toggleGroup: false,
        moveToTopOnOpen: false,
        moveToTopOffset: 0,
        moveToTopDuration: 500,
        urlFilterType: 'hash',
        historyType: 'replace',
        locationFilter: null,
        loadLocation: true,
        afterOpen: noop,
        afterClose: noop,
        afterInit: noop
    }
;


export default class Collapse {
	 
	public $element: BaseElem;
    public element: HTMLElement;
	public params: ICollapseDefaults;
	public toggling: boolean;
	public $btnElems: BaseElem | null;
    public btnElems: HTMLElement[];
	public $activeItem: BaseElem | null;
	public initLoaded: boolean;
	
	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	 
    #transition = $be.useTransition();

	constructor(element: HTMLElement, options: ICollapseOptions | StringPluginArgChoices, index?: number) {

		const s = this;

        s.element = element;
		s.$element = $be(element);
		const dataOptions = getDataOptions(element, EVENT_NAME);
	 
		s.params = setParams(Collapse.defaults, options, dataOptions);
		s.toggling = false;
		s.$btnElems = s.$element.find(`.${s.params.cssPrefix}__btn`).attr({'aria-expanded': 'false'});
        s.btnElems  = s.$btnElems.toArray() as HTMLElement[];
		s.$activeItem = null;
		s.initLoaded = false;
		// init
		s.#loadFromUrl();
		s.#handleEvents();
		s.params.afterInit(element);

		Store(element, DATA_NAME, s);

		return s;
	}

	static remove(element: BaseElem, plugin?: Collapse) {
		$be(element).each((elem) => {

			const s: Collapse = plugin || Store(elem, DATA_NAME);

			s.$element.off([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`]);
			$be(window).off(`popstate.${EVENT_NAME}`);
			// delete the Store item
			Store(elem, DATA_NAME, null);
		})
	}

	#handleEvents() {
		const s = this;
		const { cssPrefix } = s.params;
 
	 
		s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (e: Event, elem) {
			const elemId = $be(elem).attr('aria-controls') || (elem as HTMLAnchorElement).hash.substring(1);
			 
			s.toggle(elemId);

			e.preventDefault();
		},`.${cssPrefix}__btn`);

		$be(window).on(`popstate.${EVENT_NAME}`, (e: Event) => {
			if (s.params.historyType === 'push') {
				s.#loadFromUrl(); 
				s.initLoaded = true;
				e.preventDefault();
			}
		})
	}

	#loadFromUrl() {
		const s = this;
		const p = s.params;

		const loadElem = (filterEl: string) => {
			
			const cssOpen = `${p.cssPrefix}--open`;
			const $tryElem = s.$element.find('#' + filterEl);

			if ($tryElem.elem.length) {

				s.$activeItem = $tryElem;
				s.$activeItem.addClass(cssOpen);
				
				s.$btnElems
					.filter(el => $be(el).attr('aria-controls') === filterEl)
					.attr({'aria-expanded': 'true'});
			}
		} 

		if (p.locationFilter !== null && p.loadLocation && p.urlFilterType !== 'none') {
			 
			const filterEl = UrlState.get(p.urlFilterType, p.locationFilter);
			const cssOpen = `${p.cssPrefix}--open`;
			s.$element.find(`.${p.cssPrefix}__body.${cssOpen}`).rmClass(cssOpen);
			s.$btnElems.attr({'aria-expanded': 'false'});

			if (filterEl) {
				if (Array.isArray(filterEl)) {
						
					filterEl.forEach(loadElem);
					
				} else {
					loadElem(filterEl);
				}
					
			}
		}
	}

    #moveToTopOnOpen() {
		const s = this;
		const p = s.params; 
		
		if (s.$activeItem) {
			const item: HTMLElement[] = s.$activeItem.map(el => el.closest(`.${p.cssPrefix}__item`));

			if (item.length && p.moveToTopOnOpen) {
                const top = item[0].offsetTop - p.moveToTopOffset;
               
                smoothScroll(top, p.moveToTopDuration)
                
			}
		}
	}

	toggle(currElemID: string, allAtOnce: boolean = false) {
		const s = this;
		const p = s.params;
        const activeItem = $be.findOne('#' + currElemID, s.element)

		if ((s.toggling && !allAtOnce) || currElemID === null || !activeItem) return;
		
        s.$activeItem = s.$element.find('#' + currElemID);
        
        const 
            cssPrefix 	        = `${p.cssPrefix}--`,
            cssOpen 	        = `${cssPrefix}open`,
            cssToggling         = `${cssPrefix}toggling`,
            cssOpening 	        = `${cssPrefix}opening`,
            cssClosing 	        = `${cssPrefix}closing`,
            cssBodyOpen         = `.${p.cssPrefix}__body.${cssOpen}`,
            $currOpenItems      = s.$element.find(cssBodyOpen),
            $itemsToClose       = $currOpenItems.filter(el =>  p.toggleGroup || el.id === currElemID),
            activeAlreadyOpen   = s.$activeItem.hasClass(cssOpen)
        ;
        
        $itemsToClose.each((elem) => $be.css(elem, { height: elem.scrollHeight + 'px' }));
        
        const start = () => {
            s.toggling = true;
            
            s.$btnElems.each((elem) => {
                const $btn = $be(elem);
                const current = $btn.attr('aria-controls') === currElemID;
                const expanded = $btn.attr('aria-expanded') === 'false';
        
                if (p.toggleGroup) {
                    $btn.attr({ 'aria-expanded': (current && expanded) + '' }); 
                } else if (current) {
                    $btn.attr({ 'aria-expanded': expanded + '' });
                }
            });
                
            $itemsToClose
                .rmClass(cssOpen)
                .addClass([cssToggling, cssClosing])
                .each(elem => reflow(elem))
                .css({ height: '0px' })
            ;

            if (!activeAlreadyOpen) {
                const height = activeItem.scrollHeight + 'px';

                s.$activeItem
                    .addClass([cssToggling, cssOpening])
                    .css({ height })
                ;
            }

        },
        end = () => {
            s.toggling = false;

            $itemsToClose
                .rmClass([cssToggling,cssClosing])
                .css({ height: null });
            
            s.params.afterClose(
                s.btnElems, 
                $itemsToClose.toArray() as HTMLElement[]
            );
            
            if (!activeAlreadyOpen) {
                s.$activeItem
                    .addClass(cssOpen)
                    .rmClass([cssToggling, cssOpening])
                    .css({ height: null });
            }

            // Update History in URL
            if ( p.urlFilterType !== 'none') {
                const paramList = s.$element.find(cssBodyOpen).map((el:HTMLElement) => el.id) as string[];
                const paramVal = paramList.length === 1 ? paramList[0] : paramList.length > 0 ? paramList : null;

                UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
            }
    
            s.params.afterOpen(
                s.btnElems, 
                s.$activeItem.toArray() as HTMLElement[]
            );

            s.#moveToTopOnOpen();
        }
        
        s.#transition( start, end, s.params.toggleDuration);

	}
}

export interface CollapsePlugin {
    collapse(options?: ICollapseOptions | StringPluginArgChoices): this;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends CollapsePlugin {}
}
