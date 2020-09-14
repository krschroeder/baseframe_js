import $ from 'cash-dom';
import validJSONFromString from '../../util/formatting-valid-json.js';

const VERSION = "1.0.0";
const DATA_NAME = 'ResponsiveDropDown';
const EVENT_NAME = 'responsiveDropDown';

const CSS_TRANS_DELAY = 100;


export default class ResponsiveDropDown {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return EVENT_NAME;
	}

	constructor(element, options) {
		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		_.defaults = {
			clickHeader: '.resp-dd__header',
			toggleBody: '.resp-dd__body',
			closeBtnBottom: true,
			closeBtnText: 'Close',
			openHeaderCss: 'resp-dd--active',
			inMobileCss: 'resp-dd--in-mobile',
			closeBtnDivCss: 'resp-dd__close-btn-area',
			closeBtnCss: '',
			toggleCss: 'resp-dd__body--open',
			togglingCss: 'resp-dd__body--toggling',
			duration: 300,
			mobileBkpt: 768,
			outsideClickElem: 'body'
		};

		_.isActive = false;
		_.$element = $(element);
		_.resizeDelay = null;
		_.windowWidth = $(window).width();

		//for ios devices to add in the clicking (just adding in cursor pointer style to do so)
		_.styleAdded = false;
		_.is_ios = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) ? true : false;

		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions)
		);
		_.params = $.store.get(element, `${DATA_NAME}_params`);

		_.init();
	}



	init() {
		const _ = this;

		_.updateMobileDesktopView();
		_.headerClick();
		_.outsideClickClose();
		_.closeBtn();

	}

	outsideClickClose() {

		const _ = this;

		ResponsiveDropDown.iosOutsideClickSupport();

		$(_.params.outsideClickElem).on(`click.${EVENT_NAME}`, function (e) {

			const { mobileBkpt, openHeaderCss, toggleBody, toggleCss } = _.params;

			const $thisToggleBody = $(toggleBody, _.$element);
			const isInToggleBody = !!$(e.target).parents($thisToggleBody).length;
			const isToggleBody = $thisToggleBody[0].isSameNode(e.target);
			const isCloseBtn = $(`.resp-dd__close-nav`)[0].isSameNode(e.target);

			if (isInToggleBody && !isCloseBtn || isToggleBody) { return }

			if (_.isActive) {
				//need to remove the click real fast
				if (_.windowWidth < mobileBkpt) {
					//openHeaderCss
					$(toggleBody, _.$element).removeClass(toggleCss)

					_.$element.toggleClass(openHeaderCss);

					_.$element.off(`click.${EVENT_NAME}`);
					_.$element.off(EVENT_NAME);
					_.isActive = !_.isActive;

					//anddd add it back
					setTimeout(function () {
						_.headerClick();
					}, 100);
				}
			}
		});
	}

	closeBtn() {
		const _ = this;

		if (_.params.closeBtnBottom) {
			const { toggleBody, closeBtnCss, closeBtnText, closeBtnDivCss } = _.params;

			const closeBtnHTML = `<div class="${closeBtnDivCss}">
				<button type="button" class="resp-dd__close-nav ${closeBtnCss}">${closeBtnText}</button>
			</div>`;

			$(toggleBody, _.$element).append(closeBtnHTML)
				.find(`.${closeBtnDivCss}`)
				.on(`click.${EVENT_NAME}`, 'button', function (event) {
					//webform pages need to not submit the form!
					//buttons do that by default. So we prevent it here!
					event.preventDefault();
				});
		}
	}

	updateMobileDesktopView() {
		const _ = this;
		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (event) {

			const {
				inMobileCss,
				openHeaderCss,
				mobileBkpt
			} = _.params;

			clearTimeout(_.resizeDelay);

			_.resizeDelay = setTimeout(() => {
				const winWidth = $(window).width();
				const didntActuallyResize = (_.windowWidth === winWidth);

				_.windowWidth = winWidth;
				 
				if (didntActuallyResize) {
					if (event.type === `resize`) return;
				}

				if (_.windowWidth > mobileBkpt) {
					_.$element
						.removeClass(inMobileCss)
						.removeClass(openHeaderCss);

					_.isActive = false;
				} else {
					//in mobile
					_.$element.addClass(inMobileCss);

				}
			}, 100);

		}).trigger(EVENT_NAME);
	}

	headerClick() {
		const _ = this;
		let toggling = null;

		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `${_.params.clickHeader}, .close-dd-nav`, function (event) {

			const {
				toggleBody,
				togglingCss,
				toggleCss,
				openHeaderCss,
				mobileBkpt,
				duration,
				outsideClickElem
			} = _.params;

			if (_.windowWidth < mobileBkpt) {

				_.$element.addClass(togglingCss);

				toggling && clearTimeout(toggling);

				toggling = setTimeout(() => {

					_.$element.removeClass(togglingCss);

				}, duration);

				if (!_.isActive) {
					_.$element.toggleClass(openHeaderCss);
					
					_.outsideClickClose();

					setTimeout(() => {
						$(toggleBody, _.$element)
							.addClass(toggleCss);
					}, CSS_TRANS_DELAY)

					_.isActive = true;
				} else {
					$(toggleBody, _.$element).removeClass(toggleCss);
					
					_.$element.toggleClass(openHeaderCss);

					$(outsideClickElem).off(`click.${EVENT_NAME}`);

					_.isActive = false;
				}

				event.stopPropagation();
			}
		});
	}

	static iosOutsideClickSupport() {
		const _ = this;

		if (_.is_ios && !_.styleAdded) {
			$(_.params.outsideClickElem).css({ cursor: 'pointer' });
			_.styleAdded = true;
		}
	}
}