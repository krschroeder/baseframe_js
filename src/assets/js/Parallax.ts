 
import type { StringPluginArgChoices } from './types';
// import $ from 'cash-dom';
import $be, {type BaseElem} from "base-elem-js";
import Store from "./core/Store";
import { getDataOptions } from "./util/helpers";
import throttledResize from "./fn/throttleResize";
import type { EventName } from 'base-elem-js';

type Axis =  'x' | 'y';
 

export interface IParallaxDefaults {
    speed: number;
    zSpeed: number;
    axis: Axis;
	cssPrefix: string;
	scrollAxis: Axis;
	zAxis: boolean;
    relativeElem: false | BaseElem;
    bgFill: boolean;
	rootMargin: number | [number,number];
    minWidth: number | null;
    maxWidth: number | null;
    scrollMaxPxStop: number;
    zScrollMaxPxStop: number;
}

interface IElementInView {
	top: number; 
	left: number;
	bottom: number;
	right: number;
}

export interface IParallaxOptions extends Partial<IParallaxDefaults> {}

const VERSION = "2.0.1";
const DATA_NAME = 'Parallax';
const EVENT_NAME = 'parallax';
const DEFAULTS: IParallaxDefaults = {
	speed: 7,
	zSpeed: 5,
	cssPrefix: 'parallax',
	axis: 'y',
	scrollAxis: 'y',
	zAxis: false,
	relativeElem: false,
	bgFill: false,
	rootMargin: 0,
	scrollMaxPxStop: 5000,
	zScrollMaxPxStop: 2000,
	minWidth: null,
	maxWidth: null
};

export default class Parallax {

	public params: IParallaxDefaults;
	public zInitOffset: number;
	public index: number;
	public instanceEvent: string;
	public $window: BaseElem;
	public $element: BaseElem;
	public element: HTMLElement;
	public elementOffset: IElementInView;
	public $relElem: BaseElem;
	public winHeight: number;
	public winWidth: number;
	public elemHeight: number;
	public elemWidth: number;
	public speed: number;
	public zSpeed: number;
	public fillAmount: number;
	public bgFill: boolean;
	public bgFillProp: 'height' | 'width';
	public axis: Axis;
	public zAxis: boolean;
	public scrollMaxPxStop: number;
	public zScrollMaxPxStop: number;
	public rootMargin:[number,number];
	public lastZSpeed: number;
	public lastCssInProps: Record<string,string>;
	public minWidthIfSet: boolean;
	public maxWidthIfSet: boolean;
	public effectCleared: boolean;
	public cssPrevDir: string[] | string;

	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	constructor(element: HTMLElement, options: IParallaxOptions | StringPluginArgChoices, index: number) {
		const s = this; 
		const dataOptions = getDataOptions(element, EVENT_NAME);
		 
		s.$window = $be(window);
		s.$element = $be(element);
		s.element = element;
		s.params = Object.assign({}, Parallax.defaults, options, dataOptions)
		s.zInitOffset = 0;
		s.index = index;
		s.instanceEvent = EVENT_NAME + index;
		s.$relElem = s.#relElem;
		s.cssPrevDir = [];
		//props to get updated on resize
		s.updatableProps();
		s.handleEvents();

		return s;
	}

	handleEvents() {
		const s = this;
		 
		throttledResize(() => { 
			s.updatableProps();
			// $be(window).trigger(s.instanceEvent);
			s.parallax(s);
		},`[${s.instanceEvent}_resize]`,true);

		$be(window).on([`scroll.${s.instanceEvent}`,`[${s.instanceEvent}]`], () => {
			window.requestAnimationFrame(() => {
				s.parallax(s);
			});
		}).trigger(s.instanceEvent);
	}

	handleUpdate() {
		const s = this;
		s.updatableProps();
		$be(window).trigger(s.instanceEvent);
	}

