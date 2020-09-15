import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json.js';


const VERSION = "1.0.0";
const DATA_NAME = 'Parallax';
const EVENT_NAME = 'parallax';

export default class Parallax {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return EVENT_NAME;
	}

	constructor(element, options){
		const _ = this;
		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME+'-options')
		);
		_.defaults = {
			speed: 7,
			axis: 'y',
			relativeElem: false,
			$heightElem: $(element),
			initOffset: false,
			bgFill: false,
			outStop: 1,
			scrollMaxPxStop: 5000,
			minWidth: null,
			maxWidth: null
		};

		_.$window = $(window);
		_.$element = $(element);
			
		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions) 
		);
		_.params = $.store.get(element,`${DATA_NAME}_params`);

		_.requestAnimationFrame = !!window.requestAnimationFrame;

		_.initOffsetSet = false;
		_.initOffset = 0;
		//props to get updated on resize
		_.updatableProps();
		
		_.initiallyInView = ( _.$relElem.offset().top < _.winHeight );

		_.init();
	}

	init() {
		const _ = this;
		const EVENTS = [
			`scroll.${EVENT_NAME}`,
			`resize.${EVENT_NAME}`,
			EVENT_NAME
		].join(' ');

		$( window ).on( EVENTS , ()=> {
			if( _.requestAnimationFrame ) {
				window.requestAnimationFrame(function(){
					_.parallax(_);
				});
			} else {
				_.parallax(_);
			}

		}).trigger(EVENT_NAME);
		
		_.resizeUpdates();
	}

	updatableProps() {
		const _ = this;

		_.winHeight = _.$window.height();
		_.winWidth = _.$window.width();
		_.elemHeight = _.params.$heightElem.height();
		_.speed = _._speed;
		_.bgFillRatio = _._bgFillRatio;
		_.bgFill = _.params.bgFill;
		_.axis = _.params.axis.toUpperCase();
		_.$relElem = _._relElem;
		_.outStop = _.params.outStop;
		_.scrollMaxPxStop = _.params.scrollMaxPxStop;
		_.initOffsetSet = false;
		_.minWidthIfSet = _.params.minWidth ? _.winWidth > _.params.minWidth : true;
		_.maxWidthIfSet = _.params.maxWidth ? _.winWidth < _.params.maxWidth : true;
		_.effectCleared = false;
	}


	resizeUpdates(){
		const _ = this;
		let resizeThrottle = null;

		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`,function(){
			resizeThrottle = setTimeout(()=>{

				if ( !_.initOffsetSet && _.params.initOffset ) {
					_.$element.css({'transform':''});
				}
				
				_.updatableProps();

			},100);
		});
	}
		
	parallax(_){

		const elemTop = _.$relElem.offset().top;
		const scrollTop = window.pageYOffset;
		const withinMinAndMaxIfSet = (_.minWidthIfSet && _.maxWidthIfSet);

		if( _._isScrolledIntoView(elemTop, scrollTop) && withinMinAndMaxIfSet ){
			
			const speedInZeroInView = (scrollTop + _.winHeight) - elemTop;
			const speed = (speedInZeroInView * _.speed );
			const bgFillRatio = _.bgFillRatio;


			if ( !_.initOffsetSet && _.initiallyInView ) {  
				if( _.params.initOffset ){
				
					_.initOffset = speed - (scrollTop * _.speed);
					_.initOffsetSet = true;
				}
			}

			if (Math.abs(speed) > _.scrollMaxPxStop) return;
			 
			const cssParams = ( _.axis === 'Y' ) ?
				!_.bgFill ?
				{	//don't fill it
					'transform': `translate3d(0,${speed - _.initOffset}px,0)`
				}
				: { //fill the background
					'transform': `translate3d(0,${speed - bgFillRatio}px,0)`,
					'padding-top': `${ bgFillRatio }px`
				}:
				{	//scroll sideways
					'transform': `translate3d(${speed - bgFillRatio}px,0,0)`
				}
			;
				
			_.$element.css(cssParams);

			_.effectCleared = true;
		} else {

			if ( !_.effectCleared ) {

				_.$element.css({
					'transform': '',
					'padding-top': ''
				});

				_.effectCleared = true;
			}
		}
	}


	_isScrolledIntoView(elemTop, scrollTop){
		const _ = this;

		
		const elemBottom = (_.elemHeight * _.outStop) + elemTop;
		const inView = (
			(scrollTop < elemBottom) &&
			(_.winHeight + scrollTop > elemTop)
		);
		
		return inView;
	}

	//getters
	get _bgFillRatio(){
		const _ = this;
		const pad = 2; //buffer for any potential rounding errors
		const speed = _.speed < 0 ? _.speed * -1 : _.speed;
		// console.log('speed',speed,(_.winHeight * speed) + pad)
		return  (_.winHeight * speed) + pad;
	}

	get _speed(){
		const _ = this;
		return _.params.speed / 100;
	}

	get _relElem(){
		const _ = this;

		return  _.params.relativeElem ?
			_.$element.closest(_.params.relativeElem) :
			_.$element
		;
	}

		
}
