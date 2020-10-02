<h2 id="collapse">Collapse</h2>


### Features
This has a move-to-top after open feature, open with location hash, and callbacks after events and such.


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
elemsItem | string |  '.collapse__item' |   CSS class name for the entire item.
elemsBtn | string |  '.collapse__btn' |   CSS class name for the button on which the click event occurs
elemsBody | string |  '.collapse__body' |  CSS class name for the element to be collapsed
openCss | string |  'collapse--open' |  CSS class name for an opened element, attaches to click item and the body of the collapse item.
togglingCss | string |  'collapse--toggling' |  CSS class name for a toggling element.
openingCss | string |  'collapse--opening' |  CSS class name for opening an element.
closingCss | string |  'collapse--closing' |  CSS class name for closing an element.
openNoAnimateCss | string |  'collapse--no-animate' |  CSS rule to kill the transition, which gets set only when its loaded from a hash.
toggleClickBindOn | string |  'group' |  Attaches the click to the selector or `$('.your-selector').colla...`, other option is __'body'__ and it'll then be set on the body. Can come in handy, I had a use-case for it, forgot exactly why.
toggleDuration | number |  500 |  The speed at which the items will open, should pair with CSS transition settings.
toggleGroup | boolean |  false |  More or less toggles the other opened element(s) closed, and make it behave like an accordion.
moveToTopOnOpen | boolean |  false |  After the element is opened, the item will move to the top of it. Good for mobile.
moveToTopOffset | number |  0 |  Should we need to offset the move to the top if the __moveToTopOnOpen__ is set to `true`.
scrollSpeed | number |  100 |  The speed of the scroll if __moveToTopOnOpen__ is set to `true`.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'collapse' and it'll load and filter through as needed while maintaining the remaining location hash values. this only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean |  true |  Use the `window.location.hash` to open and close the items.
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item. and can pass several as follows `#idOf1#idOf2` but beware if you do one may only open based on settings
afterOpen | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is opened.
afterClose | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is closed.
afterInit | function |  ($btnElems, $collapsibleItem) => { } | callback function after collapse is initialized.


### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<div class="md-col-6 center collapse collapse-group" >
<div class="collapse__item">
	<div class="collapse__header">
		<h2><a href="#item-1" class="collapse__btn" role="button" aria-expanded="false" aria-controls="item-1"
		>Item 1</a></h2>
	</div>
	<div class="collapse__body" id="item-1">
		<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
		<a href="#item-3" class="collapse-btn" role="button" aria-expanded="false" aria-controls="item-3"
		><strong>Open Item 3 from here!</strong></a>
	</div>
</div>
<div class="collapse__item">
	<div class="collapse__header">
		<h2><a href="#item-2" class="collapse__btn" role="button" aria-expanded="false" aria-controls="item-2"
		>Item 2</a></h2>
	</div>
	<div class="collapse__body" id="item-2">
		<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>

		<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
	</div>
</div>
<div class="collapse__item">
	<div class="collapse__header">
		<h2><a href="#item-3" class="collapse__btn" role="button" aria-expanded="false" aria-controls="item-3"
		>Item 3</a></h2>
	</div>
	<div class="collapse__body" id="item-3">
		<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
	</div>
</div>
</div> 
```

__JavaScript__
```javascript
$('.collapse-group').collapse();
```
