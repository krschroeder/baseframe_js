# Collapse


## Features
This is designed be a replacement for the accordion plugin/alternative. Modeled a bit more after the (you guessed it) the bootstrap equivalent.


## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
elems | Object| `{group: '.collapse-group',item:'.collapse-item',btn: '.collapse-btn',header: '.collapse-header',body: '.collapse-body'}`| Class Names of the elements that comprise the collapsible toggleItems
openClass | string |  'collapse-open' | Name of the open class
togglingClass | string | 'collapse-toggling' | Name of the class added when its toggling open or closed
toggleOnHash | boolean | false | On hashchange you can toggle the accordions. May clash with other plugin's so off by default.
toggleClickBindOn | string |  'group' | use: 'group' or 'body'. The idea is that its not querying the entire body rather a group if the collapsible items are in a group&hellip; which I would imagine would be a little faster depending on the rest of the content.
toggleGroupDuration | number |  500 | Duration of the animation while its opening
toggleGroup | boolean | false | Enabling this to true, when the collapsible items are set in a 'group' will act like an accordion and close the other items in that group that are open.
moveToTopOnOpen| boolean | false | Moves the item to the top after it opens (comes in handy sometimes)
moveToTopOffset| number | 0 | If there is a sticky header and the 'moveToTopOnOpen' is set to `true` then this will account for that overlapping space
moveToTopDivisor | number | 12 | Divisor of the moving to the top after the item is open, if the 'moveToTopOnOpen' is set to `true`
afterOpen| function |  function(toggleElement){}| function to run after a collapsible item is open
afterClose| function |  function(toggleElement){}| function to run after a collapsible item is (you guessed it) closed.
afterInit| function |  function(){}| function to run after the initializing of the plugin.


## Example

__The following is an example html structure for this plugin:__

```
<div class="md-col-6 center collapse-group" data-collapse-options="{togglingClass:'whattt-toggling'}">
	<div class="collapse-item">
		<div class="collapse-header">
			<h2><a href="#item-1" class="collapse-btn" role="button" aria-expanded="false" aria-controls="item-1"
			>Item 1</a></h2>
		</div>
		<div class="collapse-body" id="item-1">
			<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
			<a href="#item-3" class="collapse-btn" role="button" aria-expanded="false" aria-controls="item-3"
			><strong>Open Item 3 from here!</strong></a>
		</div>
	</div>
	<div class="collapse-item">
		<div class="collapse-header">
			<h2><a href="#item-2" class="collapse-btn" role="button" aria-expanded="false" aria-controls="item-2"
			>Item 2</a></h2>
		</div>
		<div class="collapse-body" id="item-2">
			<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
		</div>
	</div>
	<div class="collapse-item">
		<div class="collapse-header">
			<h2><a href="#item-3" class="collapse-btn" role="button" aria-expanded="false" aria-controls="item-3"
			>Item 3</a></h2>
		</div>
		<div class="collapse-body" id="item-3">
			<p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
		</div>
	</div>
</div><!--end group-->
```

__JavaScript__
```javascript
	jQuery(function($){
		$('#main-nav').collapse();
	});
```
