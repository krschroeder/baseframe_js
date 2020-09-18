<h2 id="parallax">Parallax</h2>


### Features
By default it allows you to move the background image. Also can move an element itself. It uses the `translate3d` property as its more efficient than using a `top` or `left`.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
speed | number | 7 | Speed of the scroll. A negative amount will move it in the opposite direction.
axis | string | 'y' | Axis of movement, it can be 'y','Y','x', or 'X' and is the axis in which the element moves.
relativeElem | boolean/HTMLElement/string | false | If you need to set the parallaxing of one element relative to the offset it's parent. Parent which needs to be specified, in a classname or HTML element.
$heightElem | HTMLElement | $(element) | the class or the element of the primary element to base the height off of.
initOffset | boolean | false | If parallaxing an element, it'll account for the position and adjust it back to its start as it would be positioned without the plugin.
bgFill | boolean| false | If it's a background image, this adds extra height to ensure it fills the area.
outStop | number | 1 | 1 = 100% of the height of the element. 0.5 = 50%, etc. If it's set to .5, the element will stop parallaxing if 50% of the element has left the viewport, instead of the 100% by default.
minWidth | number | null | The minimum width for the parallax effect to run.
maxWidth | number | null | The maximum width for the parallax effect to run.
scrollMaxPxStop | number | 5000 | max an item can scroll. Make this less should you want it to stop prior to exiting the screen. Good for when you have content that it shouldn't overlap.

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<div class="container v-space">
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed:-10, initOffset:true, bgFill: false, scrollMaxPxStop: 120}">
			<img src="https://placehold.it/768x768/565656" alt="Placeholder" />
		</div>
	</div>
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed:10, initOffset:true, bgFill: false, scrollMaxPxStop: 120}">
			<img src="https://placehold.it/768x768/444" alt="Placeholder" />
		</div>
	</div>
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed:30, initOffset:true, bgFill: false, scrollMaxPxStop: 220, axis: 'x'}">
			<img src="https://placehold.it/768x768/222" alt="Placeholder" />
		</div>
	</div>
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed:-10, initOffset:true, bgFill: false, scrollMaxPxStop: 120}">
			<img src="https://placehold.it/768x768" alt="Placeholder" />
		</div>
	</div>
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed: -20, initOffset:true, bgFill: false, scrollMaxPxStop: 180}">
			<img src="https://placehold.it/768x768/777" alt="Placeholder" />
		</div>
	</div>
	<div class="relative md-wide-4">
		<div class="parallax-bg" data-parallax-options="{speed:-20, initOffset:true, bgFill: false, axis: 'x'}">
			<img src="https://placehold.it/768x768/999" alt="Placeholder" />
		</div>
	</div>
</div>
```

```javascript
$('.parallax-bg').parallax({
	speed:10,
	axis: 'y'
});
```
