# Base_Frame Plugins &amp; Common JS

Common/expected/needed/integrated JavaScript functionality for websites. You'll notice a few token are missing (like a carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use those others, they're great. The ones here are configurable, 

## Runs with [Cash](https://github.com/fabiospampinato/cash) (or JQuery if you wish)

These are made to work with [Cash](https://github.com/fabiospampinato/cash) (with jQuery still an option) as the only dependency. Cash in a small jQuery alternative that give developers DOM traversing without the extra bloat. In my opinion, having a DOM traversing Library is essential. While it adds some code to the page, saves you the hassle of writing extra. Also, everybody who's done any web developement is familiar with jQuery syntax.

## Some nice features are their is some shared syntax in the way they all operate. 

__For Example:__ all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)
```html
    <div id="your-plugin-elem" data-plugin-name="{option:'text',option2: true, etc: 'you get the idea'}"></div>
```

<p><strong>For Example:</strong> all can have their configuration change. Which can come in handy sometimes when things get complex</p>
    
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
} from 'base_frame/@plugins';

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
Pass in an `array` for the first argument, and `notify` is optional defaulted to true. `notify` console log's when parameters get updated on an instance.

```javascript
libraryExtend(Array [,notify])
````
Name | Description | Readme
------ | ---- | -----| -------
Collapse | Its basically like an Accordion, but more configurable |  [View](#collapse)
Navigation Desktop | This plugin just adds a delay to the desktop navigation for the nestled levels of a `<ul>`. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. | [View](#nav-desktop)
Navigation Mobile | Neat little mobile navigation plugin | [View](#nav-mobile)
Equalize Content | When Flexbox, or other options won't work, use this to equalize content |  [View](#equalize)
Marketo Form | Have you tried to style a Marketo form? It's a disaster! This should help slimplify the process so you won't pull your hair out. | Yes | [View](./src/marketo-form-magic/readme.md)
Parallax Background | For making a parallaxing background | Yes | [View](#parallax)
Popup | There's like a few dozen of these, right?! Well this is easy to style and configurable. |  [View](./src/popup/readme.md)
Responsive Dropdown | Turn your left secondary navigation (or list of options) into a dropdown for mobile! | No | [View](#responsive-dropdowns)
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