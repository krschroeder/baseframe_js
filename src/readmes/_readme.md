# Baseframe JS #
A suite of useful JavaScript plugins and functions for front-end development. Instead of searching for unconnected plugins that may not work together well, this suite does. The package features plugins for collapsible sections, modals, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling, debounced resizing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent with each other.

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

### Extending into a Library ###
These plugins are designed to be installed into jQuery or Cash-Dom library should you choose to use one fo those external library's.

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

#### Typescript Support with Extending into a Library

To get these to work in [jQuery](https://jquery.com/) or [Cash Dom](https://github.com/fabiospampinato/cash#readme) adding the following in project should resolve any TypeScript errors.

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

### Essential Functions ###

#### libraryExtend ####
First parameter can be one Plugin, or an array of them. Pass in the second param which will notify the user of updated parameters (good for development). Third options if you just want to specify the library your extending it into.

```typescript
// the third option 'Lib' allows a user to pass in either 
// jQuery or Cash library to extend the plugin's to. 
libraryExtend(plugins:Array<Plugin> | Plugin, notify?:boolean, Lib: Cash | jQuery | BaseElem);
```

### Functions

#### smoothScroll

First parameter is the `HTMLElement`'s top to scroll to position top, the second is the speed. Default speed is 100. This uses the `window.scroll` so should work cross-browser. This stops scrolling if the previous pixel is the same as the next, if the scroll tries to get broken, or if it can't scroll to anymore. Third argument is a callback function to run after the scrolling is done. The 4th parameter is the arguments for that function if necessary.

```typescript
smoothScroll(scrollToTop :number ,speed?: number , afterScroll?:(...args:any) => void, afterScrollArgs?:Array<any>);
```

#### focusTrap
This is used in the `Modal` plugin to trap the focus of tabbing events to just the available focusable elements. Each tab keypress it re-takes inventory on what is available to tab to, this way any dynamic changes can be accounted for.

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