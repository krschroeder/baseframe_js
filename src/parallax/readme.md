# Parallax Background


## Features
By default it allows you to move the background image. Also can move an element itself. It uses the `translate3d` property as its more efficient than using a `top` or `left`.

## Settings

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
maxWidth | number | nul | The maximum width for the parallax effect to run.
## Example

__The following structure should be used with this plugin:__

__HTML__
```
<div class="background-area flex-m">

	<div class="background-area-bg desktop-bg md-up-show parallax-bg"
		style="background-image: url('https://placehold.it/1920x760')"
	></div>

	<div class="background-area-bg mobile-bg md-up-hide"
		style="background-image: url('https://placehold.it/768x768')"
	></div>

	<div class="container">
		<div class="row v-pad">
			<div class="col-12 text-c">
				<p>Phasellus laoreet lorem vel dolor tempus vehicula. Tu quoque, Brute, fili mi, nihil timor populi, nihil! Pellentesque habitant morbi tristique senectus et netus.</p>
			</div>
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
