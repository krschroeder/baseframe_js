import $ from 'cash-dom';
import validJSONFromString from '../../util/formatting-valid-json.js';

const VERSION = "2.0.2";
const DATA_NAME = 'EqualizeContent';
const EVENT_NAME = 'equalizeContent';

export default class EqualizeContent {

	static get version(){
		return VERSION;
	}

	static get pluginName() {
		return EVENT_NAME;
	}

	constructor(element, options) {
		const _ = this;
		_.element = element;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME+'-options')
		);

		_.defaults = {
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

		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions) 
		);
		_.params = $.store.get(element,`${DATA_NAME}_params`);

		_.elementHeight = (_.params.useHeight) ? 'height' : 'min-height';
		_.$equalizeItems = $(_.params.equalizeItem, _.element);
		_.aligningCSS = $(_.element).hasClass(_.params.aligningCss);
		_.winWidth = $(window).width();
		_.matches = [];
		_.matchesMade = 0;

		_.init(_.element, _.params);

		return _;
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