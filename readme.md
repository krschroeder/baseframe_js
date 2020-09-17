# Base_Frame Plugins &amp; Common JS

Common/expected/needed/integrated JavaScript functionality for websites. You'll notice a few token are missing (like a carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use those others, they're great. The ones here are configurable, 

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Some nice features are their is some shared syntax in the way they all operate. 

__For Example:__ all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)
```html
    <div id="your-plugin-elem" data-plugin-name="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```

<p><strong>For Example:</strong> all can have their configuration change. Which can come in handy sometimes when things get complex</p>
    
```javascript
    $('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
```

## Example of Importing In
```javascript
//lets bring it all on in
import installStoreToLibrary, {
    libraryExtend,
    Collapse,
    EqualizeContent,
    MarketoForm,
    NavDesktop,
    NavMobile,
    NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs
} from 'base_frame/@plugins';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary();

//perhaps for some reason you don't want to install
//but here we obviously are
libraryExtend([
    Collapse,
    EqualizeContent,
    NavDesktop,
    NavMobile,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs
]); 
```

### libraryExtend
Pass in an `array` for the first argument, and `notify` is optional defaulted to true. `notify` console log's when parameters get updated on an instance.

```javascript
libraryExtend(Array [,notify])
````
Name | Description | Readme
------ | ---- | -----| -------
Collapse | Its basically like an Accordion, but more configurable |  [View](#collapse)
Navigation Desktop | This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. | [View](#nav-desktop)
Navigation Mobile | Neat little mobile navigation plugin | [View](#nav-mobile)
Equalize Content | When Flexbox, or other options won't work, use this to equalize content |  [View](#equalize)
Marketo Form | Have you tried to style a Marketo form? It is a disaster! This should help slimplify the process so you won't pull your hair out. | [View](#marketo-form)
Parallax Background | For making a parallaxing background | [View](#parallax)
Popup | There is like a few dozen of these, right?! Well this is easy to style and configurable. |  [View](#popup)
Responsive Dropdown | Turn your left secondary navigation (or list of options) into a dropdown for mobile!| [View](#responsive-dropdowns)
Tabs | Tabs in tabs, change onhashchange, dream big, become starry-eyed, this does it all :-) | [View](#tabs)


<br>
<br>
<br>
<h2 id="collapse">Collapse</h2>


## Features
This has a move-to-top after open feature, open with location hash, and callbacks after events and such.


## Settings

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
moveToTopOffset | string |  0 |  Should we need to offset the move to the top if the __moveToTopOnOpen__ is set to `true`.
scrollSpeed | number |  100 |  The speed of the scroll if __moveToTopOnOpen__ is set to `true`.
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item. and can pass several as follows `#idOf1#idOf2` but beware if you do one may only open based on settings
useLocationHash | boolean |  true |  Use the `window.location.hash` to open and close the items.
afterOpen | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is opened.
afterClose | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is closed.
afterInit | function |  ($btnElems, $collapsibleItem) => { } | callback function after collapse is initialized.


## Example

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

<br>
<br>
<br>
<h1 id="equalize">Equalize</h1>


## Features
This __equalization script__ will work with any responsive classes your heart desires to use. It will take elements and measure their position top and add them to an array. Then it assigns the tallest height to that row, so they all are sized per row neatly. You can stop it at certain widths, you can start it, and there are other configurable options. If the equalize items are all in one column rows then no heights will be added. Look at the __Settings__ for the rest.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
equalizeItem | string | '.equalize' | The class of the the item to be equalized
startWidth | number | 0 | The width to start the plugin's equalization process
stopWidth | number |  480 | The width in which it stops equalizing. Perhaps you have just one column, your not going to need to equalize anything!
timerDelay | number |  100 | The throttling delay on the resizing of the window/element. May need to be adjusted if other corresponding scripting is going on.
useHeight | boolean |  false | Set to __true__ will use 'height' instead use 'min-height' with css.
useMargin | boolean |  false | Calculates in 'margin' and applies to the height
aligningCss| string |  'flex-l' | This is the class that lines up the containers for equalization. Other classes that do the same thing can be used. That or if you set up an inline-block class as well to line them up.
resizeCss| string |  'in-resize' | Transition effects will destroy equalization in certain scenarios, so this removes the transition while its being resized
fuzzy| number |  1 | The variance it can have so it doesn't need to be exactly aligned per pixel. So if an element is off by 1px it'll still align.


## Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<div class="equalize-container">
	<div class="sm-col-6 md-col-4 lg-col-3" >
		<div class="equalize or-your-equalize-class box">
			<h3>Demand Generation</h3>
			<p> Hileman Group provides holistic demand generation services for our clients, from top-of-the-funnel tactics to nurturing tactics that drive the closing sale.</p>
		</div>
	</div>
	<div class="sm-col-6 md-col-4 lg-col-3" >
		<div class="equalize or-your-equalize-class box">
			&hellip;
		</div>
	</div>
</div>
```

__JavaScript__
```javascript
$('.equalize-container').equalizeContent();
```

<br>
<br>
<br>
<h2 id="marketo-form">Marketo Form</h2>

## About
Scripting that removes the bad things Marketo adds (classes, stylesheets and etc), and allows you to add in classes already written. Utilizes Marketo Forms 2 API. Adds in the Marketo forms 2 API script as well if its not already added, and once loaded it runs the other scripting.

## Features
Makes Marketo Form embeds great again!

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
formID| number | null | Marketo assigns a number for each form in the embed code, needed for embedding
inMarketo| boolean | false | This option should be __true__ if in Marketo, and keeps the 'MktoForms2.loadForm' from trying to load the form. When in Marketo the form will be loaded, we will just want to run the scripting to assist in styling!
account| string | "487-ERY-597"| This is the account number, and it will be available when getting the embed code
loadScript| string|  "//app-ab03.marketo.com"| This should be unique/will vary per Marketo account and can be accessed via the embed code
hideLabels| boolean | false | When set to __true__ labels will be hidden
wrapLabels| boolean | true | When set to __true__ labels for radios and checkboxes will be wrapped in a css class which displays them inline-block. This way the input and label wont separate ever.
wrapperClass| string | 'input-wrap' | the class of the wrapped checkbox/radio label pairings.
removeStyleSheets| boolean | true| The default stylesheets load content that usually makes styling the layout more difficult. But sometimes you may want to leverage the styling that already exists
cols_3| string | 'md-col-4'| The column class names for those with 3 rows in them. Set responsive classes for each breakpoint as it corresponds to the page styling!
cols_2| string | 'sm-col-6'| The column class names for those with 2 rows in them.
cols_1| string | 'col-12'| The column class names for those with 1 rows in them.
inlineFollowUp | string | null | If set to a __string__ it will redirect to the url passed in. Do not set __followUpUrl__ to a string as well (otherwise you'll re-direct)
followUpUrlDelay | number | null | Delay the page will re-direct. Optionally can use the `inlineFollowUp` setting to do this as well if that was needed.
followUpUrl| string | null | If set to a __string__ it'll display this message. The surrounding class for the message is `<span class="mkto-form-followup" />`. you can use custom `html` if necessary, should styling be attached to that element.
whenReady| function | function(){} | Additional function to run other custom scripting when the form is ready (_whenReady event has fired_). No arguments are being passed
afterSuccess| function | function(){} | Additional function to run other custom scripting when the form has submitted (_form.onSuccess_). No arguments are being passed.

## Example

__The following is an example html structure for this plugin:__

__HTML__
```
<div class="some-other-class mkto-something-form">
	<!-- Added via mkto embed-->
</div>
```

__JavaScript__
```javascript
function yourNiftyWhenReadyFn(){
	console.log('the whistles go woot!');
}
jQuery(function($){
	var myMarketoForm = new MyMarketoForm('.mkto-something-form',{
		inlineFollowUp: "Thank You for Subscribing",
		account: "597-BOK-146",
		loadScript: '//app-ab05.marketo.com',
		formID: 1470,
		whenReady: function(){
			yourNiftyWhenReadyFn();
		}
	});
});
```

<br>
<br>
<br>
<h2 id="nav-desktop">Enhance Desktop Navigation</h2>


## Features
This plugin just adds a delay to the desktop navigation and for the nestled levels. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
mobileOff| number | 740 | The width it switches off for mobile navigation
delay| number | 950 | The delay the drop-downs stay put when moused off.
edgeClass| string | 'main-nav-edge' | Class name given to assist in edge positioning of drop-downs so they don't spill over to the right and off the page.
tabAccessible | boolean | true | Makes it possible to tab open dropdown links that are hidden. Works in conjuction with another css class `.focus` which gets added right along side with the `:hover` state class.


## Example

__The following is an example html structure for this plugin:__

```
<nav id="main-nav">
	<ul>
		<li><a href="#">Some Link</a>
			<ul>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
			</ul>
		</li>
	</ul>
