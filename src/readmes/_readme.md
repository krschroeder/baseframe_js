# Baseframe JS #
A suite of useful JavaScript plugins and functions for front-end development. Instead of searching for unconnected plugins that may not work together well, this suite does. The package features plugins for collapsible sections, modals, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling, throttled resizing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent with each other.

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
    throttledResize,
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
import throttledResize from 'baseframe-js/dist/js/fn/throttleResize';
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
@@include('./select-enhance.md')
<br>
<br>
<br>
@@include('./tabs.md')
<br>
<br>
<br>
@@include('./toastr.md')