# Base_Frame Plugins &amp; Functions

A suite of useful Javascript plugins and functions to help with Front-end Development on websites. The scripting features plugins for collapsible sections, popups, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling (without jQuery), throttled resizing, querystring parameter filtering and more. The plugin's are configurable and consistent. This scripting is designed to be imported in easily so you can start building!

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features
### It's small!
Combined all together its ~ 61k. Add that with Cash and its less than jQuery alone!

### Pass in parameter options with a `data-` attribute
The data attribute is always the `data-` (of course) and then the plugin name `pluginName` followed by `-options`.

__For Example:__ all have options that can be plugged in as a data attribute, in object literal format.

```html
<div id="your-plugin-elem" data-pluginName-options="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```
### Update Parameters After Init!
__For Example:__ all can have their configuration change when added into `$.fn`. Which can come in handy sometimes when things get complex. Could come in handy for instance when you have an accordion (or collapsible section) and on mobile you want it to scroll to the top on open (that plugin does that!), but not on desktop. This works for the vast majority of params, but not all FYI. For example, I can specify a 'click' event and that can only be set on 'init'. Perhaps I'll document this later on though.
    
```javascript
$('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
```

### Callbacks after events

Lots of callback functions to run after and before events and such that may help you out when you need it most.

### It works in IE11
These scripts all work back to IE11. One day in the future perhaps we can drop that support. Tried to avoid scripting that needs polyfills, or looks ugly compiled into ES5.  


## Example Script of Importing Everything In
```javascript
//lets bring it all on in
import installStoreToLibrary, {
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    MarketoForm,
    NavDesktop,
    NavMobile,
    NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs,
    bgResponsiveLoad,
    cookies,
    formInputs,
    smoothScroll,
    throttledResize
} from 'baseframe-js';

// or ES6 non-transpiled
import installStoreToLibrary, {
    libraryExtend,
    AccessibleMenu,
    // ... 
} from 'baseframe-js/all-es6';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
//NOTE: this can be ignored if using jQuery, and it'll fallback to its 
// $.fn.data method to store instances and their params.
installStoreToLibrary(true);

//perhaps for some reason you don't want to install
//but here we obviously are
libraryExtend([
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs
]); 
```

## Using Styles For Plugins
Styles are located in the `src/assets/scss/` directory and all can be grabbed that way and added on in. Still should do a little more work in updating the SCSS variables to be frank. So I would just drag those files into the project directly (which is what I just do). I think it's painful anways to import in then override defaults in your own file. Bringing it in (IMO) is little more elegant.


## Plugin Names and What They Do.

