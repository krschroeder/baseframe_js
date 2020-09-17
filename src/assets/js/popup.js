import $ from "cash-dom";
import validJSONFromString from './util/formatting-valid-json.js';
import generateGUID from './util/guid-generate.js';

import { isHidden, photoRegex, CSS_TRANSISTION_DELAY } from './util/helpers';

const VERSION = "1.0.0";
const DATA_NAME = 'Popup';
const EVENT_NAME = 'popup';
const INSTANCE_NAME = `${DATA_NAME}_instance`;

export default class Popup {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	constructor(element, options, index) {
		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		const src = $(element).data('popup-src') || $(element).attr('href') || null;

		_.defaults = {
			popupID: 'popup_' + generateGUID(),
			src: src,
			popupOuterClass: "",
			title: $(element).data('popup-title') || $(element).attr('title') || '',
			titleElem: 'h3',
			titleCss: '',
			caption: $(element).data('popup-caption') || '',
			clickOutsideClose: true,
			fadeOut: 500,
			fadeIn: 400,
			fadeInDelay: 300,
			zIndex: 2000,
			vhDivisor: 2,
			firstAnchorFocus: true,
			setTopPosition: null,
			isImage: false,
			isJsArray: false,
			escapeClose: true,
			group: true,
			showGroupAmount: true,
			groupOfHTML: '/',
			launch: false,
			photoRegex: photoRegex,
			closeText: `<i class="icon-close"><span class="sr-only">Close</span></i>`,
			prevBtnContent: `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>`,
			nextBtnContent: `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>`,
			loadingHTML: `<div class="popup__loader"></div>`,
			appendPopupTo: 'body',
			showPopup: 'popup--show-popup',
			enableEvent: 'click',
			loadLocationHash: true,
			useLocationHash: true,
			afterLoaded: () => { },
			afterClose: () => { },
			onClose: () => { }
		};

