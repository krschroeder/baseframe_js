# Base_Frame Plugins &amp; Functions

A suite of useful Javascript plugins and functions to help with front-end development on websites. Instead of searching for unconnected plugins that may not work together well, this suite is to help remedy that. It's not to solve every problem with front-end web development, but the most common. The scripting features plugins for collapsible sections, popups, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling (without jQuery, or with CSS), throttled resizing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent. This scripting is designed to be imported in easily so you can start building!

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features
### It's small!
Combined all together its ~ 60k. Add that with Cash and its less than jQuery alone!

### Pass in parameter options with a `data-` attribute
The data attribute is always the `data-` (of course) and then the plugin name `pluginName` followed by `-options`.

__For Example:__ all have options that can be plugged in as a data attribute, in object literal format.

```html
<div id="your-plugin-elem" data-pluginName-options="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```
### Update Parameters After Init!
Once initialized, each plugin when re-accessed (when not 'removed') will only get updates to their parameters. Could come in handy for instance when you have an accordion (or collapsible section) and on mobile you want it to scroll to the top on open (that plugin does that!), but not on desktop. This works for the vast majority of params, but not all FYI. For example, I can specify a 'click' event and that can only be set on 'init'. Perhaps I'll document this later on though.
    
```javascript
$('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
```

### Callbacks after events

Lots of callback functions to run after and before events and such that may help you out when you need it most.

### IE11 usage
Most of these scripts all work back to IE11. There should be some polyfilling needed for this "retired" browser, that may still be a requirement for some of you out there.


## Example Script of Importing Everything In
```javascript
//lets bring it all on in
import installStoreToLibrary, {
    installStoreAsDataToLibrary,
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    NavMobileNestled,
    Parallax,
    SelectEnhance,
    Tabs,
    cookies,
    formInputs,
    smoothScroll,
    throttledResize,
    trapFocus
} from 'baseframe-js';

// or individually
import AccessibleMenu from 'baseframe-js/build/js/accessible-menu';
import Collapse from 'baseframe-js/build/js/collapse';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
//NOTE: this can be ignored if using jQuery, and it'll fallback to its 
// $.fn.data method to store instances and their params.
installStoreToLibrary(true);
// or the following function to mimick jQuery's data fn
// installStoreAsDataToLibrary(true)

//perhaps for some reason you don't want to install
//but here we obviously are
libraryExtend([
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Modal,
    Parallax,
    SelectEnhance,
    Tabs
]); 
```

## Using Styles For Plugins
Styles are located in the `src/assets/scss/` directory and all can be grabbed that way and added on in. Still should do a little more work in updating the SCSS variables to be frank. So I would just drag those files into the project directly. The SCSS should be pretty minimal and generic so it'll more easily take on custom styling.


## Plugin Names and What They Do.

