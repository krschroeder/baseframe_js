# Pop-Up


## Features
Good for loading a Popup (duh). Pretty light-weight for what it does and has all the configurable options you should need. Simple CSS styling and all that fun stuff.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
popupID| boolean |  'popup_' + generateGUID()| text
src | string |  src| text
popupOuterClass| string |  "" | text
title | string |  $(element).data('popup-title') || $(element).attr('title') || '' | text
titleElem |string |  'h3' | text
titleCss| string |  '' | text
caption| string |  $(element).data('popup-caption') || '' | text
clickOutsideClose| boolean |  true | text
fadeOut| number |  500 | text
fadeIn| number |  400 | text
fadeInDelay|number |  300 | text
zIndex | number |  2000 | text
vhDivisor| number |  2 | text
firstAnchorFocus| boolean |  true | text
setTopPosition| boolean |  null | text
isImage| boolean |  false | text
isJsArray| boolean |  false | text
escapeClose| boolean |  true | text
group| boolean |  true | text
showGroupAmount| boolean |  true | text
groupOfHTML| boolean |  '/' | text
launch| boolean |  false | text
photoRegex| regexp |  `` | text
closeText| boolean |  `<i class="icon-close"><span class="sr-only">Close</span></i>` | text
prevBtnContent| boolean |  `<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>` | text
nextBtnContent| boolean |  `<i class="icon-arrow-r"><span class="sr-only">Next</span></i>` | text
loadingHTML| boolean |  `<div class="popup__loader"></div>` | text
appendPopupTo| boolean |  'body' | text
showPopup| boolean |  'popup--show-popup' | text
enableEvent| boolean |  'click' | text
loadLocationHash| boolean |  true | text
useLocationHash| boolean |  true | Uses history and creates a hash in the location to toggle the popups on or off
afterLoaded| function |  () => { } | text
afterClose| function |  () => { } | text
onClose| function |  () => { } | text

## Example

__The following is an example html structure for this plugin:__

```
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

### Browse a JS Array of Images ###
Instead of combing the DOM for elements, comb an JS array that maybe gets compiled from some JSON array. Structure it like the following:
```javascript
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
```


__JavaScript__
```javascript
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
