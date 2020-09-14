# Responsive Navigation to Dropdown

## What is it!?
This is a plugin that will take a side-navigation element and turn it into a dropdown for mobile. Its a common thing that I've come across that the mobile needs to turn into a dropdown so hence this plugin!

## Features
There is a close button that you can add to the bottom if you'd like. Outside click support, so you can close not clicking the header or the (optional) close button.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
clickHeader| string |  '.resp-nav-header' | Class name added for the header that is used for targeting the header
toggleBody| string |  '.resp-nav-dd-body' | Class name added for the body that is used for targeting the body
openHeaderClass| string |  'resp-dd-active' | The active class name used when the dropdown has been opened
inMobileClass| string |  'resp-dd-in-mobile' | The class used for styling the element into a dropdown. It gets added via the 'mobileBreak' setting, so this can be set dynamically per need.
closeBtnBottom| boolean |  true | This adds a close button to the bottom of the dropdown so if the user scrolls a bit they know they can click it to close.
closeBtnText| string |  'Close' | The text for the close button appended to the bottom (if it has been added).
closeBtnClass| string |  '' | Additional class to add to the button (if it has been added).
toggleAmount| number |  600 | The time spend sliding up and down
mobileBreak| number |  768 | The default breakpoint the side-nav/element turns to a dropdown.

## Example

__The following is an example html structure for this plugin:__

Use the __.resp-nav-mobile-dd__ to get the whole thing working.

__HTML__
```
<div class="resp-nav-mobile-dd">
	<div class="resp-nav-header">
		<strong class="inline-block">Title For Dropdown</strong>
		<i class="ico-down-arrow"><span class="sr-only">Down Arrow</span></i>
	</div>
	<div class="resp-nav-dd-body">
		&hellip; body contents to show.
	</div>
</div>
```

__JavaScript__
```javascript
jQuery(function($){
	$('.resp-nav-mobile-dd').responsiveDropDown(/*{config options}*/);
});
```