</nav>
```

__JavaScript__
```javascript
	jQuery(function($){
		$('#main-nav').enhanceDesktopNav();
	});
```

<br>
<br>
<br>
<h2 id="nav-mobile">Mobile Navigation</h2>


## About
Plugin is strictly for mobile so other plugins can be used for the desktop nav if needed. The clicking action that allows for opening/closing nav item is handled via the visibility of the __'open/close' button__ so the click so no clashing between desktop and mobile happen. Also so CSS can control it tighter as sometimes device width may dictate whether or not you'll see the desktop or mobile view.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
mobileButton | string | '#mobile-nav-btn' | The class or id of the mobile navigation button. __Note:__ the visibility of this button allows the click action of the child `<ul>`'s to function. It's recommended to use pass an 'ID' attribute for this if the default gets changed.
navParent | element | $(element) | Default navigation parent is the __element__ the plugin is attached to.
slideDuration | string | 300 | Duration in time the menu item opens
outerElement | string | 'body' | '.menu-item' class gets added to this element. Use for CSS styling purposes if needed.
outsideClickClose | string | true | Allows for an outside click in the body of the document to close the navigation.
hasULClass | string | 'has-children' | CSS Class name for the `<li>` elements that have children `<ul>`'s in them, and is what the clicking event is delegated to.
menuOpenClass | string | 'menu-opened' | CSS Class that gets added to the `<li>` and the `<body>` tags when and element becomes open.
afterNavItemOpen | string | function(item){} |  Callback function for after a navigation item is opened. The 'item' argument is the jQuery element of the opened navigational item.
afterNavItemClose | string | function(item){} | Callback function for after a navigation item is closed. The 'item' argument is the jQuery element of the closed navigational item.
afterOpen | string | function(item){} | Callback function for opening the whole navigation.
afterClose | string | function(item){} | Callback function for closing the whole navigation.
stopPropagation | boolean | true | To stop the click on the anchor from propagation up

## Example

__The following is an example html structure for this plugin:__

__HTML__
```
<nav id="main-nav">
	<button id="mobile-nav-btn">
		<div id="mobile-nav-btn-inner">
			<div class="nav-top-bar"></div>
			<div class="nav-mid-bar"></div>
			<div class="nav-bot-bar"></div>
		</div>
	</button>
	<ul>
		<li><a href="#">Some Link</a>
			<ul>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
			</ul>
		</li>
	</ul>
</nav>
```

__JavaScript__
```javascript
	jQuery(function($){
		$('#main-nav')
			.mobileNavigation()
			.enhanceDesktopNav();//<--may be used in conjunction with other plugins
	});
