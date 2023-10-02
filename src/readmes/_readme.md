# Base_Frame Plugins &amp; Functions

A suite of useful Javascript plugins and functions to help with front-end development on websites. Instead of searching for unconnected plugins that may not work together well, this suite is to help remedy that. It's not to solve every problem with front-end web development, but the most common. The scripting features plugins for collapsible sections, popups, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling (without jQuery, or with CSS), throttled resizing, querystring parameter filtering and more. The plugin's are meant to be configurable and consistent. This scripting is designed to be imported in easily so you can start building!

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features
### It's small!
Combined all together its ~ 65k. Add that with Cash and its less than jQuery alone!

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

### Barrel File

This project is set-up with a __barrel file__ or a single reference to everything in the project. This is the neater syntax, but the drawback to this is that it will not tree-shake the unused imports.

```javascript
import installStoreToLibrary, {
    installStoreAsDataToLibrary,
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr,
    cookies,
    formInputs,
    smoothScroll,
    throttledResize,
    trapFocus
} from 'baseframe-js';
```

### Individual Imports (Recommended)

This is the recommended way to bring everything in. Not a 'neat' as the use of the barrel file, but this will reliably tree-shake anything unused in the project. 

```javascript
// necessary functions
import installStoreToLibrary from 'baseframe-js/build/js/util/install-store-to-library';
// or to extend as $.data to mimick jQuery's
import installStoreAsDataToLibrary from 'baseframe-js/build/js/util/install-store-as-data-to-library';

import libraryExtend from 'baseframe-js/build/js/util/library-extend';

// Plugins individually (best for TS type support)
import AccessibleMenu from 'baseframe-js/build/js/accessible-menu';
import Collapse from 'baseframe-js/build/js/collapse';

// some of the utility functions in the project...
import throttledResize from 'baseframe-js/build/js/util/throttle-resize';
import smoothScroll from 'baseframe-js/build/js/util/smooth-scroll';
import trapFocus from 'baseframe-js/build/js/util/trap-focus';
```

### Plugins and the \$.store (or \$.data) method.

If the `libraryExtend` function is used to extend the plugins in __Cash Dom__, when initialized the plugin instance is stored to the element. In __Cash Dom__ the data method doesn't work the same as it does (by design) with jQuery's, so a `$.store` method was made to essentially mimick that. If using jQuery, this function call can be ignored.

```javascript
// necessary for all plugin's to operate
// much like jQuery's $.data method, the $.store is similar
// NOTE: this can be ignored if using jQuery, and it'll fallback to its 
// $.fn.data method to store instances and their params.
installStoreToLibrary(true);
// or the following function to mimick jQuery's data fn
installStoreAsDataToLibrary(true);
```
### Extending into the Library

By default the plugin's don't extend into the __Cash Dom__ library, rather they need to be explicitly extended. This applies the same if using jQuery of course as well.

```javascript
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

## Using Styles For Plugins
Styles are located in the `src/assets/scss/` directory and all can be grabbed that way and added on in. Still should do a little more work in updating the SCSS variables to be frank. So I would just drag those files into the project directly. The SCSS should be pretty minimal and generic so it'll more easily take on custom styling.


## Plugin Names and What They Do.

### Accessible Menu
Adds tabbing, allows the use of arrows for toggling around the navigation, which is configurable depending on the menu design. The use of the escape key to go up a level.<br>
__[View Accessible Menu](#accessible-menu-plugin)__

### Collapse 
It's is for toggling collapsible sections. Can be used like an accordion and etc.<br>
__[View Collapse](#collapse-plugin)__

### Equalize Content
When Flexbox, or other options won&rsquo;t work, use this to equalize content. With current CSS will very seldom, if ever really need to be used <br>
__[View Equalize Content](#equalize-plugin)__

### Lazy Load
Load background images and images lazily once they appear in the viewport! Also, run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` API.<br>
__[View Lazy Load](#plugin-lazy-load)__

### Modal
This is a more minimalistic version of the 'popup' plugin. Nice bit of flexibility do things like image carousels, confirm prompts and such with just a little peppering of custom code.<br>
__[View Modal](#modal-plugin)__

### Navigation Desktop
This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page.<br>
__[View Navigation Desktop](#nav-desktop-plugin)__

### Navigation Mobile
Neat little mobile navigation plugin.<br> 
__[View Navigation Mobile](#nav-mobile-plugin)__

### Parallax Elements
For making a parallaxing elements on the page. Lots of configurable options.<br>
__[View Parallax Elements](#parallax-plugin)__

### Select Enhance
Enhance a selectbox.<br>
__[View Select Enhance](#select-enhance-plugin)__

### Tabs
Tabs in tabs, change onhashchange this does it for tabs!<br>
__[View Tabs](#tabs-plugin)__


### Toastr
Toastr for little dissmisable message to notify a user!<br>
__[View Tabs](#toastr-plugin)__
#### Removing the plugin ####

Each plugin can be removed by calling `$('.plugin-selector').plugin('remove')`, and it'll call the static method to remove it and all its components. Or if you want it can be stored as a method `$.plugin.remove($('.plugin-selector').eq(1))` or `$.plugin.remove('.plugin-selector')` and done that way.


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
// the third option 'Lib' allows a user to pass in either 
// jQuery or Cash library to extend the plugin's to. 
libraryExtend(plugins:Array<Plugin> | Plugin, notify?:boolean, Lib: $)
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
@@include('./accessible-menu.md')
<br>
<br>
<br>
@@include('./collapse.md')
<br>
<br>
<br>
@@include('./equalize-content.md')
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