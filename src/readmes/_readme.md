# Baseframe JS #
Baseframe JS is a suite of useful, connected plugins and scripting for Front-end development. The package features plugins for collapsible sections, modals, parallaxing elements, tabs and more. It has functionality for setting and getting cookies, smooth scrolling, debouncing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent with each other so you can just build.

## Features ##

### Pass in parameter options with a `data-` attribute
The data attribute is always the `data-` and then the plugin name `pluginName` followed by `-options`.

__For Example:__ all have options that can be plugged in as a data attribute, in object literal format.

```html
<div id="your-plugin-elem" data-pluginName-options="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```

### Update Parameters After Initialization ###
Once initialized, each plugin when re-accessed (when not 'removed') will only get updates to their parameters. This is good for instance when you have a collapsible section and on mobile you want it to scroll to the top after a section opens. This works for the vast majority of params, but not all depending on which ones. For example, I can specify a 'click' event and that can only be set on 'init'. However, each plugin can be 'removed' and then re-installed as well.
    
```javascript
$('.your-plugin-elem').plugin({change:'changed', height: 1e6})
```

### Callbacks after events ###
Each plugin features various callback functions to run after and before events.

## Usage ##
You can bring in all the scripting the following way:

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
    debounce,
    debounceResize,
    focusTrap
} from 'baseframe-js';

// if tree-shaking out unused code just do individual imports
import libraryExtend from 'baseframe-js/dist/js/core/libraryExtend';
import AccessibleMenu from 'baseframe-js/dist/js/AccessibleMenu';
import Collapse from 'baseframe-js/dist/js/Collapse';
// ...etc
```

### Extending into the jQuery, Cash or Base Elem Js Library ###
These plugins are designed to be installed into jQuery, [Cash-Dom](https://www.npmjs.com/package/cash-dom), or the [Base Elem Js](https://www.npmjs.com/package/base-elem-js) libraries. Base Elem Js is used as this projects only dependency.

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
],$libary); 
```

#### Typescript Support with jQuery or Cash