### Accessible Menu
Adds tabbing, allows the use of arrows for toggling around the navigation, which is configurable depending on the menu design. The use of the escape key to go up a level.
__[View](#accessible-menu-plugin)__

### Collapse 
It's is for toggling collapsible sections. Can be used like an accordion and etc. 
__[View](#collapse-plugin)__

### Equalize Content
When Flexbox, or other options won&rsquo;t work, use this to equalize content 
__[View Equalize Content](#equalize-plugin)__

### Lazy Load
Load background images and images lazily once they appear in the viewport! Also, run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` API. 
__[View Lazy Load](#plugin-lazy-load)__

### Modal
This is a more minimalistic version of the 'popup' plugin. Nice bit of flexibility do things like image carousels, confirm prompts and such with just a little peppering of custom code.
__[View Modal](#modal-plugin)__

### Navigation Desktop
This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. 
__[View Navigation Desktop](#nav-desktop-plugin)__

### Navigation Mobile
Neat little mobile navigation plugin 
__[View Navigation Mobile](#nav-mobile-plugin)__

### Parallax Elements
For making a parallaxing elements on the page. Lots of configurable options.
__[View Parallax Elements](#parallax-plugin)__

### Select Enhance
Enhance a selectbox
__[View Select Enhance](#select-enhance-plugin)__

### Tabs
Tabs in tabs, change onhashchange this does it for tabs!
__[View Tabs](#tabs-plugin)__

#### Removing the plugin ####

Each plugin can be removed by calling `$('.plugin-selector').plugin('remove')`, and it'll call the static method to remove it and all its components. Or if you want it can be stored as a method `$.plugin.remove($('.plugin-selector').eq(1))` or `$.plugin.remove('.plugin-selector')` and done that way.


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

        static remove() {
            //... remove operations ridding of data stored
            //    and any associated events
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
#### installStoreAsDataToLibrary ####

If using **jQuery** and you have plugins that use `$.fn.data` and `$.fn.removeData` this can alternatively be used to map over the **Cash Dom's** built-in data method. The data retrieval for `data-attrs` is the same pulling the first occurance on the same items queried. It first checks the data stored in the `Store`.


```javascript
installStoreAsDataToLibrary(expose?:boolean) 
```

### Functions


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
Option | Description
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

#### trapFocus
This is used in the `Popup` and `NavMobile` plugin's, to trap the focus of tabbing events to just the availble focusable elements. Each tab it re-takes inventory on what is available to tab to, so you can load dynamic/change content that may not be available when the focus trap is created.

__params__
Option | Type | Default | Description
------ | ---- | ------- | -------
focusFirst | boolean | true | Focus's the first element
nameSpace | string | 'trapFocus' | Unique namespace for the tabbing keydown event.
focusableElements | string or array | ['button', 'a', 'input', 'select', 'textarea', '[tabindex]'] | A listing of focusable elements.
```javascript
const trappedFocus = trapFocus(element:JQuery<HTMLElement> | HTMLElement, params?: PlainObject);
// to remove later on
trappedFocus.remove();

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

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix | string |  'collapse' |   CSS class name for styling purposes that is used as prefix to all other classes (btn, body, etc).
toggleClickBindOn | string |  'group' |  Attaches the click to the selector or `$('.your-selector').colla...`, other option is __'body'__ and it'll then be set on the body. Can come in handy, I had a use-case for it, forgot exactly why.
toggleDuration | number |  500 |  The speed at which the items will open, should pair with CSS transition settings.
toggleGroup | boolean |  false |  More or less toggles the other opened element(s) closed, and make it behave like an accordion.
moveToTopOnOpen | boolean |  false |  After the element is opened, the item will move to the top of it. Good for mobile.
moveToTopOffset | number |  0 |  Should we need to offset the move to the top if the __moveToTopOnOpen__ is set to `true`.
scrollSpeed | number |  100 |  The speed of the scroll if __moveToTopOnOpen__ is set to `true`.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'collapse' and it'll load and filter through as needed while maintaining the remaining location hash values. this only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean |  true |  Use the `window.location.hash` to open and close the items.
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item.
historyType | string | 'push' | If using using `useLocationHash` or a history of events, 'push' pushes a new state, and 'replace' replaces the current.
afterOpen | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is opened.
afterClose | function |  ($btnElems, $collapsibleItem) => { } |  callback function after an item is closed.
afterInit | function |  (element) => { } | callback function after collapse is initialized.


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

By default it will load background images and images lazily once they appear in the viewport. But also run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses [window.IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This plugin works to load images with the `loading="lazy"` attribute (yes it would work by itself!). It loads the image/iframe before the first pixel enters the viewport--see settings as we can pad so it can appear loaded once scrolled to. The `loading="lazy"` attribute only works once the first pixel enters the viewport, which may cause a blank space before the image loads.


Option | Type | Default | Description
------ | ---- | ------- | -----------
imgSrcName | string | 'src' | Name of the data attribute to load an image source. For example `<img src="cleardot.gif" data-src="your-lazy-image.jpg">`.
bgSrcName | string | 'bgSrc' | Name of the data attribute to load a background image. Use camel casing when changing.
loadImgs | boolean | true | Load images and background images. Built-in function for this since its the core intended functionality.
inEvt | Function | null | Custom function that hooks into the element appearing on screen. the `lazyElem` and `entry` are the two parameters passed, so `inEvt(lazyElem, entry) = > {console.log(lazyElem, entry)}`.
outEvt | Function | null | Custom function that hooks into the element disappearing in the viewport. Same parameters are passed as the inEvt function.
force | boolean | false | Pass in a custom condition that will just bypass the lazy load.
observerID| string | null | ID of `window.IntersectionObserver` which gets created with the 'new' operator, so one can get used for each instance.
unobserve| boolean | true | once entered in on the viewport, it'll unobserve. Make `false` should you want to re-observe an element.
observerOpts| object | { rootMargin: '48px' } | Object being passed is the 'options' argument for the IntersectionObserver, please refer to documentation regarding that [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer).



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
<h2 id="modal-plugin">Modal</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableEvent | string |  'click' | The event to show the modal, change to whatever event on the element. Could be 'hover', or synthetic event triggred by another element.
appendTo | string | HTMLElement |  document.body | the HTML element the popup appends to.
ariaLabelledby | string |  null | If using an `aria-labelledby` to label the modal for ADA purposes.
ariaLabel | string |  null | If using an `aria-label` to label the modal for ADA purposes.
cssPrefix | string |  'modal' | CSS class name for styling purposes. The outer most CSS class. Children elements naming uses the BEM naming convention.
closeBtnIconCss | string |  'ico i-close' | CSS used on the close button.
closeOutDelay | number |  250 | Time for closing the animation. Sync with CSS transition or animation.
backDropClose | boolean|  true | Toggle whether a user can click the backdrop to close the modal.
fromDOM | boolean |  true | If the modal content is grabbed from the DOM. Set to false if grabbed via an AJAX call or otherwise generated.
modalCss | string |  null | Additional modal css for styling or other scripting purposes
modalID | string |  null | The ID of the modal.
src | string |  null | CSS selector for DOM elements, or can be custom created element from data either from an AJAX call or computed otherwise.
useHashFilter | string |  null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'modal' and it'll load and filter through as needed while maintaining the remaining location hash values. this only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean |  true |  Use the `window.location.hash` to open and close the items.
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item.
onOpenOnce | object |  (modalObj) => {} | Event that fires only the first time the modal is enabled
onOpen | object |  (modalObj) => {} | Event that fires when the element is opened
afterClose | object | (modalObj) => {} | Event that fires after the element is closed

#### Modal Object
This is an object with the following props/elements that is the first (and only) argument above in the callback functions (`onOpenOnce`,`onOpen` and `afterClose`). This should help allow for more flexibility with the prompt to attach any additional events or styling more easily. Below some examples with a little bit of custom code with this object.

```javascript
{
    $backdrop,
    $content,
    contentAppended: false, //state
    $dialog, //modal dialog
    $dialogContent, // modal dialog content
    $closeBtn,
    id: modalID,
    $modal, //outermost element
    disableModal: () => _.disableModal(), //disable modal fn
    show: false //state
}
```

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<div style="display: none;">
    <div id="modal-content">
        <h1>Pop-up</h1>
        <p>This is for a basic modal content</p>
        <p>Cum sociis natoque <a href="#"> some link </a>penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. <button type="button" disabled>Some Button</button> Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi <button type="button">clickable btn</button> senatus locus, nihil horum?</p>
    </div>
</div>

<a href="#modal-content" class="button btn-modal"
    data-modal-options="{title:'How About That'}"
>Modal With HTML</a>

<button type="button" id="btn-gen-content">Generated Content</button>

<!-- Quick Image Carousel Example -->
<div class="md-col-4 pic-group-holder">
    <button type="button" 
        data-img-src="https://placekitten.com/1200/800"
        alt="Kittens (1)" class="pic-group"
    >
        <img src="https://placekitten.com/600/400" />
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/550"
        class="pic-group"
    >
    <img src="https://placekitten.com/600/500" alt="Kittens (2)"/>
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/450"
        class="pic-group"
    >
        <img src="https://placekitten.com/600/300" alt="Kittens (3)" />
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/450"
        class="pic-group"
    >
        <img src="https://placekitten.com/600/400"alt="Kittens (4)" />
    </button>
</div>
```

```javascript
(function($){
    // simple usage
    $('.btn-modal').modal({
        useHashFilter: 'modal'
    });

    // usage for a Prompt to dismiss itself
    // with self generated content
    $('#btn-gen-content').modal({
        useHashFilter: 'modal',
        src: $('<div>').attr({class: 'gen-content'}),
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) { 
             
            modalObj.$content.on('click','.dismiss', modalObj.disableModal );
            
            // generated content from somewhere
            modalObj.$content.append(`
                <h2>Some generated Content</h2>
                <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
                <button type="button" class="button dismiss">Dimiss</button>
            `);
        }
    })
})($);

// quick image carousel
(function ($) {
    const $picGroup = $('.pic-group');

    $picGroup.each(function (index) {
        const src = $('<img>').attr({ src: this.dataset.imgSrc, loading: 'lazy' });
        const modalID = 'pic-group_' + index;

        $(this).modal({
            src,
            modalID,
            useHashFilter: 'modal',
            fromDOM: false,
            onOpenOnce(modalObj) {
                
                const $img = modalObj.$dialogContent.find('img');
                
                let imgIndex = index;

                modalObj.$dialogContent.append(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">previous image</button>
                        <button type="button" class="next-btn">next image</button>
                    </footer>
                `);

                modalObj.$dialogContent.on('click', 'button', function(e){
                    if (this.classList.contains('prev-btn')) {

                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                            
                    } else {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;

                    }
                            
                    $img.attr({src: $picGroup[imgIndex].dataset.imgSrc});
                })
            }
        });
    })
})($);
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
outerElem | string | document.body | Element to attach the `navHoveredCss` option.
ulHasCss | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
ulNotCss | string | 'no-ul' | CSS class for `<li>` that don't have a `<ul>` nestled.
navHoveredCss | string | 'desktop-nav-hovered' | The CSS class added to the `outerElem` (defaulted to the `<body>`).
navLeavingCss | string | 'desktop-nav-leaving' | The CSS class added to the `outerElem` as the nav is leaving. An opportunity to add styling to fade away any open navigations.
navLeavingDelay | number | 800 | delay in milliseconds in which the `navLeavingCss` gets added to the `outerElem`
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
outerElement | string or HTMLElement | document.body | Element to attach `menuOpenCss` class to.
outsideClickClose | boolean | true | Can close if clicked outside of the menu.
hasUlCls | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
menuOuterOpenCss | string | 'menu-opened' | CSS class added to the `outerElement` saying its opened.
menuOpenCss | string | 'menu-opened' | CSS class added to the elements saying its opened.
menuTogglingCss | string | 'menu-toggling' | CSS class added while the element is toggling.
menuIsOpeningCss | string | 'menu-is-opening' | CSS class added to the body/outerElement when the menu is opening.
menuIsClosingCss | string | 'menu-is-closing' | CSS class added to the body/outerElement when the menu is closing.
arrowSubMenuItemCss | string | 'i i-arrow-b' | CSS class of the button added to the `<li>` element for toggling open/closed.
submenuBtnSkip| () => : boolean \| false | (li) => { return true|false } | Function that takes the `li` as the parameter, which tests whether or not to skip adding a button adjacent to it's `<a/>` element. Ex. (in the mark-up) `<li class="skip-li">` and the config the following: `submenuBtnSkip(li) { return li.classList.contains('skip-li')}` in which it'd skip adding a button to that level in the nav.
afterNavItemOpen | function | ($li) => {} | Function to run after an nav item is opened.
afterNavItemClose | function | ($li) => {} | Function to run after a nav item is closed.
afterOpen | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is open.
afterClose | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is closed.
doTrapFocus | boolean | true | Traps the focus to just the visible anchors and buttons within the navigation.
trapFocusElem | string | null | selector string (or can be dom element) if we need to extend the trap focus slightly outside the main nav element.
stopPropagation | boolean | true, | Stops the click from propagating up in the DOM from the nav element.
bkptEnable | number | null | Optinally specify when to enable the mobile navigation with screen width (in pixels). This will override whether or not the `enableBtn` is visible, which is the conditional that enables this menu to function.

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
<h2 id="select-enhance-plugin">Select Enhance</h2>


### Features
Plugin that allows for styled dropdowns for the `<select>` element. This dropdown is ADA accessible, featuring typing to select, proper roles and aria attributes.
Can refresh the options list by calling static methods such as `SelectEnhance.refreshOptions('select')` or destroy it similiarly `SelectEnhance.remove('select')` (also with `$('select').selectEnhance('remove')`).

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix  | string | 'select-enhance' | CSS class name for styling purposes
mobileNative | boolean | true | Off by default this doesn't render the stylized dropdowns for mobile devices.
emptyValAsPlaceholder | boolean | true | if the value is empty, then render placeholder copy instead of the text value inside the option its pulling data from.
focusIn | Function | ($element) => {} | event when focusing in on the select box
focusOut | Function | ($element) => {} | event when focusing out on the select box
beforeChange | Function | ($element) => {} | event to fire before the change event
afterChange | Function | ($element) => {} | event to fire after the change event
blurDuration | number | 250 | the amount of time in milliseconds the blurring CSS effect lasts
typeAheadDuration | number | 500 | the timeout in millisconds to when the type/search feature resets
observeSelectbox | boolean | true | uses a MutationObserver to view changes on the `<select>` element or changes to the `<options>`

### Example

__The following is an example of the `<select>` elements for this plugin:__

__HTML__
```html
<label for="select-1">Select 1</label>
    <select id="select-1">
        <optgroup label="one">
            <option value="1">First Option</option>
            <option value="2">Second Option</option>
            <option value="3">Third Option</option>
        </optgroup>
        <optgroup label="two">
            <option value="4">More Options</option>
            <option value="5">Choices For Days</option>
            <option value="6">Sixth One</option>
        </optgroup>
    </select>
    <label for="another-select">Select 2</label>
    <select id="another-select">
        <option value="one">One Option</option>
        <option value="two">Two Option</option>
        <option value="three">Three!</option>
    </select>
```

```javascript
$('select').selectEnhance();
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
defaultContent | number \| 'none' | 0 | The order of the list item selected. Goes of course their appearance in the DOM. Passing in `'none'` does as it sounds and hides them all by default.
tabsEvent | string | 'click' | Event to change the tabs content
activeCss | string | 'tab--active' | The 'active' CSS class that is added to the tabs list on the `<li>` element.
tabsBodyCss | string | 'tabs__body' | The CSS class for the body element in which all the tab content resides.
tabsBodyItemCss | string | 'tabs__body-item' | The CSS class for the tab content within the 'tabs body'.
tabsBodyItemShowCss | string | 'tabs__body-item--show' | The CSS class added to the 'tabs body item' to show it.
tabsHeadCss | string | 'tabs__nav' | The CSS class for the tabs navigation, added to the `<ul>` or its parent element.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'tabs' and it'll load and filter through as needed while maintaining the remaining location hash values. Example value of this could be `#tabs=tabid&tabs2=another-tabids&foo=bar&baz=foo`. This only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean | true | Use window location hash and history push state so the browser back button can be used (or forward as well) to toggle through tabs.
loadLocationHash | boolean | true | Add in location hash parameters to load default tabs. `#files=files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
historyType | string | 'push' | If using using `useLocationHash` or a history of events, 'push' pushes a new state, and 'replace' replaces the current.
tabbing | boolean | true | Enables tabbing with keyboard arrows. A tab list should only be focusable one at a time with the 'tab' key.
tabDirection| string | 'horizontal' | Typically tabs are 'horizontal' but may also go 'vertical'. They take either or as an option, otherwise it'll throw a `console.warn` to correct.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
beforeChange | (prevTabId: string, tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
afterChange | (prevTabId: string, tabsList: Cash, tabsBody: Cash): void | () => {}  | Function to run after the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | (tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run after the the plugin intializes, passed variables are the  'tabs list', 'tabs body' elements.


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
