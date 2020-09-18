<h2 id="popup">Pop-Up</h2>


### Features
Where do I begin? Look at the settings. Pretty light-weight for what it does and has all the configurable options you should need. Simple CSS styling and all that fun stuff.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
popupID| boolean | 'popup_' + generateGUID() | ID for the popup. Good idea to set one if loading from a hash, else its dynamically generated
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
appendPopupTo | boolean |  'body' | the HTML element the popup appends to.
showPopup | boolean |  'popup--show-popup' | CSS class used to show the popup.
enableEvent | boolean |  'click' | The event to show the popup, change to whatever event on the element. Could be 'hover' if we wanted to for some reason.
loadLocationHash | boolean |  true | Loads a popup from a `window.location.hash`, if the hash matches the popup.
useLocationHash | boolean |  true | Uses history and creates a hash in the location to toggle the popups on or off
afterLoaded | function |  () => { } | Function to run after the popup is displayed.
afterClose | function |  () => { } | Function to run after the popup is closed.
onClose | function |  () => { } | Function to run after the popup at the begninning of the closing event.

### Example

__The following is an example html structure for this plugin:__

```html
<div class="container" style="min-height: 1000px">
	<div id="popup-content">
		<h1>Pop-up</h1>
		<p>This is for a basic popup content</p>
		<p>Cum sociis natoque penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi senatus locus, nihil horum?</p>
	</div>
	<a href="#" id="launch-popup-jq" class="button">Launch jQuery Popup</a>
	<a href="#" id="launch-popup-jq2" class="button">Launch jQuery Popup (remove)</a>
</div>
```

__Javascript__
```javascript

//Instead of combing the DOM for elements, comb an JS array that maybe gets compiled from some JSON array. Structure it like the following:

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

//examples of using it differently

//getting contents from a page element
$('#launch-popup-jq2').popup({
	contents: $('#popup-content'),
	popupID: 'my-popup-jq2',
	directionX: 'LEFT'
});

//getting contents from a group of pics
$('.pic-group').popup({
	inline:true,
	contents: '.pic-group',
	title:'How About That',
	afterLoaded: (el,id)=>{console.log('yeah loaded', el,id)}
});

//getting imagery to generate from an array
$('.js-object-group').popup({
	array:true,
	contents: jsArray,
	title:'How About That'
});
```
