import { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';
import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json';
import { elemData } from './util/store';

type axis =  'x' | 'y';

export interface IParallaxOptions {
    speed?: number;
    axis?: axis;
    relativeElem?: false | Cash;
    $heightElem?: Cash | null;
    initOffset?: boolean;
    bgFill?: boolean;
    outStop?: number;
    minWidth?: number | null;
    maxWidth?: number | null;
    scrollMaxPxStop?: number;
}

export interface IParallaxDefaults {
    speed: number;
    axis: axis;
    relativeElem: false | Cash;
    $heightElem: Cash | null;
    initOffset: boolean;
    bgFill: boolean;
    outStop: number;
    minWidth: number | null;
    maxWidth: number | null;
    scrollMaxPxStop: number;
}

const VERSION = "1.1.0";
const DATA_NAME = 'Parallax';
const EVENT_NAME = 'parallax';
const DEFAULTS: IParallaxDefaults = {
	speed: 7,
	axis: 'y',
	relativeElem: false,
	$heightElem: null,
	initOffset: false,
	bgFill: false,
	outStop: 1,
	scrollMaxPxStop: 5000,
	minWidth: null,
	maxWidth: null
};


const getEvents = (instEvt) => [
	`scroll.${instEvt}`,
	`resize.${instEvt}`,
	instEvt
].join(' ');

export default class Parallax {

	public params: IParallaxDefaults;
	public initOffsetSet: boolean;
	public initOffset: number;
	public index: number;
	public instanceEvent: string;
	public $window: Cash;
	public $element: Cash;
	public $relElem: Cash;
	public winHeight: number;
	public winWidth: number;
	public initiallyInView: boolean;
	public elemHeight: number;
	public speed: number;
	public bgFillRatio: number;
	public bgFill: boolean;
	public axis: axis;
	public outStop: number;
	public scrollMaxPxStop: number;
	public minWidthIfSet: boolean;
	public maxWidthIfSet: boolean;
	public effectCleared: boolean;

	static get version() { return VERSION; }
	static get pluginName() {return DATA_NAME; }
	static Defaults = DEFAULTS;

	constructor(element: HTMLElement, options: IParallaxOptions | StringPluginArgChoices, index: number) {
		const _ = this;
		const dataOptions = validJSONFromString($(element).data(EVENT_NAME + '-options'));
		const instanceDefaults = {$heightElem: $(element)};

		_.$window = $(window);
		_.$element = $(element);
		 
        const instanceOptions = $.extend({}, Parallax.Defaults, instanceDefaults, options, dataOptions)
		
		elemData( element,`${DATA_NAME}_params`,instanceOptions);

		_.params = elemData(element, `${DATA_NAME}_params`);
		_.initOffsetSet = false;
		_.initOffset = 0;
		_.index = index;
		_.instanceEvent = EVENT_NAME + index;
		//props to get updated on resize
		_.updatableProps();

		_.initiallyInView = ((_.$relElem as any).offset().top < _.winHeight);

		_.init();

		return this;
	}

	static remove(element) {

		$(element).each(function () {
			const instance = elemData(this, `${DATA_NAME}_instance`);
			
			$(window).off(getEvents(instance.instanceEvent));
			$(window).off(`resize.${instance.instanceEvent} ${instance.instanceEvent}`);

			$(this).css({transform:'',...(instance.bgFill ? {'padding-top': ''} : {})});

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	init() {
		const _ = this;
		const EVENTS = getEvents(_.instanceEvent);

		$(window).on(EVENTS, () => {
			window.requestAnimationFrame(function () {
				_.parallax(_);
			});
		}).trigger(_.instanceEvent);

		_.resizeUpdates();
	}

	updatableProps() {
		const _ = this;

		_.winHeight = _.$window.height();
		_.winWidth = _.$window.width();
		_.elemHeight = _.params.$heightElem ? _.params.$heightElem.height() : -1;
		_.speed = _._speed;
		_.bgFillRatio = _._bgFillRatio;
		_.bgFill = _.params.bgFill;
		_.axis = _.params.axis;
		_.$relElem = _._relElem;
		_.outStop = _.params.outStop;
		_.scrollMaxPxStop = _.params.scrollMaxPxStop;
		_.initOffsetSet = false;
		_.minWidthIfSet = _.params.minWidth ? _.winWidth > _.params.minWidth : true;
		_.maxWidthIfSet = _.params.maxWidth ? _.winWidth < _.params.maxWidth : true;
		_.effectCleared = false;
	}


	resizeUpdates() {
		const _ = this;
		let resizeThrottle: ReturnType<typeof setTimeout> | null = null;

		$(window).on(`resize.${_.instanceEvent} ${_.instanceEvent}`, function () {
			resizeThrottle && clearTimeout(resizeThrottle);
			resizeThrottle = setTimeout(() => {

				if (!_.initOffsetSet && _.params.initOffset) {
					_.$element.css({ 'transform': '' });
				}

				_.updatableProps();

			}, 100);
		}).trigger(_.instanceEvent);
	}

	parallax(_) {

		const elemTop = _.$relElem.offset().top;
		const scrollTop = window.pageYOffset;
		const withinMinAndMaxIfSet = (_.minWidthIfSet && _.maxWidthIfSet);

		if (_._isScrolledIntoView(elemTop, scrollTop) && withinMinAndMaxIfSet) {

			const speedInZeroInView = (scrollTop + _.winHeight) - elemTop;
			const speed = (speedInZeroInView * _.speed);
			const bgFillRatio = _.bgFillRatio;


			if (!_.initOffsetSet && _.initiallyInView) {
				if (_.params.initOffset) {

					_.initOffset = speed - (scrollTop * _.speed);
					_.initOffsetSet = true;
				}
			}

			if (Math.abs(speed) > _.scrollMaxPxStop) return;

			const cssParams = (_.axis === 'y') ?
				!_.bgFill ?
					{	//don't fill it
						'transform': `translate3d(0,${speed - _.initOffset}px,0)`
					}
					: { //fill the background
						'transform': `translate3d(0,${(speed - _.initOffset) - bgFillRatio}px,0)`,
						'height': `calc(100% + ${bgFillRatio}px)`
					} :
				!_.bgFill ? 
					{	//scroll sideways
						'transform': `translate3d(${speed - _.initOffset}px,0,0)`
					} : 
					{
						'transform': `translate3d(${(speed - _.initOffset) - bgFillRatio}px,0,0)`,
						'width' : `calc(100% + ${bgFillRatio}px)`,
					}
				;

			_.$element.css(cssParams);

			_.effectCleared = true;
		} else {

			if (!_.effectCleared) {

				_.$element.css({
					'transform': '',
					'padding-top': ''
				});

				_.effectCleared = true;
			}
		}
	}


	_isScrolledIntoView(elemTop, scrollTop) {
		const _ = this;

		if (_.elemHeight === -1) {
			// negative 1 if we don't have a relative element;
			throw new Error('Please Specify a Relative Element to base the height of the parallax off of');
		}

		const elemBottom = (_.elemHeight * _.outStop) + elemTop;
		const inView = (
			(scrollTop < elemBottom) &&
			(_.winHeight + scrollTop > elemTop)
		);

		return inView;
	}

	//getters
	get _bgFillRatio() {
		const _ = this;
		const pad = 2; //buffer for any potential rounding errors
		const speed = _.speed < 0 ? _.speed * -1 : _.speed;
	 
		return (_.winHeight * speed) + pad;
	}

	get _speed() {
		const _ = this;
		return _.params.speed / 100;
	}

	get _relElem() {
		const _ = this;

		return _.params.relativeElem ?
			_.$element.closest(_.params.relativeElem) :
			_.$element
			;
	}
}

declare module 'cash-dom' {
    interface Cash {
        parallax(options?: IParallaxOptions | StringPluginArgChoices): Cash;
    }
}