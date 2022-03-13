<h2 id="popup-plugin">Pop-Up</h2>


### Features
Where do I begin? Look at the settings. Pretty light-weight for what it does and has all the configurable options you should need. Simple CSS styling and all that fun stuff.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
popupID| string | 'popup_' + generateGUID() | ID for the popup. Good idea to set one if loading from a hash, else its dynamically generated
src | string | src | Can be a CSS selector `.your-popup-content` or `#yeah-your-content` or `<h2>Yeah Your Popup Content</h2><p>etc...</p>` and `https://placekitten.com/900/1200?ext=.jpg`. 
popupOuterClass| string |  "" | CSS class name to add to the outer element of the popup.
title | string |  <code>$(element).data('popup-title') &#124;&#124; $(element).attr('title') &#124;&#124; ''</code> | Title to get added above to the content. Looks for that in that order specified in the default, if not overridden.
titleElem |string |  'h3' | The element of the title
titleCss| string |  '' | A CSS class for that above title
caption| string |  <code>$(element).data('popup-caption') &#124;&#124; ''</code> | Text below the main content
clickOutsideClose| boolean |  true | closes if the popup is clicked outside of the box
fadeOut| number |  500 | Time to fade-out the popup, CSS transition should correspond.
fadeIn| number |  400 |  Time to fade-in the popup, CSS transition should correspond.
zIndex | number |  2000 | CSS z-index of the popup
vhDivisor| number | 2 | The division of the height of the popup and how it displays on the page. So, '2' means we divide it in half, and it displays in the center. '1' is not at all, and '0'. It takes any number really, and there is a use-case for this, that I can't remember exactly right now.
firstAnchorFocus| boolean |  true | Focus's back on the anchor or element after the popup closes
trapPopupFocus| boolean |  true | Traps the focus of tabbing to just the popup for ADA.
setTopPosition| number |  null | Sometimes we just may manually want to tell the vertical position of the popup.
isImage| boolean |  false | While there is a process using a regex and other parameters sometime we may just want to specify in the config.
isJsArray| boolean |  false | If using an array instead of DOM elements
escapeClose| boolean |  true | Will close the popup if the escape key is pressed.
group| boolean |  true | Groups like elements together so they can be toggled within the popup
showGroupAmount| boolean |  true | Shows the amount of elements if there is more than one.
groupOfHTML| boolean |  '/' | The separator (or text) between the group amount (e.g.: '1 / 3').
launch| boolean |  false | Launch the popup immediately.
photoRegex| regexp |  I'll explain | If it ends in <code>gif&#124;png&#124;jp(g&#124;eg)&#124;bmp&#124;ico&#124;webp&#124;jxr&#124;svg</code> or has a querystring parameter of `?image=jpg` or `?ext=someimageformattoo` then it'll know it's an image.
closeText| boolean |  `<i class="icon-close"><span class="sr-only">Close</span></i>` | Close html/text.
prevBtnHTML| boolean |  `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>` | Previous Button html/text.
nextBtnHTML| boolean |  `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>` | Next Button html/text.
loadingHTML | boolean |  `<div class="popup__loader"></div>` | Loading HTML.
appendPopupTo | string \| HTMLElement |  'body' | the HTML element the popup appends to.
showPopup | boolean |  'popup--show-popup' | CSS class used to show the popup.
enableEvent | string |  'click' | The event to show the popup, change to whatever event on the element. Could be 'hover' if we wanted to for some reason.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'popup' and it'll load and filter through as needed while maintaining the remaining location hash values. Example value of this could be `#popup=#your_popup__1&foo=bar&baz=foo`. This only gets used if 'useLocationHash' option is selected. 
loadLocationHash | boolean |  true | Loads a popup from a `window.location.hash`, if the hash matches the popup.
useLocationHash | boolean |  true | Uses history and creates a hash in the location to toggle the popups on or off
historyType | string | 'push' | If using using `useLocationHash` or a history of events, 'push' pushes a new state, and 'replace' replaces the current.
afterLoaded | function |  (_.$element, popupID) => { } | Function to run after the popup is displayed. `_.$element` is the `$(HTMLElement)` the popup is intialized on.
afterClose | function |  (_.$element, popupID) => { } | Function to run after the popup is closed.
onClose | function |  (_.$element, popupID) => { } | Function to run after the popup at the begninning of the closing event.

<br>
<br>

### Static Methods

