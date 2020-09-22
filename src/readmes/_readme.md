# Base_Frame Plugins &amp; Common JS

Common/expected/needed/integrated JavaScript functionality for websites. You'll notice a few token are missing (like a carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use those others, they're great. The ones here are configurable, and as its set up now easy to import in.

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features and Advantages
### Its small!
Combined all together (with my minification settings at least) its ~ 49k. Add that with Cash and its less than jQuery alone!

### Pass in parameter options with a `data-` attribute
The data attribute is always the `data-` (of course) and then the plugin name `pluginName` followed by `-options`.

__For Example:__ all have options that can be plugged in as a data attribute, in object literal format.

```html
<div id="your-plugin-elem" data-pluginName-options="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```
### Update parameters after init!
__For Example:__ all can have their configuration change when added into `$.fn`. Which can come in handy sometimes when things get complex. Could come in handy for instance when you have an accordion (or collapsible section) and on mobile you want it to scroll to the top on open (that plugin does that!), but not on desktop.
    
```javascript
$('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
```

### Callbacks after events

Lots of callback functions to run after and before events and such that may help you out when you need it most.

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
    formInputs,
    smoothScroll
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

## Plugin Names and What They Do.


### Collapse 
Its basically like an Accordion, but more configurable 
__[View](#collapse)__

### Navigation Desktop
This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. 
__[View](#nav-desktop)__

### Navigation Mobile
Neat little mobile navigation plugin 
__[View](#nav-mobile)__

### Equalize Content
When Flexbox, or other options won&rsquo;t work, use this to equalize content 
__[View](#equalize)__

### Marketo Form
Have you tried to style a Marketo form? It is a disaster! This should help slimplify the process so you won&rsquo;t pull your hair out. 
__[View](#marketo-form)__

### Parallax Background
For making a parallaxing background 
__[View](#parallax)__

### Popup
There is like a few dozen of these, right?! Well this is easy to style and configurable. 
__[View](#popup)__

### Responsive Dropdown
Turn your left secondary navigation (or list of options) into a dropdown for mobile!
__[View](#responsive-dropdown)__

### Tabs
Tabs in tabs, change onhashchange, dream big, become starry-eyed, this does it all :-) 
__[View](#tabs)__
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
libraryExtend(plugins:array [,notify:boolean])
```


#### installStoreToLibrary

Pass in the first attribute to add in the `expose` method, which allows you to see all the data stored in the Map.

```javascript
installStoreToLibrary([,expose:boolean]) 
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

#### formInputs
formInputs function currently adds in space-bar support for radio buttons, and checkbox inputs. As long as there is a `for` attribute on a `<label>` that maps to an input.

```javascript
formInputs.init();
```

#### smoothScroll

First parameter is the HTMLElement's top to scroll to position top, the second is the speed. Default speed is 100. This uses the `window.scroll` so should work cross-browser. This stops scrolling if the previous pixel is the same as the next, if the scroll tries to get broken, or if it can't scroll to anymore.

```javascript
smoothScroll(scrollToTop :number [,speed: number]);
```

#### cookies

Getting and setting cookies made easy!
 
__params__
Option |  Description
------ | ---- 
path | path to the cookie, default is the current `location.pathname`
expires | set in minutes. Time the cookie will expire.
secure | if it can only be accessed via https. This gets set automatically when `sameSite` is set to `None`
sameSite | `Lax`, `Strict` or `None` are the options


```javascript
//setting a cookie
cookies.set(name:string,value:string,{path:'/',expires: 60, secure: true, sameSite: 'Lax'});

//getting a cookie
cookies.get(name,{path: '/'});

//removing a cookie
cookies.remove(name,{path:'/path/to-your/cookie'});

//maybe you want to extend $ ?
$.extend({cookies: cookies});
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