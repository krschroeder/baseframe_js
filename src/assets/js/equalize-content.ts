import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import elemData from "./util/elemData";


export interface IEqualizeContentOptions {
    equalizeItem: Selector;
	startWidth?: number; 
	stopWidth?: number;
	timerDelay?: number;
	useHeight?: boolean;
	useMargin?: boolean;
	aligningCss?: string;
	resizeCss?: string;
	fuzzy?: number;
}

export interface IEqualizeContentDefaults {
    equalizeItem: Selector;
	startWidth: number; 
	stopWidth: number;
	timerDelay: number;
	useHeight: boolean;
	useMargin: boolean;
	aligningCss: string;
	resizeCss: string;
	fuzzy: number;
}

interface IMatchEqualizeEntry {
	ypos: number;
	elems: number[];
	tallest: number;
}

const VERSION = "2.0.2";
const DATA_NAME = 'EqualizeContent';
const EVENT_NAME = 'equalizeContent';
const DEFAULTS = {
	equalizeItem: '.equalize',
	startWidth: 0, 
	stopWidth: 480,
	timerDelay: 100,
	useHeight: false,//instead of using min-height
	useMargin: false,
	aligningCss: 'flex-l',
	resizeCss: 'in-resize',
	fuzzy: 1
};

export default class EqualizeContent {

	public element: HTMLElement;
	public params: IEqualizeContentDefaults;
	public elementHeight: 'height' | 'min-height';
	public $equalizeItems: Cash;
	public aligningCSS: boolean;
	public winWidth: number;
	public matches: IMatchEqualizeEntry[];
	public matchesMade: number;
	// public static Defaults: IAccessibleMenuOptions;
	
	static get version() { return VERSION; }
	static get pluginName() { return DATA_NAME; }
	public static Defaults = DEFAULTS;


	constructor(element, options) {
		 
		const _ = this;
		_.element = element;

		const dataOptions = parseObjectFromString($(element).data(EVENT_NAME+'-options'));
		const instanceOptions = $.extend({}, EqualizeContent.Defaults, options, dataOptions);
	 	
		elemData( element, `${DATA_NAME}_params`, instanceOptions);

		_.params = elemData(element,`${DATA_NAME}_params`);
		_.elementHeight = (_.params.useHeight) ? 'height' : 'min-height';
		_.$equalizeItems = $(_.params.equalizeItem, _.element);
		_.aligningCSS = $(_.element).hasClass(_.params.aligningCss);
		_.winWidth = $(window).width();
		_.matches = [];
		_.matchesMade = 0;

		_.init();

		return _;
	}

	static remove(element: Selector) {

		$(element).each(function () {
			const instance = elemData(this, `${DATA_NAME}_instance`);
			const $el = $(instance.element);

			$(window).off(`resize.${EVENT_NAME} ${EVENT_NAME}`);
			$el.find('img').off(`load.${EVENT_NAME}`);
			instance.$equalizeItems.css(instance.elementHeight, '');

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	init() {
		const _ = this;
		let resizeTimer;

		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				_.equalize();
			}, _.params.timerDelay);
		});
		_.imgsLoadedReEqualize();
		_.equalize();
	}

	imgsLoadedReEqualize() {
		const _ = this;
		const $images = $('img', _.element);
		const imgl = $images.length - 1;
	
		let i = 0;
		
		if(imgl === 0) return;

		$('img', _.element).on(`load.${EVENT_NAME}`, function () {
			i++;
			if (imgl === i) {
				$(window).trigger(EVENT_NAME);
			}
		});
	}

	buildMatchArray() {
		"use strict";
		const _ = this;
		_.matchesMade = 0;
		_.matches = [];//clear out the array

		_.$equalizeItems.css(_.elementHeight, '').each(function (index) {
			const $this = $(this);

			const thisTop = Math.floor($this.offset().top);
			let thisHeight = $this.outerHeight();

			let noMatch = true;

			if (_.params.useMargin) {
				//the $(elem).outerHeight(true) for using margin produces a bug in
				//chrome around version 64,.. this is the workaround for it.
				thisHeight += parseFloat($this.css('margin-top'));
				thisHeight += parseFloat($this.css('margin-bottom'));
			}

			_.matchesMade += 1;

			for (let i = 0, l = _.matches.length; i < l; i += 1) {
				if (_.getYPos(_.matches[i].ypos,thisTop)) {
					noMatch = false;
					_.matches[i].elems.push(index);
					if (_.matches[i].tallest < thisHeight) {
						_.matches[i].tallest = thisHeight;
					}
					break;
				}
			}
			if (_.matches.length === 0 || noMatch) {
				_.matches.push({ 
					ypos: thisTop,
					elems: [index], 
					tallest: thisHeight 
				});
			}

		});
	}

	getYPos(a,b) {
		const _ = this;

		if(a === b || Math.abs(a - b) <= _.params.fuzzy ) {
			return true;
		}

		return false;
	}

	assignHeightsToElems() {
		const _ = this;

		if ((_.matchesMade + 1) !== _.matches.length) {

			_.$equalizeItems.addClass(_.params.resizeCss);

			for (let i = 0, l = _.matches.length; i < l; i += 1) {
				_.matches[i].elems.forEach(function (index) {
					_.$equalizeItems.eq(index).css(_.elementHeight, _.matches[i].tallest);
				});
			}
			_.$equalizeItems.removeClass(_.params.resizeCss);
		}
	};

	equalize() {
		const _ = this;
		_.winWidth = $(window).width();
		const {startWidth,stopWidth,resizeCss,aligningCss} = _.params;

		//if it doesn't have any elements exit the function
		if (!_.$equalizeItems.length) { return; }

		if (_.winWidth > stopWidth && _.winWidth > startWidth) {

			$(_.element).addClass(resizeCss);
			if (!_.aligningCSS) {
				$(_.element).addClass(aligningCss);
			}

			_.buildMatchArray();
			_.assignHeightsToElems();

			$(_.element).removeClass(resizeCss);
			if (!_.aligningCSS) {
				$(_.element).removeClass(aligningCss);
			}
		} else {
			_.$equalizeItems.css(_.elementHeight, '');
		}
	}
}

declare module 'cash-dom' {
    export interface Cash {
        equalizeContent(options?: IEqualizeContentOptions | StringPluginArgChoices): Cash;
    }
}