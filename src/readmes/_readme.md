# Base_Frame Plugins &amp; Common JS

Common/expected/needed/integrated JavaScript functionality for websites. You'll notice a few token are missing (like a carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use those others, they're great. The ones here are configurable, and as its set up now easy to import in.

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash is a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Features and Advantages

__For Example:__ all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)
```html
<div id="your-plugin-elem" data-plugin-name="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```

<p><strong>For Example:</strong> all can have their configuration change when added into `$.fn`. Which can come in handy sometimes when things get complex</p>
    
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
} from 'baseframe-js';

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

### libraryExtend
Pass in an `array` for the first argument, and `notify` is optional defaulted to false. `notify` console log's when parameters get updated on an instance.

```javascript
libraryExtend(Array [,notify])
````
Name | Description | Jump To Link
---- | ---- | ----
Collapse | Its basically like an Accordion, but more configurable | [View](#collapse)
Navigation Desktop | This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. | [View](#nav-desktop)
Navigation Mobile | Neat little mobile navigation plugin | [View](#nav-mobile)
Equalize Content | When Flexbox, or other options won&rsquo;t work, use this to equalize content | [View](#equalize)
Marketo Form | Have you tried to style a Marketo form? It is a disaster! This should help slimplify the process so you won&rsquo;t pull your hair out. | [View](#marketo-form)
Parallax Background | For making a parallaxing background | [View](#parallax)
Popup | There is like a few dozen of these, right?! Well this is easy to style and configurable. |  [View](#popup)
Responsive Dropdown | Turn your left secondary navigation (or list of options) into a dropdown for mobile!| [View](#responsive-dropdowns)
Tabs | Tabs in tabs, change onhashchange, dream big, become starry-eyed, this does it all :-) | [View](#tabs)


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