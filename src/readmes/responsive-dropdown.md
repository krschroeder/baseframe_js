<h2 id="responsive-dropdown">Responsive Navigation to Dropdown</h2>

### What is it!?
This is a plugin that will take a side-navigation element and turn it into a dropdown for mobile. Its a common thing that I've come across that the mobile needs to turn into a dropdown so hence this plugin!

### Features
There is a close button that you can add to the bottom if you'd like. Outside click support, so you can close not clicking the header or the (optional) close button.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
clickHeader | string| '.resp-dd__header' | CSS class for the header element
toggleBody | string| '.resp-dd__body' | CSS class for the toggle body
closeBtnBottom | string | true | Shows close button at the bottom.
closeBtnText | string| 'Close' | Close text for the button
openHeaderCss | string| 'resp-dd--active' | CSS class when the toggle body is opened for the header
inMobileCss | string| 'resp-dd--in-mobile' | CSS class changing the element over to a 'responsive dropdown' in mobile.
closeBtnDivCss | string| 'resp-dd__close-btn-area' | CSS class for the close button area.
closeBtnCss | string| '' | Option to add a button class on the optional close button at the bottom.
toggleCss | string| 'resp-dd__body--open' | CSS class added to the body when it is open.
togglingCss | string| 'resp-dd__body--toggling' | CSS class added to the toggle body when toggling.
duration | number | 300 | Time spent transitioning to open. Should correspond with CSS transition.
mobileBkpt | number | 768 | Break point before entering into mobile.
outsideClickElem | string Or HTMLELement | 'body' |

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<div class="resp-dd">
	<div class="resp-dd__header">
		<strong class="inline-block">Title For Dropdown</strong>
		<i class="resp-dd__down-arrow">
			<span class="sr-only">Down Arrow</span>
		</i>
	</div>
	<div class="resp-dd__body">
		<div class="sm-col-6 md-col-12" >
			<h5>Listing of Things</h5>
			<ul>
				<li>Some Listing of Sorts</li>
				<li>Some Listing of Sorts</li>
			</ul>
			<br />
			<a href="#" class="see-more-btn">See More</a>
		</div>

		<div class="sm-col-6 md-col-12">
			<h5>Another Listing</h5>
			<ul>
				<li>Some Listing of Sorts</li>
				<li>Some Listing of Sorts</li>
				<li>Some Listing of Sorts</li>
			</ul>
		</div>
	</div>
</div>
```

__JavaScript__
```javascript
$('.resp-nav-mobile-dd').responsiveDropDown();
```
