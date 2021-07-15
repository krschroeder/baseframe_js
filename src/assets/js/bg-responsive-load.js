
import { isVisible } from './util/helpers';

const defaults = {
	delay: 200,
	eventName: 'BackgroundImageLoad',
	bgDataName: 'bg-img'
};

const bgResponsiveLoad = (bgElem = '.bg-responsive', options ) => {

	const _ = this;
	const params = $.extend(defaults,options);
	const { eventName, delay } = params;
	let resizeThrottle = null;

	$(window).on(`resize.${eventName}`, () => {
		resizeThrottle && clearTimeout(resizeThrottle);

		resizeThrottle = setTimeout(loadVisibleImageElem, delay, bgElem, params);
	});

	loadVisibleImageElem(bgElem, params);

}

function loadVisibleImageElem(bgElem, params) {

	const { eventName, bgDataName } = params;

	$(bgElem).each(function () {
		const $this = $(this);
		const bgImg = $this.data(bgDataName);

		if (isVisible(this) && bgImg) {
			$this.css({
				'background-image': `url("${bgImg}")`
			});

			$this.removeAttr('data-bg-img');
		}
	});

	if (!$(`${bgElem}[data-${bgDataName}]`).length) {
		$(window).off(`resize.${eventName}`);
	}

}

export default bgResponsiveLoad;