```

<br>
<br>
<br>
<h2 id="parallax">Parallax</h2>


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

<br>
<br>
<br>
<h2 id="popup">Pop-Up</h2>


## Features
Good for loading a Popup (duh). Pretty light-weight for what it does and has all the configurable options you should need. Simple CSS styling and all that fun stuff.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
popupID| boolean |  'popup_' + generateGUID() | ID for the popup. Good idea to set one if loading from a hash, else its dynamically generated
src | string | src | Can be a CSS selector `.your-popup-content` or `#yeah-your-content` or `<h2>Yeah Your Popup Content</h2><p>etc...</p>` and `https://placekitten.com/900/1200?ext=.jpg`. 
popupOuterClass| string |  "" | CSS class name to add to the outer element of the popup.
title | string |  `$(element).data('popup-title') || $(element).attr('title') || ''` | Title to get added above to the content. Looks for that in that order specified in the default, if not overridden.
titleElem |string |  'h3' | The element of the title
titleCss| string |  '' | A CSS class for that above title
caption| string |  `$(element).data('popup-caption') || ''` | Text below the main content
clickOutsideClose| boolean |  true | closes if the popup is clicked outside of the box
fadeOut| number |  500 | Time to fade-out the popup, CSS transition should correspond.
fadeIn| number |  400 |  Time to fade-in the popup, CSS transition should correspond.
zIndex | number |  2000 | CSS z-index of the popup
vhDivisor| number | 2 | The division of the height of the popup and how it displays on the page. So, '2' means we divide it in half, and it displays in the center. '1' is not at all, and '0'. It takes any number really, and there is a use-case for this, that I can't remember exactly right now.
firstAnchorFocus| boolean |  true | Focus's back on the anchor or element after the popup closes
setTopPosition| number |  null | Sometimes we just may manually want to tell the vertical position of the popup.
isImage| boolean |  false | While there is a process using a regex and other parameters sometime we may just want to specify in the config.
isJsArray| boolean |  false | text
escapeClose| boolean |  true | text
group| boolean |  true | text
showGroupAmount| boolean |  true | text
groupOfHTML| boolean |  '/' | text
launch| boolean |  false | text
photoRegex| regexp |  I'll explain | If it ends in `gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg` or has a querystring parameter of `?image=jpg` or `?ext=someimageformattoo` then it'll know it's an image.
closeText| boolean |  `<i class="icon-close"><span class="sr-only">Close</span></i>` | Close html/text.
prevBtnContent| boolean |  `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>` | Previous Button html/text.
nextBtnContent| boolean |  `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>` | Next Button html/text.
loadingHTML| boolean |  `<div class="popup__loader"></div>` | Loading HTML.
appendPopupTo| boolean |  'body' | the HTML element the popup appends to.
showPopup| boolean |  'popup--show-popup' | CSS class used to show the popup.
enableEvent| boolean |  'click' | The event to show the popup, change to whatever event on the element. Could be 'hover' if we wanted to for some reason.
loadLocationHash| boolean |  true | Loads a popup from a `window.location.hash`, if the hash matches the popup.
useLocationHash| boolean |  true | Uses history and creates a hash in the location to toggle the popups on or off
afterLoaded| function |  () => { } | Function to run after the popup is displayed.
afterClose| function |  () => { } | Function to run after the popup is closed.
onClose| function |  () => { } | Function to run after the popup at the begninning of the closing event.

## Example

__The following is an example html structure for this plugin:__

```
<div class="container" style="min-height: 1000px">
	<div id="popup-content">
		<h1>Pop-up</h1>
		<p>This is for a basic popup content</p>
		<p>Cum sociis natoque penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi senatus locus, nihil horum?</p>
	</div>
	<a href="#" id="launch-popup-jq" class="button">Launch jQuery Popup</a>
	<a href="#" id="launch-popup-jq2" class="button">Launch jQuery Popup (remove)</a>
</div>
```

### Browse a JS Array of Images ###
Instead of combing the DOM for elements, comb an JS array that maybe gets compiled from some JSON array. Structure it like the following:
```javascript
var jsArray = [
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x500",
		title:"A JS Object Title 600x500",
		alt: "600x500 alt text"
	},
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x400",
		title:"A JS Object Title 600x400"
	},
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x300",
		title:"A JS Object Title 600x300"
	}
];
```


__JavaScript__
```javascript
	//examples of using it differently

	//getting contents from a page element
	$('#launch-popup-jq2').popup({
		contents: $('#popup-content'),
		popupID: 'my-popup-jq2',
		directionX: 'LEFT'
	});

	//getting contents from a group of pics
	$('.pic-group').popup({
		inline:true,
		contents: '.pic-group',
		title:'How About That',
		afterLoaded: (el,id)=>{console.log('yeah loaded', el,id)}
	});

	//getting imagery to generate from an array
	$('.js-object-group').popup({
		array:true,
		contents: jsArray,
		title:'How About That'
	});
```

<br>
<br>
<br>
<h2 id="responsive-dropdown">Responsive Navigation to Dropdown</h2>

## What is it!?
This is a plugin that will take a side-navigation element and turn it into a dropdown for mobile. Its a common thing that I've come across that the mobile needs to turn into a dropdown so hence this plugin!

## Features
There is a close button that you can add to the bottom if you'd like. Outside click support, so you can close not clicking the header or the (optional) close button.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
clickHeader| string |  '.resp-nav-header' | Class name added for the header that is used for targeting the header
toggleBody| string |  '.resp-nav-dd-body' | Class name added for the body that is used for targeting the body
openHeaderClass| string |  'resp-dd-active' | The active class name used when the dropdown has been opened
inMobileClass| string |  'resp-dd-in-mobile' | The class used for styling the element into a dropdown. It gets added via the 'mobileBreak' setting, so this can be set dynamically per need.
closeBtnBottom| boolean |  true | This adds a close button to the bottom of the dropdown so if the user scrolls a bit they know they can click it to close.
closeBtnText| string |  'Close' | The text for the close button appended to the bottom (if it has been added).
closeBtnClass| string |  '' | Additional class to add to the button (if it has been added).
toggleAmount| number |  600 | The time spend sliding up and down
mobileBreak| number |  768 | The default breakpoint the side-nav/element turns to a dropdown.

