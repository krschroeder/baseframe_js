import isVisible from './util/helpers';

const defaults = {
	delay: 200,
	eventName: 'BackgroundImageLoad'
};

const bgResponsiveLoad = (bgElem = '.bg-responsive', options = defaults ) => {

	const _ = this;
	const {eventName, delay} = options;
	let resizeThrottle = null;

	$(window).on(`resize.${eventName}`, () => {
		resizeThrottle && clearTimeout(resizeThrottle);

		resizeThrottle = setTimeout(loadVisibleImageElem, delay, bgElem);
	});

	loadVisibleImageElem(bgElem);

}

function loadVisibleImageElem(bgElem) {
	$(bgElem).each(function () {
		const $this = $(this);
		const bgImg = $this.data('bg-img');

		if (isVisible(this) && bgImg) {
			$this.css({
				'background-image': `url("${bgImg}")`
			});
		}
	});
}

export default bgResponsiveLoad;