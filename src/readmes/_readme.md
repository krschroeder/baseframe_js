# Base_Frame Plugins &amp; Common JS

Common and needed JavaScript functionality for websites. The scripting features plugins for collapsible sections, popups, parallaxing elements, tabs and more. It features utilities for setting and getting cookies, smooth scrolling (without jQuery), throttled resizing, querystring parameter filtering and more. The plugin's are configurable and consistent. This scripting is designed to be imported in easily so you can start building!

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features and Advantages
### It's small!
Combined all together (with my minification settings at least) its ~ 52k. Add that with Cash and its less than jQuery alone!

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
    Collapse,
    EqualizeContent,
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

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary(true);

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

## Using Styles For Plugins
Styles are located in the `src/assets/scss/` directory and all can be grabbed that way and added on in. Still should do a little more work in updating the SCSS variables to be frank. So I would just drag those files into the project directly (which is what I just do). I think it's painful anways to import in then override defaults in your own file. Bringing it in (IMO) is little more elegant.


## Plugin Names and What They Do.

### Collapse 
It's is for toggling collapsible sections. Can be used like an accordion and etc. 
__[View](#collapse-plugin)__

### Navigation Desktop
This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. 
__[View](#nav-desktop-plugin)__

### Navigation Mobile
Neat little mobile navigation plugin 
__[View](#nav-mobile-plugin)__

### Equalize Content
When Flexbox, or other options won&rsquo;t work, use this to equalize content 
__[View](#equalize-plugin)__

### Marketo Form
Have you tried to style a Marketo form? It is not too fun to do! This should help slimplify the process so you won&rsquo;t pull your hair out. 
__[View](#marketo-form-plugin)__

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

### Class Set-up for using `LibraryExtend`

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

### Essential Functions

#### libraryExtend
Pass in an `array` for the first argument, or a single plugin class, and `notify` is optional defaulted to false. `notify` console log's when parameters get updated on an instance.

```javascript
libraryExtend(plugins:Array<Plugins> ,notify?:boolean)
```


#### installStoreToLibrary

Pass in the first attribute to add in the `expose` method, which allows you to see all the data stored in the Map.

```javascript
installStoreToLibrary(expose?:boolean) 
```

#### $.store

Inside the $.store method is the following structure. The first parameter can be an `HTMLElement` or a `$(HTMLElement)`. The second parameter is a `string` and is the identifier on on which the data is stored. Multiple properties can be stored on the same element. In the plugin's the instance (`PluginName_instance`) is saved, as well as the instance paremeters (`PluginName_params`). Not going to lie, this was started from Bootstraps (which gets its credit in the code), but altered to be little more of its own.

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
    //shows the all the data stored in the Map
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
@@include('./collapse.md')
<br>
<br>
<br>
@@include('./equalize-content.md')
<br>
<br>
<br>
@@include('./marketo-form.md')
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
@@include('./popup.md')
<br>
<br>
<br>
@@include('./responsive-dropdown.md')
<br>
<br>
<br>
@@include('./tabs.md')