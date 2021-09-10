
import validJSONFromString from './util/formatting-valid-json.js';
import { elData } from './util/store';

const VERSION = "1.1.2";
const DATA_NAME = 'NavDesktop';
const EVENT_NAME = 'navDesktop';
 

export default class NavDesktop {

 	static get version(){
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return {
			stopWidth: 768,
			delay: 800,
			edgeCss: 'ul-on-edge', 
			outerElem: 'body',
			ulHasCss: 'has-ul',
			ulNotCss: 'no-ul',
			navHoveredCss: 'desktop-nav-hovered',
			hoverCss: 'hover',
			submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b'
		};
	}

	constructor(element, options) {
		const _ = this;

		_.stayHover = null;
		_.element = element; 

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);


		elData( 
			element,
			`${DATA_NAME}_params`,
			$.extend(NavDesktop.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);

		_.addCssToElems();
		_.init();

		return this;
	}
  
	addCssToElems() {
		const _ = this;

		const {ulNotCss, ulHasCss} = _.params;

		$('li', _.element)
			.addClass(ulNotCss)
			.has('ul').each(function () {

				$(this).removeClass(ulNotCss);

				if (!$(this).hasClass(ulHasCss)) {
					$(this).addClass(ulHasCss);
				}
			});

	}
	
	init() {
		const _ = this; 
		let prevEvent = null;

		const evtTracker = (elem, e, cb ) => {
			const currEvent = e.type;
			const containsOrISElem = elem.isSameNode(e.target) ? 
				true : 
				!!$(e.target).parents(elem).length
			;
		
			if(!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {
			
				prevEvent = currEvent;
				cb();
			} 
		}

		$(_.element).find('ul').on(`mouseover.${EVENT_NAME}`, 'li,ul',function(e){

			const li = this;
			const {outerElem, navHoveredCss, hoverCss} = _.params;

			evtTracker(li,e, () => {
				_.edgeDetector(li);

				const liLiParents = $(li).parents('li');

				li.classList.add(hoverCss);
				liLiParents.addClass(hoverCss);

				$(li).find(`.${hoverCss}`).removeClass(hoverCss);
				$(li).siblings('li').removeClass(hoverCss)

				liLiParents.length === 0 && 
					$(_.element).find(`.${hoverCss}`).removeClass(hoverCss);

				_.stayHover && clearTimeout(_.stayHover);

				$(outerElem).addClass(navHoveredCss);
			});
			
		}).on(`mouseout.${EVENT_NAME}`, 'li,ul', function(e){

			const li = this;
			const {edgeCss, delay, navHoveredCss, hoverCss, outerElem} = _.params;

			evtTracker(li,e,() => {
			
				_.stayHover = setTimeout(
					() => { 
						$(_.element).find(`.${hoverCss}`).removeClass(`${hoverCss} ${edgeCss}`);
						$(_.element).find(`.${edgeCss}`).removeClass(edgeCss);
						$(outerElem).removeClass(navHoveredCss);
					},
				delay);

			});
		});
	} 
 
	edgeDetector(li) {
		const _ = this;
		const {edgeCss, stopWidth} = _.params;
		const dw = $(window).width();

		if (stopWidth < dw) {
				
			const $uls = $('ul', li); 
			const $ul = $uls.eq(0),
				l = $ul.offset() ? $ul.offset().left : 0,
				uw = $ul.width(),
				fullyVisible = (l + uw <= dw);

			if (!fullyVisible) {
				li.classList.add(edgeCss);
			}
		}
	}
} 