Method | Params | Description
------ | ------- | ------
close() | element:HTMLElement, refocus:boolean | closes the current popup, `refocus` boolean will refocus on the last clicked element (or the element the popup is attached to).
remove() | element:HTMLElement | Removes the instance of the popup. If used in combination with close, make sure this fires after the popup is done closing, else it will fire an error.
show() | element:HTMLElement | Loads the popup.

<br>
<br>

### Example

__Notes:__
The popup gets is content to display in the popup in a few ways:
- `data-popup-src` attribute on an element, so `<button data-popup-src=".my-element">My Button</button>`
- `href` attribute on an `<a>`, but it can also use the `data-popup-src` as well.
- Or it can just be specified in the config.

The order of operations on these is the __JS config__ first, then __data-popup__ attribute, then __href__.

__The following is an example html structure for this plugin:__

```html
<div style="display: none;">
	<div id="popup-content">
		<h1>Pop-up</h1>
		<p>This is for a basic popup content</p>
		<p>Cum sociis natoque penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi senatus locus, nihil horum?</p>
	</div>
</div>
<div class="flex-l">
	<div class="md-col-4">
		<a class="button popup-w-string"
			href="#"
			data-popup-src="<iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://www.youtube.com/embed/9HFsQjjTkak&quot; frameborder=&quot;0&quot; allow=&quot;accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture&quot; allowfullscreen></iframe>"
			data-popup-type="string"
			data-popup-options="{popupID:'video',title:'Video Title'}"
			data-popup-caption="Some caption here for more splaining"
		>Popup With String</a>

		<a class="button popup-w-string"
			href="<img src='https://placekitten.com/600/400' alt='Something'>"
			data-popup-type="string"
			data-popup-options="{popupID:'kitten-pic',title:'Popup Title'}"
			data-popup-caption="Some caption here for more splaining"
		>Popup With String 2</a>

		<a href="#popup-content" class="button popup-w-content-id"
			data-popup-options="{title:'How About That'}"
		>Popup With HTML</a>

		<a href="https://placekitten.com/900/1200?ext=.jpg" class="button pic-group" title="Kitty thats in a taller image"
		>A Group of Pictures</a>

		<button type="button" class="button js-array">A Group of Pictures in JS Array</button><br>
		<br>
		<a href="https://placekitten.com/1200/600?image" data-popup-title="Anchor Kitty" class="pic-group">Kitty</a><br>
		<br>
		<a href="https://www.fillmurray.com/600/500" data-popup-type="image" data-popup-title="Our Boy Phil Murray" class="pic-group">Phil Murray</a>
	</div>
	<div class="md-col-4">
		<img src="https://placekitten.com/600/400"
			data-popup-src="https://placekitten.com/1200/800?image?image"
			alt="Kittens (1)"
			class="pic-group"
			data-popup-title="Kittens"
		/>
		<img src="https://placekitten.com/600/500"
			data-popup-src="#popup-content"
			alt="Kittens (2)"
			class="pic-group"
			data-popup-title="Joking Here's Our Popup Content"
		/>

	</div>
	<div class="md-col-4">
		<img src="https://placekitten.com/600/300"
			data-popup-src="https://placekitten.com/900/450?image"
			alt="Kittens (3)"
			class="pic-group"
			data-popup-title="Kittens (3)"
		/>
		<img src="https://placekitten.com/600/400"
			data-popup-src="https://placekitten.com/900/600?yeah&image"
			alt="Kittens (4)"
			class="pic-group"
			data-popup-title="Sorry it's not a doggie, but it'll have to do."
		/>
	</div>
</div>
```

__Javascript__
```javascript
//
//examples of using it differently
//

//getting contents from a string
$('.popup-w-string').popup({
	group: '.popup-w-string'

});
// an ID, which comes from the href prop on the element
$('.popup-w-content-id').popup();

//group of pictures with one mixed element in the group
$('.pic-group').popup({
	src: '.pic-group',
	title:'A Group of Pictures'
		
});

// JS Array

// Instead of combing the DOM for elements, comb an JS array that maybe gets 
// compiled from some JSON array. Structure it like the following:

var jsArray = [
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x500",
		title:"A JS Object Title 600x500",
		alt: "600x500 alt text"
	},
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x400",
		title:"A JS Object Title 600x400"
	},
	{
		nodeName:"img",
		src:"https://via.placeholder.com/600x300",
		title:"A JS Object Title 600x300"
	}
];

$('.js-array').popup({
	isJsArray: true,
	src: jsArray,
	title:'A JavaScript Array of Objects!'
});
```
