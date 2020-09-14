import $ from 'cash-dom';
import validJSONFromString from '../../util/formatting-valid-json.js';
import {CSS_TRANSISTION_DELAY} from '../../util/helpers';

const VERSION = "2.1.2";
const DATA_NAME = 'Collapse';
const EVENT_NAME = 'collapse';


export default class Collapse {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return EVENT_NAME;
	}

	constructor(element, options, index) {

		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		_.defaults = {
			elems: {
				item: '.collapse-item',
				btn: '.collapse-btn',
				header: '.collapse-header',
				body: '.collapse-body'
			},
			openClass: 'collapse-open',
			togglingClass: 'collapse-toggling',
			openingClass: 'collapse-opening',
			closingClass: 'collapse-closing',
			toggleClickBindOn: 'group',
			toggleGroupDuration: 500,
			toggleGroup: false,
			moveToTopOnOpen: false,
			moveToTopOffset: 0,
			moveToTopDivisor: 12,
			toggleOnHash: false,
			afterOpen: function () { },
			afterClose: function () { },
			afterInit: function () { }
		};
		_.element = element;
		_.onElem = element;
		_.index = index;
			
		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions) 
		);
		_.params = $.store.get(element,`${DATA_NAME}_params`);
		
		_.toggling = false;
		_.prevItem = null;
		
		_.init();
	}

	init() {
		const _ = this;

		_.collapseBodyNoID();
		_.setDisplay();

		if (_.params.toggleOnHash) {
			_.openWithHash();

			$(window).on(`hashchange.${EVENT_NAME}`, () => {
				_.openWithHash();
			});
		}
		_.toggleItems();
		_.params.afterInit(_.element);
	}

	setDisplay() {
		const _ = this;
		$(_.element).find(_.params.elems.body).each(function () {
			if ($(this).hasClass(_.params.openClass)) {

				const thisCollapsibleID = `#${$(this).attr('id')}`;
				const btnElems = `[data-href="${thisCollapsibleID}"],a[href="${thisCollapsibleID}"]`;
				$('body').find(btnElems)
					.addClass(_.params.openClass)
					.attr('aria-expanded', true);

			} else {
				//$(this).hide();
			}
		});
	}

	collapseBodyNoID() {
		const _ = this;
		$(_.element).find(_.params.elems.item).each(function (index) {

			const $cBody = $(this).find(_.params.elems.body);
			const $btn = $(this).find(_.params.elems.btn);

			if (!!!$cBody.attr('id')) {
				const btnContent = $btn.eq(0).text().slice(0, 20).trim().replace(/\s/g, '-');
				const id = `collapse_${_.index}-${index}-${btnContent}`;
				$cBody.attr('id', id);
				$btn.attr({
					href: `#${id}`,
					'aria-controls': id
				});
			}


			$btn.attr({
				'aria-expanded': $btn.attr('aria-expanded') || false,

			})
		});
	}

	toggleItems() {
		const _ = this;
		_.onElem = _.params.toggleClickBindOn == 'group' ? _.element :
			//default to group anyway if the body isn't specified
			(_.params.toggleClickBindOn == 'body' ? 'body' : 'group')
		;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}Close`, _.params.elems.btn, function (e) {
			
			e.preventDefault();

			if ( _.toggling ) { return;}

			const $this = $(this);
			// const thisCollapsibleID = $this.is('a') ? $this.attr('href') : this.attr('data-href');
			const thisCollapsibleID = $this.attr('href') || $this.attr('data-href');
			const $collapsibleItem = $(thisCollapsibleID);
			const CLOSE = $collapsibleItem.hasClass(_.params.openClass);
			const btnElems = `[data-href="${thisCollapsibleID}"],a[href="${thisCollapsibleID}"]`;
			const $btnElems = $(_.onElem).find(btnElems);

			$collapsibleItem.addClass(_.params.togglingClass);
			$btnElems.addClass(_.params.togglingClass);

			if (_.params.toggleGroup) {
				_._toggleGroup($collapsibleItem);
			}

			if (CLOSE) {
				_._closeItem($btnElems, $collapsibleItem)
			} else {
				_._openItem($btnElems, $collapsibleItem);
			}
		});
	}

	_toggleGroup($clickedItem) {
		const _ = this;

		$(_.onElem).find(_.params.elems.body).not($clickedItem).each(function () {

			if ($(this).hasClass(_.params.openClass)) {

				const $this = $(this);
				const thisID = $this.attr('id');
				const $btnElems = $(_.onElem).find(`[data-href="#${thisID}"],a[href="#${thisID}"]`);

				_._closeItem($btnElems, $this);

			}
		});
	}

	_closeItem($btnElems, $collapsibleItem) {
		const _ = this;

		_.toggling = true;

		$collapsibleItem
			.addClass(`${_.params.togglingClass} ${_.params.closingClass}`)
			.css({ height: $collapsibleItem.height() })
		
		setTimeout(() => {
			$collapsibleItem.css({ height: '0px' });
		}, CSS_TRANSISTION_DELAY);

		setTimeout(() => {
			const rmClasses = `${_.params.openClass} ${_.params.togglingClass} ${_.params.closingClass}`;
			$collapsibleItem
				.removeClass(rmClasses)
				.css({ height: '' });

			$btnElems
				.removeClass(rmClasses)
				.attr('aria-expanded', false);

			_.params.afterClose(this);
			
			_.toggling = false;

		}, _.params.toggleGroupDuration + CSS_TRANSISTION_DELAY);
	}

	_openItem($btnElems, $collapsibleItem) {
		const _ = this;
		
		_.toggling = true;

		$collapsibleItem.addClass(`${_.params.togglingClass} ${_.params.openingClass}`);
		const height = $collapsibleItem.height();
		
		$collapsibleItem.css({ height: '0px' })

		setTimeout(() => {
			$collapsibleItem.css({ height: height });
		}, CSS_TRANSISTION_DELAY);


		setTimeout(() => { 
			const rmClasses = `${_.params.togglingClass} ${_.params.openingClass}`;

			$collapsibleItem.addClass(`${_.params.openClass}`);
			$collapsibleItem.removeClass(rmClasses)
				.css({height: ''});

			$btnElems
				.addClass(_.params.openClass)
				.removeClass(rmClasses)
				.attr('aria-expanded', true);

			_.params.afterOpen(this);

			if (_.params.moveToTopOnOpen) {
				_._moveToTopOnOpen($collapsibleItem);
			}
			_.toggling = false;
		}, _.params.toggleGroupDuration + CSS_TRANSISTION_DELAY);
	}

	_moveToTopOnOpen($collapsibleItem) {
		const _ = this;
		const $item = $collapsibleItem.parent(_.params.elems.item) || $collapsibleItem;

		const elemOffsetTop = $item.offset().top;
		const top = elemOffsetTop - _.params.moveToTopOffset;
		let prevScroll = null;

		(function smoothscroll() {
			const currentScroll = document.documentElement.scrollTop || document.body.scrollTop || 0;

			//to stop the scroll if some other action prevents it from going
			if (prevScroll === currentScroll) return;
			prevScroll = currentScroll;

			if (currentScroll < top) {
				
				window.requestAnimationFrame(smoothscroll);
				
				// window.scrollTo(0, currentScroll + ((top - currentScroll) / _.params.moveToTopDivisor));
				window.scroll(0, currentScroll + ((top - currentScroll) / _.params.moveToTopDivisor));
			}
		})();
	}

	openWithHash() {
		const _ = this;
		const thisID = location.hash;
		const $elem = $(thisID);

		if ($elem.length > 0) {

			const $btnElems = $('body').find(`[data-href="${thisID}"],a[href="${thisID}"]`);

			_._toggleGroup('body', $elem);

			$elem.addClass(_.params.openClass).show();

			$btnElems
				.addClass(_.params.openClass)
				.removeClass(_.params.togglingClass)
				.attr('aria-expanded', true);

			_.params.afterOpen($elem);


			$(window).scrollTop(($elem.closest(_.params.elems.item) || $elem).offset().top - _.params.moveToTopOffset);


		}
	}
}