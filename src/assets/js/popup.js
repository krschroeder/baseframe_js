
import validJSONFromString from './util/formatting-valid-json.js';
import generateGUID from './util/guid-generate.js';

import { photoRegex, isVisible, camelCase } from './util/helpers';
import { getHashParam } from './util/get-param';
import getHistoryEntry from './util/plugin/get-history-entry';
import { elData } from './util/store';
import trapFocus from './util/trap-focus.js';
import { CSS_TRANSISTION_DELAY } from './util/constants.js';
 
const VERSION = "1.2.0";
const DATA_NAME = 'Popup';
const EVENT_NAME = 'popup';
const INSTANCE_NAME = `${DATA_NAME}_instance`;

const getPopupSrc = ($elem) => $elem.data('popup-src') || $elem.attr('href') || null;
const getTitleSrc = ($elem) => $elem.data('popup-title') || $elem.attr('title') || '';

export default class Popup {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return {
			popupID: null,
			src: null,
			title: null,
			caption: null,
			popupOuterClass: "",
			titleElem: 'h3',
			titleCss: '',
			clickOutsideClose: true,
			fadeOut: 500,
			fadeIn: 400,
			zIndex: 2000,
			vhDivisor: 2,
			firstAnchorFocus: true,
			setTopPosition: null,
			isImage: false,
			isJsArray: false,
			escapeClose: true,
			group: true,
			showGroupAmount: false,
			groupOfHTML: '/',
			launch: false,
			photoRegex: photoRegex,
			closeText: `<i class="icon-close"><span class="sr-only">Close</span></i>`,
			prevBtnHTML: `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>`,
			nextBtnHTML: `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>`,
			loadingHTML: `<div class="popup__loader"></div>`,
			appendPopupTo: 'body',
			showPopup: 'popup--show-popup',
			enableEvent: 'click',
			useHashFilter: null,
			loadLocationHash: true,
			useLocationHash: true,
			