	updatableProps() {
		const s = this;
		const speed = s.#speed,
			zSpeed = s.#zSpeed,
			{ cssPrefix } = s.params,
			speedCss = `${cssPrefix}--${s.params.axis}-${zSpeed > 0 ? 'pos' : 'neg'}`,
			zSpeedCss = s.params.zAxis ? `${cssPrefix}--z-${zSpeed > 0 ? 'pos' : 'neg'}` : '',
			newCssDir = zSpeedCss ? [speedCss, zSpeedCss] : speedCss,
			rm = s.params.rootMargin
		;

		//reset to get new measurements
		s.$element.css({ 
			transform: null, 
			height: null, 
			width: null
		})
        if (s.cssPrevDir) s.$element.rmClass(s.cssPrevDir);
        s.$element.addClass(newCssDir);

        const relElem = s.$relElem.elem[0] as HTMLElement;
        // const windowRects = s.$window.elemRects();

		s.cssPrevDir        = newCssDir;
		s.winHeight         = window.innerHeight;
		s.winWidth          = window.innerHeight;
		s.elemHeight        = relElem.scrollHeight;
		s.elemWidth         = relElem.scrollWidth;
		s.speed             = speed;
		s.zSpeed            = zSpeed;
		s.fillAmount        = s.#fillAmount;
		s.bgFill            = s.params.bgFill;
		s.axis              = s.params.axis;
		s.bgFillProp        = s.axis === 'y' ? 'height' : 'width';
		s.zAxis             = s.params.zAxis;
		s.$relElem          = s.#relElem;
		s.scrollMaxPxStop   = s.params.scrollMaxPxStop;
		s.zScrollMaxPxStop  = s.params.zScrollMaxPxStop;
		s.lastZSpeed        = 0;
		s.rootMargin        = typeof s.params.rootMargin === 'number' ? [rm as number,rm as number] : rm as [number, number];
		s.minWidthIfSet     = s.params.minWidth ? s.winWidth > s.params.minWidth : true;
		s.maxWidthIfSet     = s.params.maxWidth ? s.winWidth < s.params.maxWidth : true;
		s.elementOffset     = s.getElementRects();

        if (s.lastCssInProps) {
            s.$element.css(s.lastCssInProps);
        }
	}

	getElementRects():IElementInView {
		const s = this;
		const elPos = s.$element.elemRects(),
			top = elPos.top + window.scrollY,
			left = elPos.left + window.scrollX,
			bottom = top + s.elemHeight,
			right = left + s.elemWidth
		;

		return {
			top, 
			left,
			bottom,
			right 
		}
	}

	parallax(s:Parallax) {
		const
			{scrollAxis} = s.params,
			[rootMStart, rootMEnd] = s.rootMargin,
			withinMinAndMaxIfSet = (s.minWidthIfSet && s.maxWidthIfSet),
			scrollVertical = scrollAxis === 'y',
			offset = (scrollVertical ? s.elementOffset.top : s.elementOffset.left),
			winSide = (scrollVertical ? s.winHeight : s.winWidth) - rootMStart,
			scrollDir = (scrollVertical ? window.scrollY : window.scrollX),
			pixelStart = (offset > winSide ? (winSide - offset) + scrollDir : offset + (scrollDir - offset))
		;

		if (s.isInView(scrollVertical, pixelStart, scrollDir, rootMEnd) && withinMinAndMaxIfSet) {
			const 
				speed = (pixelStart * s.speed),
				zSpeed = (pixelStart * s.zSpeed),
				speedPx = (speed < s.zScrollMaxPxStop) ? speed : s.zScrollMaxPxStop,
				zSpeedPx = s.params.zAxis ? ((s.lastZSpeed < s.zScrollMaxPxStop) ? zSpeed : s.lastZSpeed) : 0,
				translateParams = s.axis === 'y' ? `0, ${speedPx}px, ${zSpeedPx}px` : `${speedPx}px, 0, ${zSpeedPx}px`
			;

			const cssProps = {
				transform: `translate3d(${translateParams})`,
				[s.bgFillProp]: s.bgFill ? `calc(100% + ${s.fillAmount}px)` : null
			};

			s.lastZSpeed = zSpeedPx;
			s.lastCssInProps = cssProps;
			s.$element.css(cssProps);
		} 
	}

	isInView(scrollVertical:boolean, pixelStart:number, scrollDir:number, rootMargin: number): boolean {
		const s = this;
		const elemOffsetEnd = scrollVertical ? s.elementOffset.bottom : s.elementOffset.right;
		return scrollDir + rootMargin <= elemOffsetEnd && pixelStart >= 0;
	}
 
	//getters
	get #fillAmount() { 
		const s = this;
		const saY = s.params.scrollAxis === 'y';

		const winSide = s.params.axis === 'y' ? s.winHeight : (s.winWidth + (saY ? 0 : s.elemWidth));
		return (winSide * Math.abs(s.speed));
	}

	get #speed() {
		const s = this;
		return s.params.speed / 100;
	}

	get #zSpeed() {
		const s = this; 
		return s.params.zSpeed / 100;
	}

	get #relElem() {
		const s = this;
        const { relativeElem } = s.params;
		return relativeElem ? relativeElem : s.$element;
	}

	static remove(element: BaseElem, plugin?: Parallax) {

		$be(element).each((elem) => {
			const s: Parallax = plugin || Store(elem, DATA_NAME);
			
			$be(window).off([
                `scroll.${s.instanceEvent}`,
                `resize.${s.instanceEvent}`,
                `[${s.instanceEvent}_resize]`,
                `[${s.instanceEvent}`
            ] as EventName[]);

			s.$element.css({ 
				'transform': null, 
				height: null, 
				width: null
			}).rmClass(s.cssPrevDir)

			Store(elem, DATA_NAME, null);
		});
	}
}

declare module 'base-elem-js' {
    interface BaseElem {
        parallax(options?: IParallaxOptions | StringPluginArgChoices): BaseElem;
    }
}