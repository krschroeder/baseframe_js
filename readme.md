# Baseframe JS #
A suite of useful JavaScript plugins and functions for front-end development. Instead of searching for unconnected plugins that may not work together well, this suite does. The package features plugins for collapsible sections, modals, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling, debounced resizing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent with each other.

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish) ##
These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing and manipulation.

## Features ##

### Pass in parameter options with a `data-` attribute
The data attribute is always the `data-` (of course) and then the plugin name `pluginName` followed by `-options`.

__For Example:__ all have options that can be plugged in as a data attribute, in object literal format.

```html
<div id="your-plugin-elem" data-pluginName-options="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```

### Update Parameters After Initialization! ###
Once initialized, each plugin when re-accessed (when not 'removed') will only get updates to their parameters. Handy for instance when you have an accordion (or collapsible section) and on mobile you want it to scroll to the top on of the item on open, but not on desktop. This works for the vast majority of params, but not all FYI. For example, I can specify a 'click' event and that can only be set on 'init'. However, each plugin can be 'removed' and then re-installed as well.
    
```javascript
$('.your-plugin-elem').plugin({change:'yep', height: 1e6})
```

### Callbacks after events ###

Lots of callback functions to run after and before events and such that may help you out when you need it most.

## Example Script of Importing Everything In ##

### Barrel File ###
 
This project is set-up with a __barrel file__ or a single reference to everything in the project. This is the neater syntax, but the drawback may have issues tree-shaking the unused imports.

```javascript
import libraryExtend, {
    AccessibleMenu,
    Collapse,
    Cookies,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr,
    UrlState,
    smoothScroll,
    debounceResize,
    trapFocus
} from 'baseframe-js';
```

### Individual Imports (Recommended)

This is the recommended way to bring everything in. Not a 'neat' as the use of the barrel file, but this will reliably tree-shake anything unused in the project. 

```javascript
// Will install to either Cash Dom or jQuery (details below)
import libraryExtend from 'baseframe-js/dist/js/core/libraryExtend';

// Plugins individually (best for TS type support)
import AccessibleMenu from 'baseframe-js/dist/js/AccessibleMenu';
import Collapse from 'baseframe-js/dist/js/Collapse';
//... and the other plugins


// some of the utility functions in the project...
import debounceResize from 'baseframe-js/dist/js/fn/debounceResize';
import smoothScroll from 'baseframe-js/dist/js/fn/smoothScroll';
import trapFocus from 'baseframe-js/dist/js/fn/trapFocus';
```

### Extending into the Library ###
By default the plugins don't extend into the __Cash Dom__ library, rather they need to be explicitly extended. This applies the same if using jQuery of course as well.

```typescript
// not necessary for the plugin's to work,
// but it's recommended that we do extend to the library
libraryExtend([
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Modal,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr
]); 
```

### Removing the plugin ###
Each plugin can be removed by calling `$('.element').plugin('remove')`, and it'll call the static method to remove it and all its components. Or if you want it can be stored as a method `$.plugin.remove($('.element').eq(1))` or `$.plugin.remove('.element')` and done that way.


## Using Styles For Plugins ##
Styles are located in the `src/assets/scss/` directory, and all can be grabbed that way and added on in. The SCSS is minimal and generic to do what you want with it.


## Plugin Names and What They Do. ##