## Example

__The following is an example html structure for this plugin:__

Use the __.resp-nav-mobile-dd__ to get the whole thing working.

__HTML__
```
<div class="resp-nav-mobile-dd">
	<div class="resp-nav-header">
		<strong class="inline-block">Title For Dropdown</strong>
		<i class="ico-down-arrow"><span class="sr-only">Down Arrow</span></i>
	</div>
	<div class="resp-nav-dd-body">
		&hellip; body contents to show.
	</div>
</div>
```

__JavaScript__
```javascript
jQuery(function($){
	$('.resp-nav-mobile-dd').responsiveDropDown(/*{config options}*/);
});
```

<br>
<br>
<br>
<h2 id="tabs">Tabs Plugin About</h2>

At some point we all need to be able to tab content. This one does it for you!

## Features
- Tabs within tabs, so tabs can be added inside other tabs if needed (which it will at some point),
- hash to load not only a tab, but tabs in tabs as well!
	- i.e.: add this to the location `#description#files-inner`
	- or to load just a tab then `#description`

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
defaultContent | Boolean / String | 0 | The order of the list item selected. Goes of course their appearance in the DOM.
tabsEvent | string | 'click' | Event to change the tabs content
activeCls | string | 'tab--active' | The 'active' CSS class that is added to the tabs list on the `<li>` element.
tabsBodyCls | string | 'tabs__body' | The CSS class for the body element in which all the tab content resides.
tabsBodyItemCls | string | 'tabs__body-item' | The CSS class for the tab content within the 'tabs body'.
tabsBodyItemShowCls | string | 'tabs__body-item--show' | The CSS class added to the 'tabs body item' to show it.
tabsHeadCls | string | 'tabs__nav' | The CSS class for the tabs navigation, added to the `<ul>` or its parent element.
useLocationHash | boolean | true | Use window location hash and history push state so the browser back button can be used (or forward as well) to toggle through tabs.
loadLocationHash | boolean | true | Add in location hash parameters to load default tabs. `#files#files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
beforeChange | function | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
afterChange | function | () => {}  | Function to run after the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | function | () => {} | Function to run after the the plugin intializes, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.


## Example

__The following is an example html structure for this plugin:__

#### How to structure the HTML
- `.tabs-container` class must be added to surrounding all elements
- `.tabs__nav` class added outside of the `<ul>`
- Each `<a>` in the `.tabs__nav` navigation should have the `id` of the tabbed content in its `href` attribute
- `.tabs__body` class added to the tab body of the content to be toggled
- Each toggleable element should have the `data-tab-id="tab-identifier"` on it and this way the navigation knows what to tab.


__HTML__
```
<div class="tab__container">
	<div class="inline-ul tabs__nav" role="menubar">
		<ul>
			<li><a href="#description"><span>Description</span></a></li>
			<li><a href="#files"><span>Files</span></a></li>
			<li><a href="#requirements"><span>Requirements</span></a></li>
			<li><a href="#instructions"><span>Instructions</span></a></li>
		</ul>
	</div>
	<div class="tabs__body">
		<div class="tabs__body-item" data-tab-id="description">
			Description Text...
		</div>
		<div class="tabs__body-item" data-tab-id="files">
			Files Text...
		</div>
		<div class="tabs__body-item" data-tab-id="requirements">
			Requirements Text...
		</div>
		<div class="tabs__body-item" data-tab-id="instructions">
			Instructions Text...

			<div class="tabs__container">
				<div class="inline-ul tabs__nav" role="menubar">
					<ul>
						<li><a href="#description"><span>Description Nestled</span></a></li>
						<li><a href="#files"><span>Files Nestled</span></a></li>
					</ul>
				</div>
				<div class="tabs__body">
					<!-- html goes here... -->
				</div>
			</div>
		</div>
	</div>
</div>


</div>
```

__JavaScript__
```javascript
$(() => {
	$(".tabs__container").tabs({
		onInit: (tab,list,body) =>{
			/onsole.log('init',tab,list,body)
		},
		beforeChange: (tab,list,body) =>{
			console.log('before',tab,list,body)
		},
		afterChange: (tab,list,body) =>{
			console.log('after',tab,list,body)
		}
	});
});
```