		_.$element = $(element);
		
		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions)
		);
		_.params = $.store.get(element, `${DATA_NAME}_params`);

		_.$popup = null;

		_.key = {
			ARROWLEFT: 37,
			ARROWRIGHT: 39,
			ESCAPE: 27
		};

		//Content
		_.elemGrabbedLocation = null;
		_.grabContentsFromDom = false;
		_.currentElem = null;
		_.currentSrc = null;
		_.$listElems = _.params.isJsArray ? _.params.src : null;
		_.groupAmountElem = null;

		//click elem
		_.$domClickElem = null;
		_.domElemClicked = false;

		//for groups
		_.groupCount = 0;
		_.groupIndex = 0;

		//location hash  
		_.isOpen = false;
		_.isOpenHash = '';
		_.historyID = '#' + _.params.popupID + '__' + index;
		_.loadedFromHash = false;

		_.initLoadEvents();
		
	}

	initLoadEvents() {
		const _ = this;

		_.$element.on(`${_.params.enableEvent}.${EVENT_NAME} ${EVENT_NAME}`, function (e) {
			 
			e.preventDefault();
			
			if (_.params.useLocationHash){
				window.history.pushState(null, null, _.historyID );
			}
			_.loadPopup(this);

		});


		$(window).on(`popstate.${EVENT_NAME} ${EVENT_NAME}`,(e) => {
			if (_.params.useLocationHash) {
				
				if (
					_.historyID === _.isOpenHash ||
					_.historyID === location.hash
				){
					if(_.isOpen) {
					
						_._close();
				
					} else {
					
						_.loadPopup(_.$element);
					}
				}
			}
			e.preventDefault();
				
		});

		if (_.params.launch) {
			_.loadPopup(document.activeElement);
		}

		if (_.params.loadLocationHash && _.historyID === location.hash){
			_.loadPopup(_.$element);
			_.loadedFromHash = true; console.log('hhhh')
		}
	}

	loadPopup(clickElem = null) {
		const _ = this;

		if (clickElem) {
			_.$domClickElem = $(clickElem);
			_.domElemClicked = true;
		}
		
		_.isOpenHash = window.location.hash;

		_.addToDOM();
		_.closeHandlers();

		if (_.params.escapeClose) {
			_.escapeClose();
		}

		_.isOpen = true;
	}

	addToDOM() {
		const _ = this;
		const { popupID, fadeIn, fadeInDelay, appendPopupTo, firstAnchorFocus } = _.params;

		_.createPopup();

		$(appendPopupTo).append(_.$popup);

		if (firstAnchorFocus) {
			setTimeout(() => {

				const $firstAnchor = $(`#${popupID}`)
					.find("[tabindex], a, input")
					.not("[tabindex='-1'],.popup__btn-close").eq(0);


				$firstAnchor.length && $firstAnchor[0].focus();

			}, fadeIn + fadeInDelay);
		}

		_.animationIn();
	}

	determineContent() {
		const _ = this;
		const { isJsArray, popupID, group } = _.params;

		//if grabbed content from before
		if (_.grabContentsFromDom) {
			_.elemGrabbedLocation.after(_.currentSrc);
			_.elemGrabbedLocation.remove();
		}

		//testing to see if its simple a class or ID selector
		const domElemRgx = /^(\#|\.)/;

		let currentElem,
			src,
			title,
			caption,
			isDomSelector = false
		;

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
			src = currentElem.data('popup-src') || currentElem.attr('href') || null;

			if (!src) {
				src = currentElem;
				isDomSelector = true;
			} else {
				isDomSelector = domElemRgx.test(src);
			}

			_.groupCount = _.$listElems.length;
			``
			title = currentElem.data('popup-title') || currentElem.attr('title');
			caption = currentElem.data('popup-caption');
		}

		_.currentElem = currentElem;
		_.currentSrc = src;

		const grabContentsFromDom = isDomSelector && !isJsArray && (!isDomSelector ? false : isHidden($(src)[0]));

		_.grabContentsFromDom = grabContentsFromDom;

		if (grabContentsFromDom) {

			_.elemGrabbedLocation = $('<span/>').attr({ id: 'orig-loc_' + popupID });

			$(src).after(_.elemGrabbedLocation);
		}

		_.params.title = title || '';
		_.params.caption = caption || '';
	}

	placeContent() {
		const _ = this;
		const { caption, isJsArray, titleElem, titleCss, title, showGroupAmount, popupID, loadingHTML, isImage } = _.params;

		const currentElem = _.currentElem;
		const src = _.currentSrc;
		const $popupContentBody = _.$popup.find(`.popup__content-body`);

		const isImg = isImage ||
			_.params.photoRegex.test(src) ||
			(!isJsArray ? currentElem.data('popup-type') === "image" : currentElem.nodeName === 'img')
			;

		_.$popup.find(`#${popupID}__title`).html(`<${titleElem} class="${titleCss}">${title}</${titleElem}>`);
		_.$popup.find(`#${popupID}__caption`).html(caption);

		//wipe the current body contents
		$popupContentBody.html("");


		if (isImg) {

			const imgNode = new Image();

			imgNode.src = src;
			imgNode.alt = title || "";

			let loader = '';

			if (!imgNode.complete) {
				imgNode.style.opacity = "0";

				loader = $('<div/>').attr({
					class: 'popup__loader-outer'
				}).html(loadingHTML);
			}

			$popupContentBody.append(imgNode, loader);

			$(imgNode).on(`load.${EVENT_NAME}`, () => {

				$('.popup__loader-outer').remove();
				imgNode.removeAttribute("style");

				$popupContentBody.css({
					'min-height': $popupContentBody.find('img').height()
				});
			})

		} else {
			$popupContentBody.append($(src)).css({ 'min-height': '0px' });
		}


		if (showGroupAmount) {
			_.groupAmountElem.html(`${_.groupIndex + 1} ${_.params.groupOfHTML} ${_.groupCount}`);
		}
	}

	createPopup() {
		const _ = this;
		const { popupID, group, prevBtnContent, nextBtnContent, showGroupAmount } = _.params;

		_.determineContent();

		let groupControls = null;

		if (_.groupCount > 1 && (typeof group === 'string' || group)) {

			let btnPrev = $("<button>").attr({
				type: "button",
				class: "btn--popup btn--popup-prev"
			}).append(prevBtnContent),

				btnNext = $("<button>").attr({
					type: "button",
					class: "btn--popup btn--popup-next"
				}).append(nextBtnContent);

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

		const title = `<div id="${popupID}__title" class="popup__title">${_.params.title}</div>`,
			caption = `<div id="${popupID}__caption" class="popup__caption">${_.params.caption}</div>`,
			$overlay = $('<div/>').attr({ class: 'popup__overlay' }),
			$src = $('<div/>').attr({ class: 'popup__content' }),
			$body = $('<div/>').attr({ class: 'popup__content-body' }),
			$closeBtn = _.params.closeText ? $(`<a/>`).attr({ class: "popup__btn-close", href: "#" }).html(_.params.closeText) : '',
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

			$(document).on(`keydown.${EVENT_NAME}`, function (e) {
				const ev = e || window.event;
				const key = ev.keyCode || ev.which;

				if (key == _.key.ARROWLEFT || key == _.key.ARROWRIGHT) {
					_.toggleGroup(
						key == _.key.ARROWLEFT,
						key == _.key.ARROWRIGHT
					);
				}
			});

			_.$popup.on(`click.${EVENT_NAME}`, '.btn--popup-prev', function () {
				_.toggleGroup(true, false);
			})
			.on(`click.${EVENT_NAME}`, '.btn--popup-next', function () {
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
			setTopPosition :
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

		_.$popup.on(`click.${EVENT_NAME}`, closeElems, function (e) {


			e.preventDefault();
			 
			_._closeEvent();
		});
	}

	escapeClose() {
		const _ = this;
		$(document).on(`keydown.${EVENT_NAME}`, function (ev) {
			const e = ev || window.event;
			const key = e.keyCode || e.which;

			if (key === _.key.ESCAPE) {
				_._closeEvent();
			}
		});
	}

	_closeEvent(){
		const _ = this;

		if (_.params.useLocationHash){  
			
			if (_.loadedFromHash) {

				window.history.pushState(null, null, '#popup-closed' );
				_._close();
				_.loadedFromHash = false;
			} else {
				
				window.history.back(); 
			}
			
		} else {
			_._close();
		}
	}


	_close(refocus = true) {
		const _ = this;
		const { showPopup, fadeOut } = _.params;
		const popupID = '#' + _.params.popupID;

		$(popupID).removeClass(showPopup);

		_.params.onClose(_.$element, popupID);
		
		setTimeout(() => {
			_.params.afterClose(_.$element, popupID);
			
			_.isOpen = false;

			if (_.grabContentsFromDom) {

				$(_.elemGrabbedLocation).after(_.currentSrc);
				_.elemGrabbedLocation.remove();

				_.grabContentsFromDom = false;
			}

			$(popupID).remove();

			if (refocus) {
				$(_.$domClickElem)[0].focus();
			}

			_.isOpenHash = '';

		}, fadeOut + 1);

	}


	static close(element, refocus = true) {
		const instance = $.store.get(element, INSTANCE_NAME) || element;

		if (instance) {
			instance._close(refocus);
		}
	}

	static remove(element) {

		if (element) {

			$.store.remove(element, INSTANCE_NAME);
			$.store.remove(element, `${DATA_NAME}_params`);
			$(element)
				.off(`${params.enableEvent}.${DATA_NAME} ${DATA_NAME}`)
				.off(DATA_NAME);

			$(document).off(`keydown.${EVENT_NAME}`);
		}

	}

	static show(element) {
		const instance = $.store.get(element, INSTANCE_NAME);

		if (instance) {
			instance.loadPopup();
		}

	}

}