To get these to work in [jQuery](https://jquery.com/) or [Cash Dom](https://github.com/fabiospampinato/cash#readme) adding the following in project should get it to work with TypeScript.

```typescript

import libraryExtend, {
    // Bring in the 'type' as well
    Collapse,       type CollapsePlugin,
    LazyLoad,       type LazyLoadPlugin,
    Modal,          type ModalPlugin,
    Tabs,           type TabsPlugin,
    Toastr,         type ToastrPlugin,
    AccessibleMenu, type AccessibleMenuPlugin,
    NavDesktop,     type NavDesktopPlugin,
    NavMobile,      type NavMobilePlugin,
    Parallax,       type ParallaxPlugin, 
    SelectEnhance,  type SelectEnhancePlugin,
    ScrollSpy,      type ScrollSpyPlugin
} from 'baseframe-js';

// To extend into the jQuery library (with the use of the '@types/jquery' package)
declare global {
    interface JQuery<TElement = HTMLElement> extends
        CollapsePlugin,
        LazyLoadPlugin,
        ModalPlugin,
        TabsPlugin,
        ToastrPlugin,
        AccessibleMenuPlugin,
        NavDesktopPlugin,
        NavMobilePlugin,
        ParallaxPlugin,
        SelectEnhancePlugin,
        ScrollSpyPlugin {}
}

// To extend into the 'Cash Dom' Libary
declare module 'cash-dom' {
    interface Cash extends
        CollapsePlugin,
        LazyLoadPlugin,
        ModalPlugin,
        TabsPlugin,
        ToastrPlugin,
        AccessibleMenuPlugin,
        NavDesktopPlugin,
        NavMobilePlugin,
        ParallaxPlugin,
        SelectEnhancePlugin,
        ScrollSpyPlugin {}
}

```

### Removing the plugin ###
Each plugin can be removed by calling `$('.element').plugin('remove')`, and it'll call the static method to remove it and all its components. Or if you want it can be stored as a method `$.plugin.remove($('.element').eq(1))` or `$.plugin.remove('.element')` and done that way.


## Using Styles For Plugins ##
Styles are located in the `src/assets/scss/` directory, and all can be grabbed that way and added on in. The SCSS is minimal and generic to do what you want with it.


## Available Plugins ##

### Accessible Menu ###
Adds tabbing, allows the use of arrows for toggling around the navigation, which is configurable depending on the menu design. Also adds functionality so the use of the escape key to close a menu dropdown.<br>
__[View Accessible Menu](#accessible-menu-plugin)__

### Collapse ###
It's for toggling collapsible sections. Can be used for an accordion and more.<br>
__[View Collapse](#collapse-plugin)__


### Lazy Load ###
Run functions as they enter and exit the viewport. Also, by default this loads backgrounds and images a before appear in the viewport--not when the first pixel enters in with the 'loading' attribute. This plugin uses `window.IntersectionObserver` API underneath the hood.<br>
__[View Lazy Load](#plugin-lazy-load)__

### Modal ###
A modal, that will give you flexibility to do various things. Features a focus-trap to ensure the focus of the keyboard cannot leave the modal, for ADA. It features a nice amount of flexibility with configurable options to do things like: confirm prompts, alerts, carousels (with additional scripting) and more.<br>
__[View Modal](#modal-plugin)__

### Navigation Desktop ###
This plugin allows a user to refocus their mouse over a dropdown in the navigation if they accidentally hover off. Also, features an edge detection on the drop-downs `<ul>`, and uses corresponding CSS to position, so it stays on the page. It's a<br>
__[View Navigation Desktop](#nav-desktop-plugin)__

### Navigation Mobile ###
A mobile navigation plugin to enable the menu and toggle sub-sections.<br> 
__[View Navigation Mobile](#nav-mobile-plugin)__

### Parallax Elements ###
For parallaxing elements on the page, parallax horizontally, vertically and zoom-in or out. Features a fill option for sections that you want to appear as background images.<br>
__[View Parallax Elements](#parallax-plugin)__

### Scroll Spy ###
For doing a scroll spy that will highlight navigational elements to their body anchor id elements.<br>
__[View Scroll Spy](#scroll-spy-plugin)__

### Select Enhance ###
Enhance a `<select>` element and it's options. Unlike a radio button or checkbox, a select element can't fully be styled without further HTML enhancement.<br>
__[View Select Enhance](#select-enhance-plugin)__

### Tabs ###
Supports tabs inside tab sections. Keyboard support with arrow keys working with ADA accessibility to ensure only one tab can be accessed at a time. Also, track the state of the tabs using history push or replace states.<br>
__[View Tabs](#tabs-plugin)__


### Toastr ###
Toastr for little dissmisable message to notify a user! Enable several at once, customize their positions and more.<br>
__[View Tabs](#toastr-plugin)__

<br>
<br>

------

### Functions ###

#### libraryExtend ####
This function allows for the consistent implementation of the plugins, into a DOM manipulation library.  

```typescript
// the second option '$library' allows a user to pass in either 
// jQuery, Cash or the BaseElem library to extend the plugin's into. 
libraryExtend(
  plugins: Array<Plugin> | Plugin, 
  Library: Cash | jQuery | BaseElem,
  notify?: boolean
);
```

**Parameters**
- **plugins**: can be one Plugin, or an array of them. 
- **Library**:  second parameter is the library to extend into. Currently can plug into __jQuery__, __Cash__, or the __Base Elem__ which is used in the package.
- **notify**: this final parameter console logs each udpated parameter when they get updated. Really meant only for development purposes to help debugging.

#### smoothScroll

The `smoothScroll` function enables smooth, animated scrolling to a specific element or position within a web page. This enhances user experience by providing a visually appealing transition rather than an abrupt jump. This function supports easing functions, and out the gate comes with some easing functions.

```typescript
smoothScroll(
    scrollTargetY: number,
    duration: number = 500,
    easing: EasingFn | Easings = 'easeOutQuint',
    scrollEndFn?: (...args) => void
);
```

**Parameters**

- **scrollTargetY** :  
  The destination to scroll to. pass in the Y position of the element you want to scroll to.
- **duration** (`number`, optional):  
  The time in milliseconds over which the scroll animation occurs. Defaults to 400ms if not specified.
- **easing** (`Easings | EasingFn`, optional):  
  accepts a custom easing function or the following string values: 'linear', 'easeInOutCubic', 'easeInOutQuart', 'easeOutQuint'.  


### Example Usage

```typescript
//Example using Base Elem Js
const $anchorNav = $be('.anchor-nav');

$anchorNav.on('click', (elem, e) => {
  const $target = $be(elem.hash);
  if ($target.hasEls) {
    const top = ($target.elem[0] as HTMLElement).offsetTop;

    smoothScroll(top, 400, 'easeInOutQuart');
  }
),'a');

```

#### focusTrap
To trap the focus of tabbing events to just the available focusable elements. Each tab keypress it re-takes inventory on what is available to tab to, this way any dynamic changes can be accounted for. This is used with the `Modal` plugin.

__params__
The parameters that make the `ITrapFocusProps` interface.

Option | Type | Default | Description
------ | ---- | ------- | -------
focusFirst | boolean | true | Focus's the first element
nameSpace | string | 'focusTrap' | Unique namespace for the tabbing keydown event.
focusableElements | string or array | ['button', 'a', 'input', 'select', 'textarea', '[tabindex]'] | A listing of focusable elements.

```typescript
const trappedFocus = focusTrap(element:Cash | HTMLElement, params?: ITrapFocusProps);
// to remove later on
trappedFocus.remove();

```

#### Cookies
Static class for or getting, setting and deleting cookies.

```javascript
//setting a cookie
Cookies.set('cookieName','your cookie value',{path:'/',expires: 60, secure: true, sameSite: 'Lax'});
```

**Parameters**
- **cookieName**: the cookie name
- **cookieValue**: the value of the cookie

__Cookies Set Configurable Options__
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
#### debounce

Debounces an event handler, ensuring the callback only fires after a specified delay since the last event. Useful for limiting how often a function runs, such as during rapid events like clicks or window resizing.

```typescript
debounce(
  elem: SelectorElem | string,
  event: EventName | EventName[],
  cb: EventFn,
  config?: { immediate?: boolean; delay?: number }
): void
```
**Parameters**
- **elem**: The element(s) or selector to bind the event to.
- **event**: The event name(s) to listen for (e.g., `'click'`, `'input'`).
- **cb**: The callback function to run after the debounce delay.
- **config**: Optional configuration object:
  - `immediate` (boolean): If `true`, the callback fires immediately on the first event, then debounces subsequent calls. Default: `false`.
  - `delay` (number): The debounce delay in milliseconds. Default: `100`.

**Example:**
```typescript
debounce('#my-button', 'click', (ev, elem) => {
  console.log('Button clicked (debounced)');
}, { delay: 300 });
```

#### debounceResize

Debounces the window resize event, ensuring the provided callback is only executed after the user has stopped resizing the window for a specified delay. This helps prevent performance issues caused by rapid firing of the resize event.

```typescript
debounceResize(
  cb: () => void,
  delay?: number
): void
```
**Parameters**
- **cb**: The callback function to execute after resizing has stopped.
- **delay**: Optional debounce delay in milliseconds. Default is `100`.

**Example:**
```typescript
debounceResize(() => {
  console.log('Window resize finished!');
}, 200);
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
@@include('./accessible-menu.md')
<br>
<br>
<br>
@@include('./collapse.md')
<br>
<br>
<br>
@@include('./lazy-load.md')
<br>
<br>
<br>
@@include('./modal.md')
<br>
<br>
<br>
@@include('./nav-desktop.md')
<br>
<br>
<br>
@@include('./nav-mobile.md')
<br>
<br>
<br>
@@include('./parallax.md')
<br>
<br>
<br>
@@include('./scroll-spy.md')
<br>
<br>
<br>
@@include('./select-enhance.md')
<br>
<br>
<br>
@@include('./tabs.md')
<br>
<br>
<br>
@@include('./toastr.md')


## Release Notes

### __Version 6.0.0__
Major changes to the `SelectEnhance` plugin so the dropdown is appended to the body which resolves issues with anything overflow hidden. Will not work with current CSS in Verion 5, which is why this is bumped up a Major Version. Also, fixed bug in `Parallax` which occurs when jQuery is used.