### Accessible Menu
Adds tabbing, allows the use of arrows for toggling around the navigation, which is configurable depending on the menu design. The use of the escape key to go up a level.
__[View](#accessible-menu-plugin)__

### Collapse 
It's is for toggling collapsible sections. Can be used like an accordion and etc. 
__[View](#collapse-plugin)__

### Equalize Content
When Flexbox, or other options won&rsquo;t work, use this to equalize content 
__[View](#equalize-plugin)__

### Lazy Load
Load background images and images lazily once they appear in the viewport! Also, run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` and magically polyfills for IE11. 
__[View](#plugin-lazy-load)__

### Navigation Desktop
This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. 
__[View](#nav-desktop-plugin)__

### Navigation Mobile
Neat little mobile navigation plugin 
__[View](#nav-mobile-plugin)__

### Parallax Elements
For making a parallaxing elements on the page. Lots of configurable options.
__[View](#parallax-plugin)__

### Popup
There is like a few dozen of these, right?! Well this is easy to style and configurable. Also, tons of options, from loading in images, to traversing a JavaScript Array (instead of the DOM), which can come from an AJAX request (which that'd be a separate bit of code, but you get the idea). Load on location.hash etc.
__[View](#popup-plugin)__

### Responsive Dropdown
Turn your left secondary navigation (or list of options) into a dropdown for mobile!
__[View](#responsive-dropdown-plugin)__

### Tabs
Tabs in tabs, change onhashchange this does it for tabs!
__[View](#tabs-plugin)__
<br>
<br>

------

### Class Set-up for using `LibraryExtend` ###

Each class just needs to have the following properties set on it

```javascript
    class YourClass {
       static get version() {
            return VERSION;
        }

        static get pluginName() {
            //Data Name is `YourClass`
            return DATA_NAME;
        }
        
        constructor(element, options, index){
            //... your constructor
        }
    }

```

------

### Essential Functions ###

#### libraryExtend ####
First parameter can be one Plugin, or an array of them. Pass in the second param which will notify the user of updated parameters (good for development).

```javascript
libraryExtend(plugins:Array<Plugin> | Plugin, notify?:boolean)
```


#### installStoreToLibrary ####
If using **Cash** and installing plugins into the library, this function needs to be run to install `$.store`, which is used internally on all the plugins. If using **jQuery** this can be ignored as it'll use `$.fn.data` to store instances of plugins and their parameters.
Pass in the first attribute to add in the `expose` method, which allows you to see all the data stored in the Map.

```javascript
installStoreToLibrary(expose?:boolean) 
```

#### $.store ####

Inside the `$.store` method is the following structure. The first parameter can be an `HTMLElement` or a `$(HTMLElement)`. The second parameter is a `string` and is the identifier on on which the data is stored. Multiple properties can be stored on the same element. In the plugin's the instance (`PluginName_instance`) is saved, as well as the instance paremeters (`PluginName_params`). 

```javascript
const Store = {
	set(element, keyStore, data) {
		mapData.set(element, keyStore, data)
	},
	get(element, keyStore) {
		return mapData.get(element, keyStore)
	},
	remove(element, keyStore) {
		mapData.delete(element, keyStore)
    },
    //console logs the all the data stored in the Map
    //which could be helpful if developing.
    //only added if the first parameter is set to true in the function
	expose(){
		mapData.expose()
	}
};
```

### Functions


#### bgResponsiveLoad

This plugin simply loads an background image of a specified element, if it's visible. This function exists because most browsers load an image (even a background one) even if the element isn't visible. The event removes itself if nothing is left to load.


__params__
Option |  Default | Description
------ | ------- | -----
delay | 200 | Time delay in which the function will run after the resize event.
eventName | 'BackgroundImageLoad' | Event namespace of the load event.
bgDataName | 'bg-img' | The data attribute name that holds the background image to load.

```javascript
bgResponsiveLoad(selector: string | HTMLElement, params?:any );
```

#### formInputs
formInputs function currently adds in space-bar support for radio buttons, and checkbox inputs. As long as there is a `for` attribute on a `<label>` that maps to an input.

```javascript
formInputs.init();
```

#### smoothScroll

First parameter is the HTMLElement's top to scroll to position top, the second is the speed. Default speed is 100. This uses the `window.scroll` so should work cross-browser. This stops scrolling if the previous pixel is the same as the next, if the scroll tries to get broken, or if it can't scroll to anymore. Third argument is a callback function to run after the scrolling is done. The 4th parameter is the arguments for that function if necessary.

```javascript
smoothScroll(scrollToTop :number ,speed?: number , afterScroll?:Function, afterScrollArgs?:Array<any>);
```

#### cookies

Getting and setting cookies made easy!

 
__params__
Option |  Description
------ | -------
path | path to the cookie, default is the current `location.pathname`.
expires | set in minutes. Time the cookie will expire.
secure | if it can only be accessed via https. This gets set automatically when `sameSite` is set to `None`.
sameSite | `Lax`, `Strict` or `None` are the options.


```javascript
//setting a cookie
cookies.set('cookieName','your cookie value',{path:'/',expires: 60, secure: true, sameSite: 'Lax'});

//getting a cookie
cookies.get('cookieName',{path: '/'});

//removing a cookie
cookies.remove('cookieName',{path:'/path/to-your/cookie'});

//maybe you want to extend $ ?
$.extend({cookies: cookies});
```


#### getHashParam
Searches for a query-string value using `location.hash`.

```javascript
getHashParam(search:string)
```

#### getUrlParam
Searches for a query-string value using `location.search`, pass in an optional second parameter to search another string for key-pair values.

```javascript
getUrlParam(search:string ,searchString?:string)
```
<br>
<br>
<br>
<h2 id="accessible-menu-plugin">Accessible Menu</h2>


### Features
This plugin allows a user to use the keyboard arrows to navigate a desktop navigation, and are configurable depending on the design. It also allows the use of the escape key to go up a level in the navigation.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
keyDirections | array | ['horizontal', 'vertical', 'vertical'] | The direction in which the menu appears. For example, 'horizontal' means the `<li>` elements are going across the page. The next in the array is 'vertical', which means they're stacked. Typically if a third level exists they're also vertical as well.
focusCss | string | 'focus' | the focus class that allows the menu to appear as being active


### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<nav id="main-menu">
    <ul>
        <li><a href="#level-1-link">Level 1 Link</a></li>
        <li><a href="#level-1-link">Level 1 Link</a>
            <ul>
                <li><a href="#level-2-link">Level 2 Link</a></li>
                <li><a href="#level-2-link">Level 2 Link</a></li>
            </ul>
        </li>		
        <li><a href="#healthy-choice">Level 1 Link</a></li>		
            <ul>
                <li><a href="#level-2-link">Level 2 Link</a></li>
                <li><a href="#level-2-link">Level 2 Link</a></li>
                <li><a href="#level-2-link">Level 2 Link</a></li>
            </ul>
        </li>	
    </ul>
</nav>
```

```javascript
$('#main-menu').accessibleMenu({
	keyDirections: ['horizontal', 'vertical', 'vertical'],
	focusCss: 'focus'
});
```

<br>
<br>
<br>
<h2 id="collapse-plugin">Collapse</h2>


### Features
This has a move-to-top after open feature, open with location hash, and callbacks after events and such.
- hash to load not only a collapsible element, but multiple.
	- i.e.: add this to the location `#collapsible-elem` open multipe with an '=' sign so `#cool-collapsible=cooler-collapsible`, or run with a filter as well so it can work in conjuction with other plugin's that use a hash. See 'useHashFilter' option below.

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
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item. and can pass several as follows `#idOf1=idOf2` but beware if you do one may only open based on settings.
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

<br>
<br>
<br>
<h2 id="equalize-plugin">Equalize</h2>


### Features
This __equalization script__ will work with any responsive classes your heart desires to use. It will take elements and measure their position top and add them to an array. Then it assigns the tallest height to that row, so they all are sized per row neatly. You can stop it at certain widths, you can start it, and there are other configurable options. If the equalize items are all in one column rows then no heights will be added. Look at the __Settings__ for the rest.

### Settings

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


### Example

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
<h2 id="plugin-lazy-load">Lazy Load</h2>

Load background images and images lazily once they appear in the viewport! Also, run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` and magically polyfills for IE11. 


Option | Type | Default | Description
------ | ---- | ------- | -----------
imgSrcName | string | 'src' | Name of the data attribute to load an image source. For example `<img src="cleardot.gif" data-src="your-lazy-image.jpg">`.
bgSrcName | string | 'bgSrc' | Name of the data attribute to load a background image. Use camel casing when changing.
loadImgs | boolean | true | Load images and background images. Built-in function for this since its the core intended functionality.
inEvt | Function | null | Custom function that hooks into the element appearing on screen. the `lazyElem` is the only parameter passed, so `inEvt(lazyElem) = > {console.log(lazyElem)}`.
outEvt | Function | null | Custom function that hooks into the element disappearing in the viewport.
force | boolean | false | Pass in a custom condition that will just bypass the lazy load.
polyfillSrc | string | 'https://polyfill.io/v3/polyfill.js?features=IntersectionObserver' | Source of the polyfill for IE11. Can be changed if necessary should this need changed for any reason.
observerID| string | null | ID of `window.IntersectionObserver` which gets created with the 'new' operator, so one can get used for each instance.
unobserve| string | true | once entered in on the viewport, it'll unobserve. Make `false` should you want to re-observe an element.
observerOpts| string | { rootMargin: '48px' } | Object being passed is the 'options' argument for the IntersectionObserver, please refer to documentation regarding that [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer).
isIE | regexp | Browser dependent |  If its IE it'll resolve to `true` else `false`.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/565656" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/444" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/222" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768" 
    alt="Placeholder" 
/>



<div class="background-area-bg desktop-bg md-up-show"
 data-bg-src="https://placehold.it/1920x760"
></div>

<div class="background-area-bg mobile-bg md-up-hide"
    data-bg-src="https://placehold.it/768x768"
></div>


<h1>Common Plugins and JavaScript for Websites</h1>
<p class="text-md">It's nearly inevitable your website will need these plugin's and functions for it to work. These are made to work with <a href="https://github.com/fabiospampinato/cash" target="_blank">Cash</a> (with jQuery still an option) as the only dependency.</p>
<h2>About</h2>
<p><a href="#page-bottom" class="smooth-scroll">Go To Page Bottom Smooth Scroll</a> Below are some common plugin's to help enhance your website. You'll notice some are missing (like a Carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use it, its great. Others I always thought could be better, even though a few are frankly near duplicates 🤷🏻‍♂️. Anyways here we are, and you're stil reading this! If you download you probably work where I do, or somehow stumbled across.</p>

<h2>Some nice features are their is some shared syntax in the way they all operate.</h2>

<p><strong>For Example:</strong> all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)</p>
<code>
    &lt;div id="your-plugin-elem" data-plugin-name="{option:'text',option2: true, etc: 'you get the idea'}"&gt;&lt;/div&gt;
</code>

<p><strong>For Example:</strong> all can have their configuration change. Which can come in handy sometimes when things get complex</p>
<code>
    $('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
</code>
                
```

__JavaScript__
```javascript

//Background images... with a custom in event
$('.background-area-bg').lazyLoad({
    observerID: 'background-area-bg', 
    inEvt: (el)=>{console.log('el',el)}
});

//regular images
$('img[data-src]').lazyLoad({
    observerID: 'img[data-src]'
});

//a bunch of paragraphs to style right!
$('p').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.color = 'red';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.color = '';},1000);
    }
});
```
<br>
<br>
<br>
<h2 id="nav-desktop-plugin">Desktop Navigation (Enhanced)</h2>


### Features
This plugin adds a delay to the desktop navigation and for the nestled `<ul>`'s that fly out. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. I think this is a nice feature to have and adds a small nice little touch to the finished project.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
stopWidth | number | 768 | the width in which the navigaiton will stop for mobile.
delay | number | 800 | The delay in time you can hover off a sub menu item.
edgeCss | string | 'ul-on-edge' | The CSS class that moves the nav when if goes over the egde of the page.
outerElem | string | 'body' | Element to attach the `navHoveredCss` option.
ulHasCss | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
ulNotCss | string | 'no-ul' | CSS class for `<li>` that don't have a `<ul>` nestled.
navHoveredCss | string | 'desktop-nav-hovered' | The CSS class added to the `outerElem` (defaulted to the `<body>`).
hoverCss | string | 'hover' | The hover class to work in conjuction with the `delay` option to keep the item on the page when hovered off.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
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
$('#main-nav').navDesktop();
```

<br>
<br>
<br>
<h2 id="nav-mobile-plugin">Mobile Navigation</h2>


### About
Plugin is strictly for mobile so other plugins can be used for the desktop nav if needed. The clicking action that allows for opening/closing nav item is handled via the visibility of the __'open/close' button__ so the click so no clashing between desktop and mobile happen. Also so CSS can control it tighter as sometimes device width may dictate whether or not you'll see the desktop or mobile view.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableBtn | string | '#mobile-nav-btn' | The selector to the mobile nav button to turn show the navigation.
ariaLabel | string | 'Toggle site navigation' | The arial label for the `enable` button.
slideDuration | number | 400 | Duration for showing a sub menu item, CSS transistion should correspond.
outerElement | string or HTMLElement | 'body' | Element to attach `menuOpenCss` class to.
outsideClickClose | boolean | true | Can close if clicked outside of the menu.
hasUlCls | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
menuOpenCss | string | 'menu-opened' | CSS class added to the elements saying its opened.
menuTogglingCss | string | 'menu-toggling' | CSS class added while the element is toggling.
menuIsOpeningCss | string | 'menu-is-opening' | CSS class added to the body/outerElement when the menu is opening.
menuIsClosingCss | string | 'menu-is-closing' | CSS class added to the body/outerElement when the menu is closing.
arrowSubMenuItemCss | string | 'i i-arrow-b' | CSS class of the button added to the `<li>` element for toggling open/closed.
afterNavItemOpen | function | () => {} | Function to run after an nav item is opened.
afterNavItemClose | function | () => {} | Function to run after a nav item is closed.
afterOpen | function | () => {} | Function to run after the nav is open.
afterClose | function | () => {} | Function to run after the nav is closed.
stopPropagation | boolean | true, | Stops the click from propagating up in the DOM from the nav element.
nextLevelBtn | string | `<i class="nav-icon nav-icon--next" /><span class="sr-only">View menu</span></i>` | Button for the 'next level'. This only works if the base class is extended with the `NavMobileNestled`.
backLevelBtn | string | `<i class="nav-icon nav-icon--back" >← <span class="sr-only">Go Back</span></i>` | Button for the 'previous level'. This only works if the base class is extended with the `NavMobileNestled`.
navToggleNestled | boolean | false | This only works if the base class is extended with the `NavMobileNestled` class and is an alternative way to display the navigation items.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
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
$('#main-nav').navMobile()
```

<br>
<br>
<br>
<h2 id="parallax-plugin">Parallax</h2>


### Features
This plugin is for parallaxing page elements (and yes background images). Use the `bgFill` option and it'll magically expand to the height of its container if using a background image. It uses the `translate3d` property as its more efficient than using a `top` or `left` as well as `requestAnimationFrame`. Can be used to move elements either with a Y or X axis. 

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

<br>
<br>
<br>
<h2 id="popup-plugin">Pop-Up</h2>


### Features
Where do I begin? Look at the settings. Pretty light-weight for what it does and has all the configurable options you should need. Simple CSS styling and all that fun stuff.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
popupID| string | 'popup_' + generateGUID() | ID for the popup. Good idea to set one if loading from a hash, else its dynamically generated
src | string | src | Can be a CSS selector `.your-popup-content` or `#yeah-your-content` or `<h2>Yeah Your Popup Content</h2><p>etc...</p>` and `https://placekitten.com/900/1200?ext=.jpg`. 
popupOuterClass| string |  "" | CSS class name to add to the outer element of the popup.
title | string |  <code>$(element).data('popup-title') &#124;&#124; $(element).attr('title') &#124;&#124; ''</code> | Title to get added above to the content. Looks for that in that order specified in the default, if not overridden.
titleElem |string |  'h3' | The element of the title
titleCss| string |  '' | A CSS class for that above title
caption| string |  <code>$(element).data('popup-caption') &#124;&#124; ''</code> | Text below the main content
clickOutsideClose| boolean |  true | closes if the popup is clicked outside of the box
fadeOut| number |  500 | Time to fade-out the popup, CSS transition should correspond.
fadeIn| number |  400 |  Time to fade-in the popup, CSS transition should correspond.
zIndex | number |  2000 | CSS z-index of the popup
vhDivisor| number | 2 | The division of the height of the popup and how it displays on the page. So, '2' means we divide it in half, and it displays in the center. '1' is not at all, and '0'. It takes any number really, and there is a use-case for this, that I can't remember exactly right now.
firstAnchorFocus| boolean |  true | Focus's back on the anchor or element after the popup closes
setTopPosition| number |  null | Sometimes we just may manually want to tell the vertical position of the popup.
isImage| boolean |  false | While there is a process using a regex and other parameters sometime we may just want to specify in the config.
isJsArray| boolean |  false | If using an array instead of DOM elements
escapeClose| boolean |  true | Will close the popup if the escape key is pressed.
group| boolean |  true | Groups like elements together so they can be toggled within the popup
showGroupAmount| boolean |  true | Shows the amount of elements if there is more than one.
groupOfHTML| boolean |  '/' | The separator (or text) between the group amount (e.g.: '1 / 3').
launch| boolean |  false | Launch the popup immediately.
photoRegex| regexp |  I'll explain | If it ends in <code>gif&#124;png&#124;jp(g&#124;eg)&#124;bmp&#124;ico&#124;webp&#124;jxr&#124;svg</code> or has a querystring parameter of `?image=jpg` or `?ext=someimageformattoo` then it'll know it's an image.
closeText| boolean |  `<i class="icon-close"><span class="sr-only">Close</span></i>` | Close html/text.
prevBtnHTML| boolean |  `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>` | Previous Button html/text.
nextBtnHTML| boolean |  `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>` | Next Button html/text.
loadingHTML | boolean |  `<div class="popup__loader"></div>` | Loading HTML.
appendPopupTo | string \| HTMLElement |  'body' | the HTML element the popup appends to.
showPopup | boolean |  'popup--show-popup' | CSS class used to show the popup.
enableEvent | string |  'click' | The event to show the popup, change to whatever event on the element. Could be 'hover' if we wanted to for some reason.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'popup' and it'll load and filter through as needed while maintaining the remaining location hash values. Example value of this could be `#popup=#your_popup__1&foo=bar&baz=foo`. This only gets used if 'useLocationHash' option is selected. 
loadLocationHash | boolean |  true | Loads a popup from a `window.location.hash`, if the hash matches the popup.
useLocationHash | boolean |  true | Uses history and creates a hash in the location to toggle the popups on or off
afterLoaded | function |  (_.$element, popupID) => { } | Function to run after the popup is displayed. `_.$element` is the `$(HTMLElement)` the popup is intialized on.
afterClose | function |  (_.$element, popupID) => { } | Function to run after the popup is closed.
onClose | function |  (_.$element, popupID) => { } | Function to run after the popup at the begninning of the closing event.

<br>
<br>

### Static Methods

Method | Params | Description
------ | ------- | ------
close() | element:HTMLElement, refocus:boolean | closes the current popup, `refocus` boolean will refocus on the last clicked element (or the element the popup is attached to).
remove() | element:HTMLElement | Removes the instance of the popup. If used in combination with close, make sure this fires after the popup is done closing, else it will fire an error.
show() | element:HTMLElement | Loads the popup.

<br>
<br>

### Example

__Notes:__
The popup gets is content to display in the popup in a few ways:
- `data-popup-src` attribute on an element, so `<button data-popup-src=".my-element">My Button</button>`
- `href` attribute on an `<a>`, but it can also use the `data-popup-src` as well.
- Or it can just be specified in the config.

The order of operations on these is the __JS config__ first, then __data-popup__ attribute, then __href__.

__The following is an example html structure for this plugin:__

```html
<div style="display: none;">
	<div id="popup-content">
		<h1>Pop-up</h1>
		<p>This is for a basic popup content</p>
		<p>Cum sociis natoque penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi senatus locus, nihil horum?</p>
	</div>
</div>
<div class="flex-l">
	<div class="md-col-4">
		<a class="button popup-w-string"
			href="#"
			data-popup-src="<iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://www.youtube.com/embed/9HFsQjjTkak&quot; frameborder=&quot;0&quot; allow=&quot;accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture&quot; allowfullscreen></iframe>"
			data-popup-type="string"
			data-popup-options="{popupID:'video',title:'Video Title'}"
			data-popup-caption="Some caption here for more splaining"
		>Popup With String</a>

		<a class="button popup-w-string"
			href="<img src='https://placekitten.com/600/400' alt='Something'>"
			data-popup-type="string"
			data-popup-options="{popupID:'kitten-pic',title:'Popup Title'}"
			data-popup-caption="Some caption here for more splaining"
		>Popup With String 2</a>

		<a href="#popup-content" class="button popup-w-content-id"
			data-popup-options="{title:'How About That'}"
		>Popup With HTML</a>

		<a href="https://placekitten.com/900/1200?ext=.jpg" class="button pic-group" title="Kitty thats in a taller image"
		>A Group of Pictures</a>

		<button type="button" class="button js-array">A Group of Pictures in JS Array</button><br>
		<br>
		<a href="https://placekitten.com/1200/600?image" data-popup-title="Anchor Kitty" class="pic-group">Kitty</a><br>
		<br>
		<a href="https://www.fillmurray.com/600/500" data-popup-type="image" data-popup-title="Our Boy Phil Murray" class="pic-group">Phil Murray</a>
	</div>
	<div class="md-col-4">
		<img src="https://placekitten.com/600/400"
			data-popup-src="https://placekitten.com/1200/800?image?image"
			alt="Kittens (1)"
			class="pic-group"
			data-popup-title="Kittens"
		/>
		<img src="https://placekitten.com/600/500"
			data-popup-src="#popup-content"
			alt="Kittens (2)"
			class="pic-group"
			data-popup-title="Joking Here's Our Popup Content"
		/>

	</div>
	<div class="md-col-4">
		<img src="https://placekitten.com/600/300"
			data-popup-src="https://placekitten.com/900/450?image"
			alt="Kittens (3)"
			class="pic-group"
			data-popup-title="Kittens (3)"
		/>
		<img src="https://placekitten.com/600/400"
			data-popup-src="https://placekitten.com/900/600?yeah&image"
			alt="Kittens (4)"
			class="pic-group"
			data-popup-title="Sorry it's not a doggie, but it'll have to do."
		/>
	</div>
</div>
```

__Javascript__
```javascript
//
//examples of using it differently
//

//getting contents from a string
$('.popup-w-string').popup({
	group: '.popup-w-string'

});
// an ID, which comes from the href prop on the element
$('.popup-w-content-id').popup();

//group of pictures with one mixed element in the group
$('.pic-group').popup({
	src: '.pic-group',
	title:'A Group of Pictures'
		
});

// JS Array

// Instead of combing the DOM for elements, comb an JS array that maybe gets 
// compiled from some JSON array. Structure it like the following:

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

$('.js-array').popup({
	isJsArray: true,
	src: jsArray,
	title:'A JavaScript Array of Objects!'
});
```

<br>
<br>
<br>
<h2 id="tabs-plugin">Tabs Plugin About</h2>

At some point we all need to be able to tab content. This one does it for you!

### Features
- Tabs within tabs, so tabs can be added inside other tabs if needed (which it will at some point),
- hash to load not only a tab, but tabs in tabs as well!
	- i.e.: add this to the location `#tab-id` open multipe with an '=' sign so `cool-tab=cooler-tab`, or run with a filter as well so it can work in conjuction with other plugin's that use a hash

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
defaultContent | Boolean / String | 0 | The order of the list item selected. Goes of course their appearance in the DOM. Passing in `'none'` does as it sounds and hides them all by default.
tabsEvent | string | 'click' | Event to change the tabs content
activeCss | string | 'tab--active' | The 'active' CSS class that is added to the tabs list on the `<li>` element.
tabsBodyCss | string | 'tabs__body' | The CSS class for the body element in which all the tab content resides.
tabsBodyItemCss | string | 'tabs__body-item' | The CSS class for the tab content within the 'tabs body'.
tabsBodyItemShowCss | string | 'tabs__body-item--show' | The CSS class added to the 'tabs body item' to show it.
tabsHeadCss | string | 'tabs__nav' | The CSS class for the tabs navigation, added to the `<ul>` or its parent element.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'tabs' and it'll load and filter through as needed while maintaining the remaining location hash values. Example value of this could be `#tabs=tabid=another-tabids&foo=bar&baz=foo`. This only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean | true | Use window location hash and history push state so the browser back button can be used (or forward as well) to toggle through tabs.
loadLocationHash | boolean | true | Add in location hash parameters to load default tabs. `#files=files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
beforeChange | function | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
afterChange | function | () => {}  | Function to run after the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | function | () => {} | Function to run after the the plugin intializes, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.


### Example

__The following is an example html structure for this plugin:__


__HTML__
```html
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
$(".tabs__container").tabs({
	onInit: (tab,list,body) =>{
		console.log('init',tab,list,body)
	},
	beforeChange: (tab,list,body) =>{
		console.log('before',tab,list,body)
	},
	afterChange: (tab,list,body) =>{
		console.log('after',tab,list,body)
	}
});

```
