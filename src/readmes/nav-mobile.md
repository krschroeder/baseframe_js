<h2 id="nav-mobile-plugin">Mobile Navigation</h2>


### About
Plugin is strictly for mobile so other plugins can be used for the desktop nav if needed. The clicking action that allows for opening/closing nav item is handled via the visibility of the __'open/close' button__ so the click so no clashing between desktop and mobile happen. Also so CSS can control it tighter as sometimes device width may dictate whether or not you'll see the desktop or mobile view.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableBtn | string | '#mobile-nav-btn' | The selector to the mobile nav button to turn show the navigation.
ariaLabel | string | 'Toggle site navigation' | The arial label for the `enable` button.
tgBtnText | string | 'toggle menu' | Copy to prefix the button that toggles the sub-menu of a list item.
insertBtnAfter | string | 'a' | the element selector name for inserting the toggle button after.
slideDuration | number | 400 | Duration for showing a sub menu item, CSS transistion should correspond.
outerElement | string or HTMLElement | document.body | Element to attach `menuOpenCss` class to.
cssPrefix | string | 'menu' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
menuBtnSkip | () => : boolean \| (li) => boolean | Function that takes the `li` as the parameter, which tests whether or not to skip adding a button adjacent to it's `<a/>` element. Ex. (in the mark-up) `<li class="skip-li">` and the config the following: `menuBtnSkip(li) { return li.classList.contains('skip-li')}` in which it'd skip adding a button to that level in the nav.
menuBtnCss | string | 'i i-arrow-b' | CSS class for the indicating element as to the sub menu open/closed status.
animateHeight | boolean | true | Animates the height of the list. Good if you want the `<ul>` to fade-in rather than scroll open (with corresponding CSS written of course).
afterNavItemOpen | function | ($li) => {} | Function to run after an nav item is opened.
afterNavItemClose | function | ($li) => {} | Function to run after a nav item is closed.
afterOpen | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is open.
afterClose | function | ($element, outerElement, enableBtn) => {} | Function to run after the nav is closed.
doTrapFocus | boolean | true | Traps the focus to just the visible anchors and buttons within the navigation.
trapFocusElem | string | null | selector string (or can be dom element) if we need to extend the trap focus slightly outside the main nav element.
stopPropagation | boolean | true | Stops the click from propagating up in the DOM from the nav element.
bkptEnable | number | null | Optionally specify when to enable the mobile navigation with screen width (in pixels). This will override whether or not the `enableBtn` is visible, which is the conditional that enables this menu to function. 
### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<nav id="main-nav">
	<button class="mobile-nav-btn" id="mobile-nav-btn">
		<span></span>
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