			trapPopupFocus: true,
			afterLoaded: () => { },
			afterClose: () => { },
			onClose: () => { }
		};
	}

	static remove(element) {
		
		$(element).each(function(){
			 
			const params = elData(this, `${DATA_NAME}_params`);

			elData(this, INSTANCE_NAME, null, true);
			const popupEventName = EVENT_NAME + params.popupID;

			$(this).off(`${params.enableEvent}.${popupEventName}`);
			$(this).off(`${popupEventName}`);
			$(document).off(`keydown.${popupEventName}groupcontrols`);
			$(document).off(`keydown.${popupEventName}`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	constructor(element, options, index) {

		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		const popupID = 'popup_' + generateGUID();
		const src = getPopupSrc($(element));
		const caption = $(element).data('popup-caption') || '';
		const title = getTitleSrc($(element));
		const instanceDefaults = { popupID, src, caption, title };

		_.$element = $(element);

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend(Popup.defaults, instanceDefaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);

		if (_.params.useLocationHash && popupID === _.params.popupID) {
			console.warn('If loading from a location hash please make sure to specify an ID not auto generated. This won\'t work should the page get reloaded.');
		}


		_.key = {
			ARROWLEFT: 'ArrowLeft',
			ARROWRIGHT: 'ArrowRight',
			ESCAPE: 'Escape'
		};

		//Content
		_.$popup = null;
		_.elemGrabbedLocation = $('<span/>').attr({ id: 'orig-loc_' + popupID });
		_.contentFromDOM = false;
		_.currentElem = null;
		_.currentSrc = null;
		_.$listElems = _.params.isJsArray ? _.params.src : null;
		_.groupAmountElem = null;

		//click elem
		_.$domClickElem = null;
		_.domElemClicked = false;

		_.popupEventName = EVENT_NAME + _.params.popupID;

		//for groups
		_.groupCount = 0;
		_.groupIndex = 0;

		//location hash  
		_.isOpen = false;
		_.isOpenHash = '';
		_.historyID = '#' + _.params.popupID + (index === 0 ? '' : '__' + index);
		_.loadedFromHash = false;

		// trapping focus
		_.trappedFocus = null;

		_.initLoadEvents();

		return this;
	}

	getHistoryEntry(blank = false) {

		const _ = this;
		let historyItem = blank ? '' : _.historyID;

		return getHistoryEntry(_, historyItem);
	}

	initLoadEvents() {
		const _ = this;
		const { launch, useHashFilter, loadLocationHash } = _.params;

		_.$element.on(`${_.params.enableEvent}.${_.popupEventName} ${_.popupEventName}`, function (e) {

			const { useLocationHash } = _.params;

			e.preventDefault();

			if (useLocationHash) {

				window.history.pushState(null, null, _.getHistoryEntry());
			}

			_.isOpen ? _._close() : _.loadPopup(this);

		});


		$(window).on(`popstate.${_.popupEventName} ${_.popupEventName}`, (e) => {
			const { useLocationHash, useHashFilter } = _.params;

			if (useLocationHash) {

				if (
					_.historyID === _.isOpenHash ||
					_.historyID === (useHashFilter ? getHashParam(useHashFilter) : location.hash)
				) {
					_.isOpen ? _._close() : _.loadPopup(_.$element);

				}
			}
			e.preventDefault();

		});

		if (launch) {
			_.loadPopup(document.activeElement);
		}

		if (loadLocationHash && _.historyID === (useHashFilter ? getHashParam(useHashFilter) : location.hash)) {
			_.loadPopup(_.$element);
			_.loadedFromHash = true;
		}
	}

	loadPopup(clickElem = null) {
		const _ = this;
		const { escapeClose, useHashFilter } = _.params;

		if (clickElem) {
			_.$domClickElem = $(clickElem);
			_.domElemClicked = true;
		}

		_.isOpenHash = useHashFilter ? getHashParam(useHashFilter) : location.hash;

		_.addToDOM();
		_.closeHandlers();

		if (escapeClose) {
			_.escapeClose();
		}

		_.isOpen = true;
	}

	addToDOM() {
		const _ = this;
		const { fadeIn, appendPopupTo, firstAnchorFocus, trapPopupFocus } = _.params;

		_.createPopup();

		$(appendPopupTo).append(_.$popup);

		if (firstAnchorFocus) {
			setTimeout(() => {

				const $firstAnchor = _.$popup
					.find( 'button, a, input, select, textarea, [tabindex]')
					.filter((i,el) => isVisible(el) && el.tabIndex !== -1).eq(0);


				$firstAnchor.length ?
					$firstAnchor[0].focus() :
					_.$popup.find('.popup__btn-close')[0].focus()
					;

			}, fadeIn + 100);
		}

		if (trapPopupFocus) { 
			setTimeout(() => {_.trappedFocus = trapFocus(_.$popup, {nameSpace: camelCase(_.params.popupID)}); }, fadeIn + 100);
		}

		_.animationIn();
	}

	determineContent() {
		const _ = this;
		const { isJsArray, group } = _.params;

		//if grabbed content from before
		_.placeContentBack();

		//testing to see if its simple a class or ID selector
		const domElemRgx = /^(\#|\.)/;

		let currentElem, src, title, caption, isDomSelector = false;

		if (isJsArray) {

			currentElem = _.$listElems[_.groupIndex];
			src = currentElem.src;
			title = currentElem.title;
			caption = currentElem.caption;
			_.groupCount = _.$listElems.length;

		} else {


			_.$listElems = $(typeof group === 'string' ? group : _.params.src);

			if (_.domElemClicked) {

				for (let i = 0, l = _.$listElems.length; i < l; i++) {

					if (_.$listElems[i].isSameNode(_.$domClickElem[0])) {

						_.groupIndex = i;
						break;
					}
				}

				_.domElemClicked = false;
			}

			currentElem = _.$listElems.eq(_.groupIndex);
			src = getPopupSrc(currentElem);

			if (!src) {
				src = currentElem;
				isDomSelector = true;
			} else {
				isDomSelector = domElemRgx.test(src);
			}

			_.groupCount = _.$listElems.length;

			title = getTitleSrc(currentElem);
			caption = currentElem.data('popup-caption');
		}

		_.currentElem = currentElem;
		_.currentSrc = src;

		_.contentFromDOM = isDomSelector && !isJsArray || (!isJsArray && typeof src === 'object');

		if (_.contentFromDOM) $(src).after(_.elemGrabbedLocation);
		if (title) _.params.title = title;
		if (caption) _.params.caption = caption;
	}

	placeContent() {
		const _ = this;
		const {
			caption,
			isJsArray,
			titleElem,
			titleCss,
			title,
			showGroupAmount,
			popupID,
			loadingHTML,
			isImage
		} = _.params;

		const currentElem = _.currentElem;
		const src = _.currentSrc;
		const $popupContentBody = _.$popup.find(`.popup__content-body`);

		const isImg = isImage ||
			_.params.photoRegex.test(src) ||
			(!isJsArray ? currentElem.data('popup-type') === "image" : currentElem.nodeName === 'img')
			;

		_.$popup.find(`#${popupID}__title`).html(title ? `<${titleElem} class="${titleCss}">${title}</${titleElem}>` : '');
		_.$popup.find(`#${popupID}__caption`).html(caption);


		//wipe the current body contents
		$popupContentBody.html("");

		if (isImg) {

			const imgNode = new Image();
			const $loader = $('<div/>').attr({ class: 'popup__loader-outer' }).html(loadingHTML);

			imgNode.src = src;
			imgNode.alt = title || "";


			if (!imgNode.complete) {
				imgNode.style.opacity = "0";

				$popupContentBody.append($loader);
			}

			$popupContentBody.append(imgNode);
			const $imgNode = $(imgNode);

			$imgNode.on(`load.${EVENT_NAME}`, () => {

				$loader.remove();
				$imgNode.removeAttr("style");

				$popupContentBody.css({
					'min-height': $imgNode.height()
				});
			})

		} else {
			$popupContentBody.append($(src)).css({ 'min-height': '0px' });
		}

		if (showGroupAmount) {
			_.groupAmountElem.html(
				`<span>${_.groupIndex + 1}</span> 
				<span class="popup__group-divisor">${_.params.groupOfHTML}</span> 
				<span>${_.groupCount}</span>`
			);
		}
	}

	createPopup() {
		const _ = this;
		const { popupID, group, prevBtnHTML, nextBtnHTML, showGroupAmount } = _.params;

		_.determineContent();

		let groupControls = null;

		if (_.groupCount > 1 && (typeof group === 'string' || group)) {

			let btnPrev = $("<button>").attr({
				type: "button",
				class: "btn--popup btn--popup-prev"
			}).append(prevBtnHTML),

				btnNext = $("<button>").attr({
					type: "button",
					class: "btn--popup btn--popup-next"
				}).append(nextBtnHTML);

			groupControls = $("<div/>").attr({
				class: "popup__controls"
			}).append(btnPrev, btnNext);
		}

		if (showGroupAmount) {

			_.groupAmountElem = $('<div/>').attr({ class: 'popup__group-count' });
			_.groupAmountElem.html(`${_.groupIndex + 1} ${_.params.groupOfHTML} ${_.groupCount}`);

		} else {
			_.groupAmountElem = null;
		}

		const title = `<div id="${popupID}-title" class="popup__title">${_.params.title}</div>`,
			caption = `<div id="${popupID}-caption" class="popup__caption">${_.params.caption}</div>`,
			$overlay = $('<div/>').attr({ class: 'popup__overlay' }),
			$src = $('<div/>').attr({ class: 'popup__content' }),
			$body = $('<div/>').attr({ class: 'popup__content-body' }),
			$closeBtn = _.params.closeText ? $(`<button/>`).attr({ class: "popup__btn-close", type: "button" }).html(_.params.closeText) : '',
			$srcAll = $src.append(
				$closeBtn,
				title,
				$body,
				caption,
				groupControls,
				_.groupAmountElem
			),
			$popupStructure = $('<div/>').attr({
				class: `popup ${_.params.popupOuterClass}`,
				id: popupID,
				role: 'dialog',
				tabindex: '-1',
				'aria-labelledby': popupID + "-title",
				style: `z-index: ${_.params.zIndex}`
			}).append(
				$overlay,
				$srcAll
			);

		_.$popup = $popupStructure;

		_.placeContent();
		_.groupControls();
		_.params.afterLoaded(_.$element, popupID);
			
	}

	toggleGroup(prevCond, nextCond) {
		const _ = this;
		let ct = _.groupCount - 1;
		let cr = _.groupIndex;

		if (nextCond) { cr = (cr === ct) ? cr = 0 : cr += 1; }
		if (prevCond) { cr = (cr === 0) ? cr = ct : cr -= 1; }

		_.groupIndex = cr;

		_.determineContent();
		_.placeContent();
	}

	groupControls() {
		const _ = this;

		if (_.groupCount > 1) {

			$(document).on(`keydown.${_.popupEventName}groupcontrols`, function (e) {
				const ev = e || window.event;
				const key = ev.key;

				if (key == _.key.ARROWLEFT || key == _.key.ARROWRIGHT) {
					_.toggleGroup(
						key == _.key.ARROWLEFT,
						key == _.key.ARROWRIGHT
					);
				}
			});

			_.$popup.on(`click.${_.popupEventName}`, '.btn--popup-prev', function () {
				_.toggleGroup(true, false);
			})
				.on(`click.${_.popupEventName}`, '.btn--popup-next', function () {
					_.toggleGroup(false, true);
				});
		}
	}

	animationIn() {
		const _ = this;
		const { vhDivisor, setTopPosition, fadeIn, showPopup } = _.params;
		const $popup = _.$popup;

		//set setTopPosition then use that, else use the default options which set in the middle
		const times = (vhDivisor === 0 ? 0 : $(window).height() / vhDivisor);
		const topPos = setTopPosition || setTopPosition === 0 ?
			(typeof setTopPosition === 'function' ? setTopPosition() : setTopPosition) :
			Math.max(0, times + document.querySelector('html').scrollTop)
			;

		const $popupContent = $popup.find('.popup__content');

		$popup.css({ display: '' });

		$popupContent.css({
			position: 'absolute',
			top: topPos
		});

		//hide the overflow on the body until we stahp the animationIn in
		$('body').css({ 'overflow-x': 'hidden' });

		setTimeout(() => {
			_.$popup.addClass(showPopup);
			$popupContent.addClass(showPopup);

		}, CSS_TRANSISTION_DELAY);

		setTimeout(() => {
			//remove after the fade-in
			$('body').css({ 'overflow-x': '' });

		}, fadeIn);
	}

	closeHandlers() {
		const _ = this;

		const closeElems = _.params.clickOutsideClose ?
			'.popup__overlay,.popup__btn-close' :
			'.popup__btn-close';

		_.$popup.on(`click.${_.popupEventName}`, closeElems, function (e) {


			e.preventDefault();

			_._closeEvent();
		});
	}

	escapeClose() {
		const _ = this;
		$(document).on(`keydown.${_.popupEventName}`, function (ev) {
			const e = ev || window.event;
			const key = e.key;

			if (key === _.key.ESCAPE) {

				_._closeEvent();
			}
		});
	}

	_closeEvent() {
		const _ = this;

		if (_.params.useLocationHash) {

			window.history.pushState(null, null, _.getHistoryEntry(true));
		}

		_._close();
	}


	_close(refocus = true) {
		const _ = this;
		const { showPopup, fadeOut, trapPopupFocus } = _.params;
		const popupID = '#' + _.params.popupID;

		_.$popup.removeClass(showPopup);

		_.params.onClose(_.$element, popupID);

		//detach
		$(document).off(`keydown.${_.popupEventName}`);
		$(document).off(`keydown.${_.popupEventName}groupcontrols`);
		if (trapPopupFocus && _.trappedFocus ) {
			_.trappedFocus.remove();
			_.trappedFocus = null;
		}

		setTimeout(() => {
			_.params.afterClose(_.$element, popupID);

			_.isOpen = false;
			_.placeContentBack();

			$(popupID).remove();

			if (refocus) {
				$(_.$domClickElem)[0].focus();
			}

			_.isOpenHash = '';

		}, fadeOut + 1);

	}

	placeContentBack() {
		const _ = this;

		if (_.contentFromDOM) {

			$(_.elemGrabbedLocation).after($(_.currentSrc));
			_.elemGrabbedLocation.remove();
			_.contentFromDOM = false;
		}

	}

	remove() {
		Popup.remove(this.element);
	}

	static close(element, refocus = true) {
		const instance = elData(element, INSTANCE_NAME) || element;

		if (instance) {
			instance._close(refocus);
		}
	}


	static show(element) {
		 
		const instance = elData(element, INSTANCE_NAME);

		if (instance) {
			instance.loadPopup(element);
		}

	}
}