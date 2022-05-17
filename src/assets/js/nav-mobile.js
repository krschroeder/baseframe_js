
import { CSS_TRANSISTION_DELAY } from './util/constants.js';
import validJSONFromString from './util/formatting-valid-json.js';
import getType, { isVisible } from './util/helpers';
import submenuBtn from './util/plugin/nav';
import { elData } from './util/store';
import trapFocus from './util/trap-focus.js';


const VERSION = "1.7.0";
const DATA_NAME = 'NavMobile';
const EVENT_NAME = 'navMobile';


export default class NavMobile {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return {
			enableBtn: '#mobile-nav-btn',
			ariaLabel: 'Toggle site navigation',
			slideDuration: 400,
			outerElement: document.body,
			outsideClickClose: true,
			animateHeight: true,
			hasUlCls: 'has-ul',
			menuOuterOpenCss: 'menu-opened',
			menuOpenCss: 'menu-opened',
			menuTogglingCss: 'menu-toggling',
			menuIsOpeningCss: 'menu-is-opening',
			menuIsClosingCss: 'menu-is-closing',
			submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b',
			submenuBtnSkip: false,
			afterNavItemOpen: () => { },
			afterNavItemClose: () => { },
			afterOpen: () => { },
			afterClose: () => { },
			doTrapFocus: true,
			trapFocusElem: null,
			stopPropagation: true,
			navToggleNestled: false,
			bkptEnable: null
		};
	}

	constructor(element, options) {
		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);
		//props

		_.$element = $(element);

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend({}, NavMobile.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);

		//run the methods
		_.addChildNavClass();
		_.buttonClick();
		_.navigationClick();
		_.checkIfEnabled();
		_.outsideClickClose();


		const elemID = element[0].id || element[0].className;

		$(_.params.enableBtn).attr({
			'aria-controls': elemID,
			'aria-label': _.params.ariaLabel
		});

		return this;
	}

	menuToggle() {
		const _ = this;
		const {
			enableBtn,
			outerElement,
			menuOpenCss,
			menuOuterOpenCss,
			menuIsOpeningCss,
			menuIsClosingCss,
			slideDuration,
			doTrapFocus,
			trapFocusElem
		} = _.params;

		let trappedFocus = null;

		if (_.menuOpened) {
			// closing
			_.$element.parent()
				.find(`.${menuOpenCss}`)
				.removeClass(menuOpenCss)
				.find("[style]").css('display', '');

			$(outerElement).removeClass(menuOuterOpenCss).addClass(menuIsClosingCss);

			setTimeout(() => {
				$(outerElement).removeClass(menuIsClosingCss);
			}, slideDuration);

			_.menuOpened = false;

			trappedFocus && trappedFocus.remove();

			_.params.afterClose();

		} else {
			// opening
			$(outerElement).addClass(menuIsOpeningCss);
			_.$element.addClass(menuIsOpeningCss);

			setTimeout(() => {
				_.$element.removeClass(menuIsOpeningCss).addClass(menuOpenCss);
				$(outerElement).removeClass(menuIsOpeningCss).addClass(menuOuterOpenCss);

			}, slideDuration);

			_.menuOpened = true;

			if (doTrapFocus) {
				trappedFocus = trapFocus(trapFocusElem || _.$element, { nameSpace: EVENT_NAME });
			}

			_.params.afterOpen();
		}
		//update aria-expanded
		$(enableBtn).attr({ 'aria-expanded': _.menuOpened });
	}

	addChildNavClass() {
		const _ = this;
		const {submenuBtnSkip} = _.params;

		$('li', _.$element).has('ul').each(function () {
			const $this = $(this);
			let skipUl = false;

			if (
				getType(submenuBtnSkip) === 'function' &&
				// condition in function must return false
				submenuBtnSkip(this)
			) {
				skipUl = true;
			}
		 
		 
			if (!$this.next('button').length && !skipUl) {
				const $a = $this.find('a').first();

				$a.addClass(_.params.hasUlCls);

				if ($a[0].parentNode.isSameNode(this)) {
					// make sure the <a> is a direct child of <li>
					$a.after(submenuBtn(_.params, $a.text()))
				}
			}
		});
	}

	buttonClick() {
		const _ = this;


		$(_.params.enableBtn).on(`click.${EVENT_NAME} ${EVENT_NAME}`, function (e) {

			if (!_.allowClick) return;

			_.menuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$(document).on(`keydown.${EVENT_NAME}`, (e) => {

			if (e.code === 'Escape' && _.$element.hasClass(_.params.menuOpenCss) && _.allowClick) {
				_.menuToggle();

				$(_.params.enableBtn)[0].focus();
			}
		});
	}

	navigationClick() {
		const _ = this;

		if (!_.params.navToggleNestled) {
			_.navToggle();

		} else {
			//non-standards, but alternative behavior
			//of clicking into a link item and seeing only
			//its subnav items with a back button option
			_.navToggleNestled();
		}

	}

	navToggle() {
		const _ = this;
		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, '.' + _.params.submenuBtnCss.replace(/\s/g, '.'), function (e) {

			const { 
				animateHeight, 
				hasUlCls, 
				menuOpenCss, 
				menuIsOpeningCss, 
				menuIsClosingCss, 
				menuTogglingCss, 
				slideDuration 
			} = _.params;

			const $li = $(this).closest(`.${hasUlCls}`);
			const isOpened = $li.hasClass(menuOpenCss);
			const $ul = $li.find('ul').first();

			//exit because were in desktop view
			if (!_.allowClick) { return; }

			// const toggleCss = isOpened ? menuIsClosingCss : menuIsOpeningCss;
			const actionCss = `${menuTogglingCss} ${isOpened ? menuIsClosingCss : menuIsOpeningCss}`;
			
			if (!isOpened) {

				_.allowClick = false;

				$li.addClass(actionCss);
				$ul.addClass(actionCss);

				if (animateHeight) {
					const ulHeightBeforeResetToZero = $ul[0].scrollHeight;
					$ul.css({ height: 0 });
					
					
					setTimeout(() => {
						$ul.css({ height: ulHeightBeforeResetToZero });
					}, CSS_TRANSISTION_DELAY);
				}

				setTimeout(() => {
					$li.removeClass(actionCss).addClass(menuOpenCss);
					$ul.removeClass(actionCss).addClass(menuOpenCss);

					$ul.css({ height: '' });

					_.params.afterNavItemOpen($li);

					_.allowClick = true;

				}, slideDuration);

			} else {

				_.allowClick = false;
				$li.addClass(actionCss).removeClass(menuOpenCss);
				$ul.addClass(actionCss).removeClass(menuOpenCss);

				$ul.find(`.${menuOpenCss}`).removeClass(menuOpenCss);

				$ul.css({ height: $ul[0].scrollHeight });

				if (animateHeight) {
					setTimeout(() => {
						$ul.css({ height: 0 });
					}, CSS_TRANSISTION_DELAY);
				}

				setTimeout(() => {
					$li.removeClass(actionCss);
					$ul.removeClass(actionCss);

					$ul.css({ height: '' });

					_.params.afterNavItemClose($li);

					_.allowClick = true;

				}, slideDuration);

			}

			e.stopPropagation();

		})
			.on(`click.${EVENT_NAME} ${EVENT_NAME}`, 'a', function (e) {
				//prohibit closing if an anchor is clicked
				if (_.params.stopPropagation) {
					e.stopPropagation();
				}
			});

	}


	outsideClickClose() {
		const _ = this;
		$(document.body).on(`click.${EVENT_NAME}`, this, function (e) {
			if (_.params.outsideClickClose) {
				if (!_.menuOpened) { return; }//lets just exit then..

				const menuClicked = (_.$element.has(e.target).length > 0);

				//if the menu item is not clicked and its opened
				//the menu button shouldn't register because propogation is prevented to the body
				if (!menuClicked && _.menuOpened) {
					_.menuToggle();
				}
			}
		});

	}

	checkIfEnabled() {
		const _ = this;

		let resizeTimer;

		//basically if the navigational button is visible then
		//we can allow the click to open the navigation
		//this is so it doesn't clash with any other plugins
		//and allows for the control of this click via CSS
		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (e) {

			resizeTimer && clearTimeout(resizeTimer);

			resizeTimer = setTimeout(() => {

				_.allowClick = typeof _.params.bkptEnable === 'number' ?
					$(window).width() <= _.params.bkptEnable :
					isVisible($(_.params.enableBtn)[0])
					;

			}, e.type === EVENT_NAME ? 0 : 200);
		}).trigger(EVENT_NAME);
	}

	static remove(element) {

		$(element).each(function () {
			const instance = elData(this, `${DATA_NAME}_instance`);
			const params = elData(this, `${DATA_NAME}_params`);

			$(params.enableBtn).off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(document).off(`keydown.${EVENT_NAME}`);
			instance.$element
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`)
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`);

			$(document.body).off(`click.${EVENT_NAME}`);
			$(window).off(`resize.${EVENT_NAME} ${EVENT_NAME}`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}
}