### Accessible Menu ###
Adds tabbing, allows the use of arrows for toggling around the navigation, which is configurable depending on the menu design. Also adds functionality so the use of the escape key to go up a level.<br>
__[View Accessible Menu](#accessible-menu-plugin)__

### Collapse ###
It's for toggling collapsible sections. Can be used like an accordion and etc.<br>
__[View Collapse](#collapse-plugin)__


### Lazy Load ###
Load background images and images lazily once they appear in the viewport. Also, run custom functions, by hooking into callbacks as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` API underneath the hood.<br>
__[View Lazy Load](#plugin-lazy-load)__

### Modal ###
A modal, that will give you flexibility to do various things. Nice bit of flexibility do things like image carousels, confirm prompts, alerts and such with just a little configuration and CSS styling.<br>
__[View Modal](#modal-plugin)__

### Navigation Desktop ###
This plugin allows a user to refocus their mouse over a dropdown in the navigation if they accidentally hover off. Also, features an edge detection on the drop-downs `<ul>`, and uses corresponding CSS to position, so it stays on the page. It's a<br>
__[View Navigation Desktop](#nav-desktop-plugin)__

### Navigation Mobile ###
Neat little mobile navigation plugin to enable the menu and toggle sub-sections.<br> 
__[View Navigation Mobile](#nav-mobile-plugin)__

### Parallax Elements ###
For making a parallaxing elements on the page, parallax horizontally, vertically and zoom-in or out. Lots of configurable options.<br>
__[View Parallax Elements](#parallax-plugin)__

### Scroll Spy ###
For doing a scroll spy that will highlight navigational elements to their body anchor id elements.<br>
__[View Scroll Spy](#scroll-spy-plugin)__

### Select Enhance ###
Enhance a `<select>` element and it's options. Unlike a radio button or checkbox, a select element can't fully be styled without further HTML enhancement.<br>
__[View Select Enhance](#select-enhance-plugin)__

### Tabs ###
For tab sections. A user can add tabs inside another tabs section. Also, track the state of the tabs using history push or replace states.<br>
__[View Tabs](#tabs-plugin)__


### Toastr ###
Toastr for little dissmisable message to notify a user! Enable several at once, customize their positions and more.<br>
__[View Tabs](#toastr-plugin)__

<br>
<br>

------

### Class Set-up for using `LibraryExtend` ###

Each Plugin class has the following properties set on it.

```javascript
    class YourClass {
       static get version() {
            return VERSION;
        }

        static remove() {
            //... remove operations ridding of data stored
            //    and any associated events
        }
        
        constructor(element, options, index) {
            //... constructor code
        }
    }

```

------

### Essential Functions ###

#### libraryExtend ####
First parameter can be one Plugin, or an array of them. Pass in the second param which will notify the user of updated parameters (good for development). Third options if you just want to specify the library your extending it into.

```typescript
// the third option 'Lib' allows a user to pass in either 
// jQuery or Cash library to extend the plugin's to. 
libraryExtend(plugins:Array<Plugin> | Plugin, notify?:boolean, Lib: Cash | jQuery);
```

### Functions

#### smoothScroll

First parameter is the `HTMLElement`'s top to scroll to position top, the second is the speed. Default speed is 100. This uses the `window.scroll` so should work cross-browser. This stops scrolling if the previous pixel is the same as the next, if the scroll tries to get broken, or if it can't scroll to anymore. Third argument is a callback function to run after the scrolling is done. The 4th parameter is the arguments for that function if necessary.

```typescript
smoothScroll(scrollToTop :number ,speed?: number , afterScroll?:(...args:any) => void, afterScrollArgs?:Array<any>);
```

#### trapFocus
This is used in the `Modal` plugin to trap the focus of tabbing events to just the available focusable elements. Each tab keypress it re-takes inventory on what is available to tab to, this way any dynamic changes can be accounted for.

__params__
The parameters that make the `ITrapFocusProps` interface.

Option | Type | Default | Description
------ | ---- | ------- | -------
focusFirst | boolean | true | Focus's the first element
nameSpace | string | 'trapFocus' | Unique namespace for the tabbing keydown event.
focusableElements | string or array | ['button', 'a', 'input', 'select', 'textarea', '[tabindex]'] | A listing of focusable elements.

```typescript
const trappedFocus = trapFocus(element:Cash | HTMLElement, params?: ITrapFocusProps);
// to remove later on
trappedFocus.remove();

```

#### Cookies
Static class for or getting, setting and deleting cookies.

```javascript
//setting a cookie
Cookies.set('cookieName','your cookie value',{path:'/',expires: 60, secure: true, sameSite: 'Lax'});
```
__Cookies Set Params__
Option | Description
------ | -------
path | Path to the cookie, default is the current `location.pathname`.
expires | Set in minutes. Time the cookie will expire.
secure | Sets the cookie so it can only be accessed via https protocol. This gets set automatically when `sameSite` is set to `None`.
sameSite | `Lax`, `Strict` or `None` are the options.

```javascript
//getting a cookie
Cookies.get('cookieName',{path: '/'});

//removing a cookie
Cookies.remove('cookieName',{path:'/path/to-your/cookie'});

//maybe you want to extend $ ?
$.extend({cookies: Cookies});
```


#### UrlState
Static class to set, get URL hash and search parameters. Easiest way to explain is to just show the types.
```typescript
type StateChangeType = 'push' | 'replace';
type UrlSearchType   = 'search' | 'hash' | 'hashVal';
type UrlPrintPattern = 'repeat' | 'normal';
type UrlPrintOptions = { pattern: UrlPrintPattern; brackets: boolean };
type UrlParamRawValue = string | (number | string)[] | null;
 
// 'on' set to true, sets the window popstate event
// 'on' set to false removes the event
UrlState.refresh(on: boolean):void;
 
// prints the values, 'brackets' option will add the [] to any
// key that contains an array value, as back-end needs or doesn't
UrlState.print(type: UrlSearchType, options: UrlPrintOptions): string

// updates the url, this is used in the UrlState.set if the fourth param is set
UrlState.toUrl(type: UrlSearchType, paramName: string): UrlParamRawValue
 
// sets new value, updates params in url if 4th param set
UrlState.set( 
    type: UrlSearchType, 
    paramName: string, 
    value: UrlParamRawValue,
    state?: StateChangeType
):void;
 
// sets a hash value, ex: 'https://your-website.com/some-page#your-hash-val'
// passing in null removes the value
UrlState.setHashVal(value: string | null, state?: StateChangeType): void;
 
// returns the 'search', 'hash', 'hashVal' values
UrlState.get(type: UrlSearchType, paramName: string);
```


### Plugins ###
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
focusInElems | string | 'a, [tabindex]' | Listing of elements that can be focused-in on.
focusLeaveElems | string | 'a, [tabindex], select, button' | Listing of elements to focus on to escape the last nav item via the arrow keys  

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
__JavaScript__
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
cssPrefix | string |  'collapse' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
toggleDuration | number |  500 |  The speed at which the items will open, should pair with CSS transition settings.
toggleGroup | boolean |  false |  More or less toggles the other opened element(s) closed, and make it behave like an accordion.
moveToTopOnOpen | boolean |  false |  After the element is opened, the item will move to the top of it. Good for mobile.
moveToTopOffset | number |  0 |  Should we need to offset the move to the top if the __moveToTopOnOpen__ is set to `true`.
scrollSpeed | number |  100 |  The speed of the scroll if __moveToTopOnOpen__ is set to `true`.
urlFilterType | 'hash'\|'search' | 'hash' | The filtering type to use (either `location.hash` or `location.search`) to track the status of an open modal.
historyType | 'replace'\|'push'| 'replace' | The history state update. Either `history.pushState` or `history.replaceState`.
locationFilter | string |  null | Key name of the param to be captured in the location URL. Example: `YOUR_URL#collapse=the-item-id`, where `the-item-id` is the ID property and `collapse` is our `locationFilter`.
loadLocation | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item.
afterOpen | function |  ($btnElems, $collapsibleItem) => {} |  callback function after an item is opened.
afterClose | function |  ($btnElems, $collapsibleItem) => {} |  callback function after an item is closed.
afterInit | function |  (element) => {} | callback function after collapse is initialized.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<section class="container">
    <div class="collapse collapse-group collapse-group-1" >
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 1</h2>
                <button class="collapse__btn" aria-controls="item-1" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-1">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                    <a href="#item-3" class="collapse__btn" aria-controls="item-3"><strong>Open Item 3 from here!</strong></a>
                </div>
            </div>
        </div>
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 2</h2>
                <button class="collapse__btn" aria-controls="item-2" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-2">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>

                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                </div>
            </div>
        </div>
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 3</h2>
                <button class="collapse__btn" aria-controls="item-3" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-3">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

__JavaScript__
```javascript
$('.collapse-group').collapse();
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
<img src="https://placehold.it/768x768/565656" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768/444" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768/222" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768" alt="Placeholder" loading="lazy"/>


<p>It's nearly inevitable your website will need these plugin's and functions for it to work. These are made to work with <a href="https://github.com/fabiospampinato/cash" target="_blank">Cash</a> (with jQuery still an option) as the only dependency.</p>
<h2>About</h2>
<p><a href="#page-bottom" class="smooth-scroll">Go To Page Bottom Smooth Scroll</a> Below are some common plugin's to help enhance your website. You'll notice some are missing (like a Carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use it, its great. Others I always thought could be better, even though a few are frankly near duplicates 🤷🏻‍♂️. Anyways here we are, and you're stil reading this! If you download you probably work where I do, or somehow stumbled across.</p>

<h2>Some nice features are their is some shared syntax in the way they all operate.</h2>

<p><strong>For Example:</strong> all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)</p>
                
```

__JavaScript__
```javascript

//load regular images few pixels before then enter
//the screen rather than the first pixel to enter
$('img[loading="lazy"]').lazyLoad({
    observerID: 'imgLazy',
    observerOpts: { rootMargin: '100px' }
});

//a bunch of paragraphs to style right!
$('p.highlight').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.background = '#ccc';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.background = null;},1000);
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
cssPrefix | string |  'modal' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
closeBtnIconCss | string |  'ico i-close' | CSS used on the close button.
closeOutDelay | number |  250 | Time for closing the animation. Sync with CSS transition or animation.
focusInDelay | number | null | 0 | A delay in the focusing in on the first element, which may be necessary for animation purposes. If an item within gets focus before it enters the viewport it may have adverse affects on it. Pass in `null` to not have the focus event not occur.
backDropClose | boolean|  true | Toggle whether a user can click the backdrop to close the modal.
fromDOM | boolean |  true | If the modal content is grabbed from the DOM. Set to false if grabbed via an AJAX call or otherwise generated.
modalCss | string |  null | Additional modal css for styling or other scripting purposes
modalID | string |  null | The ID of the modal.
src | string |  '' | CSS selector for DOM elements, or can be custom created element from data either from an AJAX call or computed otherwise. Optional if modal content is dynamic/generated.
urlFilterType | 'hash'\|'search' | 'hash' | The filtering type to use (either `location.hash` or `location.search`) to track the status of an open modal.
historyType | 'replace'\|'push'| 'replace' | The history state update. Either `history.pushState` or `history.replaceState`.
locationFilter | string |  null | Key name of the filter to be captured in the location URL. Example: `YOUR_URL#modal=the-modal-id`, where `the-modal-id` is the `modalID` property and `modal` is our `locationFilter`.
loadLocation | boolean |  true | Loads with a location from the browser address bar, must of course be the ID of the item.
onOpenOnce | object |  (modalObj) => {} | Event that fires only the first time the modal is enabled
onOpen | object |  (modalObj) => {} | Event that fires when the element is opened
afterClose | object | (modalObj) => {} | Event that fires after the element is closed
    
#### Modal Object
This is an object with the following props/elements that is the first (and only) argument above in the callback functions (`onOpenOnce`,`onOpen` and `afterClose`). This should help allow for more flexibility with the prompt to attach any additional events or styling more easily. Below some examples with a little bit of custom code with this object.

```javascript
{
    $backdrop,
    $content,// in the params this would be the src. If not specifying a source and using generated content use $dialogContent instead
    contentAppended: false, //state
    $dialog, //modal dialog
    $dialogContent, // modal dialog content
    $closeBtn,
    id: modalID,
    $modal, //outermost element
    close: () => _.close(), //disable modal fn
    show: false //state
}
```

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<section class="modal-section container">
    <h2 id="section-modal">Modal</h2>

    <div>
        <h3>Modal with Hidden Content</h3>
        <p>Modal with grabbing content from the page in a hidden section.</p>
        <a href="#modal-content" class="button btn-modal"
            data-modal-options="{closeBtnLabel:'Close it up'}">Modal with content from DOM</a>

        <h3>Modal With Generated Content</h3>
        <p>Content that is generated from some source. Could be an AJAX call, or in this case just defined in the JS.</p>
        <button type="button" class="button" id="btn-gen-content">Generated Content</button>
        

        <h3>Modal Group / Carousel</h3>
        <p>Carousel of items. Note: the 'carousel' portion is done with additional scripting separate from the modal.</p>

        <div class="modal-section__group">
            <button type="button" 
                data-img-src="https://picsum.photos/600/400"
                alt="Picsum Pic 1" class="pic-group"
            >
                <img src="https://picsum.photos/600/400" alt="Picsum Pic 1" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/900/550"
                class="pic-group"
            >
            <img src="https://picsum.photos/900/550" alt="Picsum Pic 2" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/900/450"
                class="pic-group"
            >
                <img src="https://picsum.photos/900/450" alt="Picsum Pic 3" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/800/600"
                class="pic-group"
            >
                <img src="https://picsum.photos/800/600" alt="Picsum Pic 4" loading="lazy"/>
            </button>
        </div>
    </div>

     <div style="display: none;" hidden>
        <div id="modal-content">
            <h1>Pop-up</h1>
            <p>This is for a basic modal content</p>
            <p>Cum sociis natoque <a href="#"> some link </a>penatibus et magnis dis parturient. Etiam habebis
                sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. <button
                    type="button" disabled>Some Button</button> Unam incolunt Belgae, aliam Aquitani, tertiam.
                Nihil hic munitissimus habendi <button type="button">clickable btn</button> senatus locus, nihil
                horum?</p>
        </div>
    </div>
</section>
```
__JavaScript__
```javascript
{
    $be('.btn-modal').modal({
        modalID: 'from-dom'
    });

    $be('#btn-gen-content').modal({
        locationFilter: 'modal',
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) {
         
            modalObj.$dialogContent.on('click', modalObj.close,'button.dismiss');

            modalObj.$dialogContent.insert(
                `<h2>Some generated Content</h2>
                <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
                <button type="button" class="button dismiss">Dimiss</button>`
            );
        }
    });

 

    // quick and dirty image carousel
    const $picGroup = $be('.pic-group');

    $picGroup.each((elem, index) => {
        
        let imgIndex: number = index;

        const 
            modalID = 'pic-group_' + index,
            imgDefaultSrc = elem.dataset.imgSrc,
            img = make('img', {loading:'lazy', src: imgDefaultSrc, alt: ''}),
            setImgSrc = (decrement: boolean) => {
                if (decrement)  imgIndex = imgIndex === 0 ? $picGroup.size - 1 : imgIndex - 1;
                else            imgIndex = imgIndex === $picGroup.size - 1 ? 0 : imgIndex + 1;
                
                return ($picGroup.elem[imgIndex] as HTMLElement).dataset.imgSrc || '';
            }
        ;

        $be(elem).modal({
            modalID,
            modalCss: 'modal--gallery', 
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                modalObj.$dialogContent.insert(img).insert(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `).on('click', (e, elem) => {
                    const decrement = $be(elem).hasClass('prev-btn');
                    img.src = setImgSrc(decrement);    
                },'button');
            },
            onOpen(modalObj) {
                $be(window).on('keyup.gallery', function(e:KeyboardEvent){
                    const arrowLeft = e.key === 'ArrowLeft';

                    if (e.key === 'Escape') modalObj.close();
                    if (e.key === 'ArrowRight' || arrowLeft) {
                        img.src = setImgSrc(arrowLeft);
                    }
                });
            },
            onClose() {
                $be(window).off('keyup.gallery');
            }
        });
    });
} 
```

<br>
<br>
<br>
<h2 id="nav-desktop-plugin">Desktop Navigation (Enhanced)</h2>


### Features
This plugin adds a delay to the desktop navigation and for the nestled `<ul>`'s that fly out. Also, features an edge detection on the drop-down `<ul>` elements, and uses corresponding CSS to position, so it stays on the page.

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
subMenuText | string | 'toggle menu for' | Copy to prefix the button that toggles the sub-menu of a list item.
insertToggleBtnAfter | string | 'a' | the element selector name for inserting the toggle button after.
slideDuration | number | 400 | Duration for showing a sub menu item, CSS transistion should correspond.
outerElement | string or HTMLElement | document.body | Element to attach `menuOpenCss` class to.
cssPrefix | string | 'menu' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
menuBtnSkip | () => : boolean \| (li) => boolean | Function that takes the `li` as the parameter, which tests whether or not to skip adding a button adjacent to it's `<a/>` element. Ex. (in the mark-up) `<li class="skip-li">` and the config the following: `menuBtnSkip(li) { return li.classList.contains('skip-li')}` in which it'd skip adding a button to that level in the nav.
menuBtnCss | string | 'i i-arrow-b' | CSS class for the indicating element as to the sub menu open/closed status.
animateHeight | boolean | true | Animates the height of the list. Good if you want the `<ul>` to fade-in rather than scroll open (with corresponding CSS written of course).
afterNavItemOpen | function | ($li) => {} | Function to run after an nav item is opened.
afterNavItemClose | function | ($li) => {} | Function to run after a nav item is closed.
afterOpen | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is open.
afterClose | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is closed.
doTrapFocus | boolean | true | Traps the focus to just the visible anchors and buttons within the navigation.
trapFocusElem | string | null | selector string (or can be dom element) if we need to extend the trap focus slightly outside the main nav element.
stopPropagation | boolean | true | Stops the click from propagating up in the DOM from the nav element.
bkptEnable | number | null | Optionally specify when to enable the mobile navigation with screen width (in pixels). This will override whether or not the `enableBtn` is visible, which is the conditional that enables this menu to function. 
### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<nav id="main-nav">
	<button class="mobile-nav-btn" id="mobile-nav-btn">
		<span></span>
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
This plugin is for parallaxing page elements (and yes background images). Use the `bgFill` option and it'll magically expand to the height of its container if using a background image. It uses the `translate3d` property as its more efficient than using a `top` or `left` as well as `requestAnimationFrame`. Can be used to move elements either with a Y or X axis, also a Z axis for zooming (use `perspective` CSS prop on parent to work).

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------

speed | number |  7 | Speed of the scroll. A negative amount will move it in the opposite direction.
zSpeed | number |  5 | Speed of the z-axis. A negative amount will move it in the opposite direction.
axis | string | 'y' | Axis of movement, it can be 'y','x'.
zAxis | boolean | false | If `true` used will utilize the z-axis.
cssPrefix | number |  'parallax' | CSS class name for styling purposes. Other derived CSS classes use the BEM naming convention.
scrollAxis | number |  'y' | The axis of which the parallax is based on.
relativeElem |  boolean \| HTMLElement \| string | false | If you need to bsae the parallaxing of one element relative to the offset of it's parent. 
bgFill | number |  false | If the parallaxing element is a background image, this adds extra height to ensure it fills the it's containing element.
rootMargin | number\| \[number,number\] | 0 | Delay the parallax effect relative to the viewport. Pass in an array \[start,end\] for tighter control.
scrollMaxPxStop | number |  5000 | The max an item can scroll. Make this less should you want it to stop prior to exiting the screen. Good for when you have content that it shouldn't overlap. 
zScrollMaxPxStop | number |  2000 | Max an item can scroll regarding the z-axis.
minWidth | number | null | The minimum width for the parallax effect to run.
maxWidth | number | null | The maximum width for the parallax effect to run.

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<section class="container">
   
    <h2 id="section-parallax">Parallax</h2>
    <div class="parallax-area">
        <img class="parallax-area__bg parallax do-parallax"
            data-parallax-options="{speed: 20, bgFill: true, zAxis: true, rootMargin: 100}"
             src="https://picsum.photos/1920/760"
            srcset="https://picsum.photos/960/760 959w, https://picsum.photos/1920/760 960w"
            size="(max-width: 959px) 959px, 960px" 
            loading="lazy"
        />
    </div>
    <div>
        <h3>Randomized Movement</h3>
    </div>
    <div class="container parallax-tiles">
        <div class="parallax do-parallax"
            data-parallax-options="{speed: 10, bgFill: false, scrollMaxPxStop: 120}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed:30, bgFill: false, scrollMaxPxStop: 220, axis: 'x'}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed:-10, bgFill: false, scrollMaxPxStop: 120}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed: -20, bgFill: false, scrollMaxPxStop: 180}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax" data-parallax-options="{speed:-20, bgFill: false, axis: 'x'}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax" data-parallax-options="{speed:-10, bgFill: false, axis: 'x', rootMargin: [200,0]}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div> 
    </div>
    <div>
        <h3>Scroll Horizontally</h3>
        <button class="btn" id="jsBtnSCrollHorizontal">Add space for horizontal scrolling</button>
    </div>
    <div class="parallax-area">
        <img class="parallax-area__bg parallax -do-parallax do-parallax--hz" 
            data-parallax-options="{speed: -10, axis: 'x', bgFill: true, scrollAxis: 'x'}"
            src="https://picsum.photos/1920/760"
            srcset="https://picsum.photos/960/760 959w, https://picsum.photos/1920/760 960w"
            size="(max-width: 959px) 959px, 960px" 
            loading="lazy"
        />
    </div>
</section>
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
<h2 id="scroll-spy-plugin">Scroll Spy</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix  | string | 'scroll-spy' | CSS class name for styling purposes
observerOptions | IntersectionObserverInit | `{rootMargin: "0px", threshold: 1}` | Intersection observer options. By default this is set-up to work with an `<h2 id="the-id">` with a `threshold` of `1` is most appropriate. This should be adjusted if your spying an entire section instead.
spyNavElems| 'a' \| 'button' | `a` | Elements to look at and highlight in the navigation that is being spied.
setActiveCssToLi | boolean | true | If the spied element resides in a `<li>` attach the active class to that instead of the element
spyBody | Selector | '.scroll-spy-body' | A selector to identify the section of the hightlighted elements that pair with the 'spyNavElems'
spyElems | string | 'h2' | String to identify which elements to see that have entered in thew viewport. The observer options (seen in `observerOptions`) are set-up to look at headings. As mentioned above, to look at sections please adjust the `threshold` from 1 to something that is more appropriate.
callback | ScrollSpyCallBack | `undefined` | Callback to tap into the entries being spied on.
 
```typescript
type ScrollSpyCallBack = (topMostEntries: HTMLElement[], navEntries: HTMLElement[]) => void;
```


### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<!--Nav to Spy-->
<nav id="main-nav" class="main-nav">			 
    <ul>
        <li><a href="#section-parallax">Parallax</a></li>
        <li><a href="#section-tabs">Tabs</a></li>
        <li><a href="#section-collapse">Collapse</a></li>
        <li><a href="#section-toastr">Toastr</a></li>
        <li><a href="#section-modal">Modal</a></li>
        <li><a href="#section-selectEnhance">Select Box Enhance</a></li>
        <li><a href="#section-nav">Accessible Menu / Mobile and Desktop Nav</a></li>
        <li><a href="#section-lazyLoad">Lazy Load</a></li>
    </ul>
</nav>

<!--Body to spy that pairs with the nav-->

<div class="scroll-spy-body">

    <h2 id="section-parallax">Parallax</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quae vero auctorem tractata ab fiducia dicuntur.</p>

    <h2 id="section-tabs">Tabs</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quae vero auctorem tractata ab fiducia dicuntur.</p>
    <!-- and more ...-->
</div>
```

__JavaScript__

```javascript
 $('#main-nav').scrollSpy({
        spyBody: '.scroll-spy-body',
        locationFilter: 'spy',
        observerOptions: {
            rootMargin: "80px 0px 0px",
            threshold: 1
        }
})

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
cssListModifer | string | null | Value that will serve as a modifier class to the list. Neccessary if the list dropdown is divergent from the rest of the site.
mobileNative | boolean | false | Off by default this doesn't render the stylized dropdowns for mobile devices.
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
__JavaScript__
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
cssPrefix | string | 'tab' | The CSS that prefixes every relevant structural element contained within. Uses BEM convention.
locationFilter | string | null | Key name of the param to be captured in the location URL. Example: `YOUR_URL#tab=the-item-id`.
loadLocation | boolean | true | Add in location hash parameters to load default tabs. `#files=files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
historyType | 'push'\|'replace' | 'push' | If using using `useLocationHash` or a history of events, 'push' pushes a new state, and 'replace' replaces the current.
tabbing | boolean | true | Enables tabbing with keyboard arrows. A tab list should only be focusable one at a time with the 'tab' key.
tabDirection| string | 'horizontal' | Typically tabs are 'horizontal' but may also go 'vertical'. They take either or as an option, otherwise it'll throw a `console.warn` to correct.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
ariaLabel | boolean | true | Adds an 'aria-label' attribute to the panel for ADA compliance. Set to false if an equivalent exists in the mark-up.
tabChange | (tabId: string, prevTabId: string, tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | (tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run after the the plugin intializes, passed variables are the  'tabs list', 'tabs body' elements.


### Example

__The following is an example html structure for this plugin:__


__HTML__
```html
<section class="container">
    <h2 id="section-tabs">Tabs</h2>
    <div class="tabs__container tabs-outer">
        <div class="inline-ul tabs__nav" role="menubar">
            <ul>
                <li><button data-href="#description"><span>Description</span></button></li>
                <li><button data-href="#files"><span>Files</span></button></li>
                <li><button data-href="#requirements"><span>Requirements</span></button></li>
                <li><button data-href="#instructions"><span>Instructions</span></button></li>
                <li><button data-href="#files2"><span>Additional Info</span></button></li>
                <li><button data-href="#related"><span>Related</span></button></li>
            </ul>
        </div>
        <div class="tabs__body">
            <div data-tab-id="description" class="tabs__panel">
                <div class="tabs__container tabs-inner inner-one">
                    <div class="inline-ul tabs__nav" role="menubar">
                        <ul>
                            <li><button data-href="#description-inner"><span>Description Inner</span></button></li>
                            <li><button data-href="#files-inner"><span>Files Inner</span></button></li>
                            <li><button data-href="#requirements-inner"><span>Requirements Inner</span></button></li>

                        </ul>
                    </div>
                    <div class="tabs__body">
                        <div data-tab-id="description-inner" class="tabs__panel">
                            <p><strong>Description Inner</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam,sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
                        </div>
                        <div data-tab-id="files-inner" class="tabs__panel">
                            
                            <p>Non equidem invideo, miror magis posuere velit aliquet. Qui ipsorum lingua Celtae, nostra galli appellantur. Phasellus laoreet lorem vel dolor tempus vehicula. Plura mihi bona sunt, inclinet, amari petere vellent.</p>
                        </div>
                        <div data-tab-id="requirements-inner" class="tabs__panel">
                            
                            <ul>
                                <li>Something in a list item</li>
                                <li>Something in a list item</li>
                                <li>Something in a list item</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div data-tab-id="files" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
               
            </div>
            <div data-tab-id="requirements" class="tabs__panel">
                <p><strong>Description</strong> quis aute iure reprehenderit in voluptate velit esse. Quam diu etiam furor iste tuus nos eludet? Ambitioni dedisse scripsisse iudicaretur porkchops.</p>
                
            </div>
            <div data-tab-id="instructions" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
            
            </div>
            <div data-tab-id="files2" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
            </div>
            <div data-tab-id="related" class="tabs__panel">
                 
                <p>Nec dubitamus multa iter quae et nos invenerat. Integer legentibus erat a ante historiarum dapibus.
                    Curabitur est gravida et libero vitae dictum.</p>
            </div>
        </div>
    </div>
</section>
```

__JavaScript__
```javascript
$(".tabs__container").tabs({
	onInit: (tabId, prevTabId, tabsList, tabsBody) =>{
		// do something ...
	},
	tabChange: (tabsList, tabsBody) =>{
		// do something to start
	}
});

```

<br>
<br>
<br>
<h2 id="toastr-plugin">Toastr</h2>
Little toastr messages for everyone, side of marmalade optional.

### Features
Can set groups of toastr's with the `cssGroupKey` if there ever needs to be multiple toastr's at once in various positions.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
duration | number | 3000 | The duration in milliseconds the toastr message will appear for.
appendTo | HTMLElement | `document.body` | HTML element to append the toastr message to.
ariaLive: POLITENESS_SETTING | 'polite' | Aria Live property messaging settings
animationDuration | number | 500 | Amount of time the transitional css class will append to the class list of the element.
content | string OR HTMLElement | '' | Message text/HTML of the toastr.
outerCss | string | 'toastr' | CSS class to the div container of the message.
enabledCss | string | 'toastr--enabled' | CSS to show the toastr message
dismissCss | string | 'toastr--dismiss' | CSS to dismiss the toastr message
btnDismissCss | string | 'toastr__btn-dismiss' | CSS for the dismiss button element.
closeIconCss | string | 'ico i-close' | Icon CSS to draw the 'X' or what have you to dismiss the toastr.
cssGroupKey | string | 'std' | Key which is used to group together like Toastr messages. Additionally as a CSS concatenated prop, keep that in mind.
oneOnly | boolean | true | launches only one at a time.

### Example

__Add these clicks to buttons or other elements should they be applicable:__

__HTML__
```html
<h3>Toastr</h3>
<ul>
	<li><button id="toastr-1">Launch a Toastr</button></li>
	<li><button id="toastr-2">Launch a Toastr Two</button></li>
	<li><button id="toastr-3">Launch a Toastr Three</button></li>
	<li><button id="toastr-4">Launch a Toastr Four</button></li>
</ul> 
```
__JavaScript__
```javascript
	// Example 1: standard way
    $('#toastr-1').toastr({
        content: 'Toast is good for breakfast',
        duration: 7000
    });
	
	// and you can make an update here which will use the same instance
	// note: any props that build the html elements cannot be updated
	// unless of course you destroy the instance and rebuild it.
	$('#toastr-1').toastr({ content: 'A new toast message'});


    // Example 2: extend perhaps in Cash then call on click
    const toastr1 = new $.toastr($('#toastr-2')[0] as HTMLElement, {
        content: 'Toast is good for breakfast',
        duration: 5000
    });
    const toastRandomMsgs = [
        'I boast about my toast.',
        'The hostess with the toastess',
        'toast is best, when its not burnt',
        'The fire is quite toasty',
        'Lets toast, to toast!'
    ]
    const randomToastMsg = () => {
        return toastRandomMsgs[Math.floor(Math.random() * toastRandomMsgs.length)]
    }

    $('#toastr-2').on('click',function(){
        setTimeout(() => {
            toastr1.setContent(randomToastMsg(),true)
        },2500)
    });

    // Example 3,4: somewhere else on the page
    $('#toastr-3').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });

    $('#toastr-4').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
```


## Release Notes

### __Version 6.0.0__
Major changes to the `SelectEnhance` plugin so the dropdown is appended to the body which resolves issues with anything overflow hidden. Will not work with current CSS in Verion 5, which is why this is bumped up a Major Version. Also, fixed bug in `Parallax` which occurs when jQuery is used.