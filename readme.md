# Base_Frame Plugins

It's nearly inevitable your website will need these plugin's and JS functionality for it to work. You'll notice some are missing (like a Carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use those others, they're great. Others I always thought could be better, even though a few are frankly near duplicates 🤷🏻‍♂️. Anyways here we are, and you're stil reading this! If you download you probably work where I do, or somehow stumbled across.

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash in its own terms is 'Cash is an absurdly small jQuery alternative for modern browsers (IE11+) that provides jQuery-style syntax for manipulating the DOM'. In my opinion, having a DOM traversing Library is essential. While it adds code to the page, saves you the hassle of writing extra. Also, everybody who's done any web developement is familiar with jQuery syntax. But the weight of it is a little too much if you ask me, so instead we use __Cash__.

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
 

Name | Description | jQuery Slim | Readme
------ | ---- | -----| -------
Collapse | Its basically like an Accordion, but more configurable | Yes | [View](#collapse)
Navigation Desktop | This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. | Yes | [View](#nav-desktop)
Navigation Mobile | Neat little mobile navigation plugin | No | [View](#nav-mobile)
Equalize Content | When Flexbox, or other options won't work, use this to equalize content | Yes | [View](#equalize)
Marketo Form | Have you tried to style a Marketo form? It's a disaster! This should help slimplify the process so you won't pull your hair out. | Yes | [View](./src/marketo-form-magic/readme.md)
Parallax Background | For making a parallaxing background | Yes | [View](./src/parallax-bg/readme.md)
Popup | There's like a few dozen of these, right?! Well this is easy to style and configurable. | Yes | [View](./src/popup/readme.md)
Responsive Dropdown | Turn your left secondary navigation (or list of options) into a dropdown for mobile! | No | [View](./src/responsive-dropdown/readme.md)
Tabs | Tabs in tabs, change onhashchange, dream big, become starry-eyed, this does it all :-) | Yes | [View](#tabs)
Slider | Just kidding, use this [one](https://kenwheeler.github.io/slick/).. its pretty cool | No |[View](https://kenwheeler.github.io/slick/)


<br>
<br>
<br>
----
<h1 id="tabs">Tabs Plugin About</h1>

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

<br>
<br>
<br>
----
<h1 id="equalize">Equalize</h1>


## Features
This __equalization script__ will work with any responsive classes your heart desires to use. It will take elements and measure their position top and add them to an array. Then it assigns the tallest height to that row, so they all are sized per row neatly. You can stop it at certain widths, you can start it, and there are other configurable options. If the equalize items are all in one column rows then no heights will be added. Look at the __Settings__ for the rest.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
equalizeItem | string | '.equalize' | The class of the the item to be equalized
startWidth | number |  null | The width to start the plugin's equalization process
stopWidth | number |  480 | The width in which it stops equalizing. Perhaps you have just one column, your not going to need to equalize anything!
timerDelay | number |  100 | The throttling delay on the resizing of the window/element. May need to be adjusted if other corresponding scripting is going on.
useHeight | boolean |  false | Set to __true__ will use 'height' instead use 'min-height' with css.
useMargin | boolean |  false | Calculates in 'margin' and applies to the height
aligningCss| string |  'flex-left' | This is the class that lines up the containers for equalization. Other classes that do the same thing can be used. That or if you set up an inline-block class as well to line them up.
resizeCss| string |  'in-resize' | Transition effects will destroy equalization in certain scenarios, so this removes the transition while its being resized
fuzzy| number |  1 | The variance it can have so it doesn't need to be exactly aligned per pixel. So if an element is off by 1px it'll still align.

## Example

__The following is an example html structure for this plugin:__

__HTML__
```
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
jQuery(function($){
	$('.equalize-container').equalizeContent(/*{config options}*/);
});
```
