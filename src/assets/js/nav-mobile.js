
import validJSONFromString from './util/formatting-valid-json.js';
import {isVisible,CSS_TRANSISTION_DELAY} from './util/helpers';
import submenuBtn from './util/plugin/nav';
import { elData } from './util/lib-extend.js';

const VERSION = "1.3.0";
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
			outerElement: 'body',
			outsideClickClose: true,
			hasUlCls: 'has-ul',
			menuOpenCss: 'menu-opened', 
			menuTogglingCss: 'menu-toggling',
			menuIsOpeningCss: 'menu-is-opening',
			menuIsClosingCss: 'menu-is-closing',
			submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b',
			afterNavItemOpen: () => {},
			afterNavItemClose: () => {},
			afterOpen: () => {},
			afterClose: () => {},
			stopPropagation: true,
			nextLevelBtn: `<i class="nav-icon nav-icon--next" /><span class="sr-only">View menu</span></i>`,
			backLevelBtn: `<i class="nav-icon nav-icon--back" >← <span class="sr-only">Go Back</span></i>`,
			navToggleNestled: false,
			bkptEnable: null
		}
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
			$.extend(NavMobile.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);

		//run the methods
		_.addChildNavClass();
		_.menuButtonClick();
		_.menuNavigationClick();
		_.checkIfEnabled();
		
		_.doOutsideClick();
	

		const elemID = element[0].id || element[0].className;

		$(_.params.enableBtn).attr({
			'aria-controls': `#${elemID}`,
			'aria-targets': elemID,
			'aria-label': _.params.ariaLabel
		});

		return this;
	}

	mobileMenuToggle() {
		const _ = this;
		const {enableBtn, outerElement, menuOpenCss, menuIsOpeningCss, menuIsClosingCss, slideDuration} = _.params;
		if (_.menuOpened === true) {
			_.$element.parent()
				.find(`.${_.params.menuOpenCss}`)
				.removeClass(_.params.menuOpenCss)
				.find("[style]").css('display', '');

			$(outerElement).removeClass(menuOpenCss);

			$(outerElement).addClass(menuIsClosingCss);
			setTimeout(() => {
				$(outerElement).removeClass(menuIsClosingCss);
			}, slideDuration);

			_.menuOpened = false;
			_.params.afterClose();

		} else {
			_.$element.addClass(menuOpenCss);
			$(outerElement).addClass(menuOpenCss);

			$(outerElement).addClass(menuIsOpeningCss);
			setTimeout(() => {
				$(outerElement).removeClass(menuIsOpeningCss);
			}, slideDuration);

			_.menuOpened = true;
			_.params.afterOpen();
		}
		//update aria-expanded
		$(enableBtn).attr({'aria-expanded': _.menuOpened});
	}

	addChildNavClass() {
		const _ = this;

		$('li', _.$element).has('ul').each(function () {
			const $this = $(this);
			 
			 
			if (!$this.next('button').length) { 
				const $a = $this.find('a').first();

				$a.addClass(_.params.hasUlCls);

				$a.after(submenuBtn(_.params, $a.text()))
			}
		});
	}

	menuButtonClick() {
		const _ = this;
		const ESCAPE = 27;

		$(_.params.enableBtn).on(`click.${EVENT_NAME} ${EVENT_NAME}`, function (e) {
			 
			if (!_.allowClick) return;

			_.mobileMenuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$(document).on(`keydown.${EVENT_NAME}`, (e) => {

			const key = e.keyCode || e.which;

			if (key === ESCAPE && _.$element.hasClass(_.params.menuOpenCss) && _.allowClick) {
				_.mobileMenuToggle();
			}
		});
	}

	menuNavigationClick() {
		const _ = this;

		if (!_.params.navToggleNestled) {
			_.menuNavToggle();
		
		} else {
			//non-standards, but alternative behavior
			//of clicking into a link item and seeing only
			//its subnav items with a back button option
			_.menuNavToggleNestled();
		}

	}

	menuNavToggle() {
		const _ = this;

		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.btn-nav--mb-submenu`, function (e) { 

			const {hasUlCls, menuOpenCss, menuTogglingCss, slideDuration} = _.params;

			const $li = $(this).closest(`.${hasUlCls}`);  
			const isOpened = $li.hasClass(menuOpenCss);
			const $ul = $li.find('ul').first();  
			 
			//exit because were in desktop view
			if (!_.allowClick) { return; }
			 
			if (!isOpened) {

				_.allowClick = false;

				$ul.addClass(menuTogglingCss);
				
				const ulHeightBeforeResetToZero = $ul[0].scrollHeight;

				$ul.css({ height: 0 });

				

				setTimeout(() => {
					$ul.css({ height: ulHeightBeforeResetToZero });
				}, CSS_TRANSISTION_DELAY);
			
				setTimeout(() => {
					$li.addClass(menuOpenCss);

					$ul.removeClass(menuTogglingCss)
						.addClass(menuOpenCss);

					$ul.css({ height: '' });

					_.params.afterNavItemOpen($li);
					
					_.allowClick = true;

				}, slideDuration);
			} else {
				_.allowClick = false;

				$ul.removeClass(menuOpenCss).addClass(menuTogglingCss)
					.find(`.${menuOpenCss}`).removeClass(menuOpenCss);

				$ul.css({ height: $ul[0].scrollHeight });

			 

				setTimeout(() => {
					$ul.css({ height: 0 });
				}, CSS_TRANSISTION_DELAY);

				setTimeout(() => {
					$li.removeClass(menuOpenCss);
					$ul.removeClass(`${menuTogglingCss} ${menuOpenCss}`);

					$ul.css({ height: '' });

					_.params.afterNavItemOpen($li);
					 
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


	doOutsideClick() {
		const _ = this;
		$('body').on(`click.${EVENT_NAME}`, this, function (e) {
			if (_.params.outsideClickClose) {
				if (!_.menuOpened) { return; }//lets just exit then..
		
				const menuClicked = (_.$element.has(e.target).length > 0);

				//if the menu item is not clicked and its opened
				//the menu button shouldn't register because propogation is prevented to the body
				if (!menuClicked && _.menuOpened) {
					_.mobileMenuToggle();
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
				
				_.allowClick = typeof _.params.bkptEnable ==='number' ? 
					$(window).width() <= _.params.bkptEnable :
					isVisible($(_.params.enableBtn)[0])
				;
				 
				 
			}, e.type === EVENT_NAME ? 0 : 200);
		}).trigger(EVENT_NAME);

		 
	}
}

export class NavMobileNestled extends NavMobile {

	static get pluginName() {
		return `${EVENT_NAME}Nestled`;
	}

	constructor(element, options){
		super(element, options);
	}

	menuNavToggleNestled() {
		const _ = this;

		_.$element.find('li').has('ul').each(function () {
			const $nextBtn = $(`<button type="button" class="btn-nav--mb-next">${_.params.nextLevelBtn}</button>`);
			const $backBtn = $(`<button type="button" class="btn-nav--mb-back">${_.params.backLevelBtn}</button>`);

			$(this).append($nextBtn).prepend($backBtn);
		});

		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`,
		`.${_.params.hasUlCls} > a, .${_.params.hasUlCls} > .btn-nav--mb-next`,
		function (e) {
			//exit if were not in mobile
			if (!_.allowClick) return;

			const $parentLi = $(this).closest('li');

			(!$parentLi.hasClass('show-nav-elem')) && e.preventDefault();

			$parentLi.siblings('li').addClass('hide-nav-elem');
			$parentLi.addClass('show-nav-elem');

			e.stopPropagation();

		});

		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, 
		`.${_.params.hasUlCls} > .btn-nav--mb-back`, function () {
			$(this).parent('li').siblings()
				.removeClass('hide-nav-elem')
				.removeClass('show-nav-elem');

			$(this).parent('li').removeClass('show-nav-elem');
		});
	}
}