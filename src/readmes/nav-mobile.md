<h2 id="nav-mobile-plugin">Mobile Navigation</h2>


### About
Plugin is strictly for mobile so other plugins can be used for the desktop nav if needed. The clicking action that allows for opening/closing nav item is handled via the visibility of the __'open/close' button__ so the click so no clashing between desktop and mobile happen. Also so CSS can control it tighter as sometimes device width may dictate whether or not you'll see the desktop or mobile view.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableBtn | string | '#mobile-nav-btn' | The selector to the mobile nav button to turn show the navigation.
ariaLabel | string | 'Toggle site navigation' | The arial label for the `enable` button.
slideDuration | number | 400 | Duration for showing a sub menu item, CSS transistion should correspond.
outerElement | string or HTMLElement | 'body' | Element to attach `menuOpenCss` class to.
outsideClickClose | boolean | true | Can close if clicked outside of the menu.
hasUlCls | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
menuOpenCss | string | 'menu-opened' | CSS class added to the elements saying its opened.
menuTogglingCss | string | 'menu-toggling' | CSS class added while the element is toggling.
arrowSubMenuItemCss | string | 'i i-arrow-b' | CSS class of the button added to the `<li>` element for toggling open/closed.
afterNavItemOpen | function | () => {} | Function to run after an nav item is opened.
afterNavItemClose | function | () => {} | Function to run after a nav item is closed.
afterOpen | function | () => {} | Function to run after the nav is open.
afterClose | function | () => {} | Function to run after the nav is closed.
stopPropagation | boolean | true, | Stops the click from propagating up in the DOM from the nav element.
nextLevelBtn | string | `<i class="nav-icon nav-icon--next" /><span class="sr-only">View menu</span></i>` | Button for the 'next level'. This only works if the base class is extended with the `NavMobileNestled`.
backLevelBtn | string | `<i class="nav-icon nav-icon--back" >← <span class="sr-only">Go Back</span></i>` | Button for the 'previous level'. This only works if the base class is extended with the `NavMobileNestled`.
navToggleNestled | boolean | false | This only works if the base class is extended with the `NavMobileNestled` class and is an alternative way to display the navigation items.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<nav id="main-nav">
	<button id="mobile-nav-btn">
		<div id="mobile-nav-btn-inner">
			<div class="nav-top-bar"></div>
			<div class="nav-mid-bar"></div>
			<div class="nav-bot-bar"></div>
		</div>
	</button>
	<ul>
		<li><a href="#">Some Link</a>
			<ul>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
				<li><a href="#">Some Link</a></li>
			</ul>
		</li>
	</ul>
</nav>
```

__JavaScript__
```javascript
$('#main-nav').navMobile()
```
