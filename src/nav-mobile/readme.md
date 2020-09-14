# Mobile Navigation


## About
Plugin is strictly for mobile so other plugins can be used for the desktop nav if needed. The clicking action that allows for opening/closing nav item is handled via the visibility of the __'open/close' button__ so the click so no clashing between desktop and mobile happen. Also so CSS can control it tighter as sometimes device width may dictate whether or not you'll see the desktop or mobile view.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
mobileButton | string | '#mobile-nav-btn' | The class or id of the mobile navigation button. __Note:__ the visibility of this button allows the click action of the child `<ul>`'s to function. It's recommended to use pass an 'ID' attribute for this if the default gets changed.
navParent | element | $(element) | Default navigation parent is the __element__ the plugin is attached to.
slideDuration | string | 300 | Duration in time the menu item opens
outerElement | string | 'body' | '.menu-item' class gets added to this element. Use for CSS styling purposes if needed.
outsideClickClose | string | true | Allows for an outside click in the body of the document to close the navigation.
hasULClass | string | 'has-children' | CSS Class name for the `<li>` elements that have children `<ul>`'s in them, and is what the clicking event is delegated to.
menuOpenClass | string | 'menu-opened' | CSS Class that gets added to the `<li>` and the `<body>` tags when and element becomes open.
afterNavItemOpen | string | function(item){} |  Callback function for after a navigation item is opened. The 'item' argument is the jQuery element of the opened navigational item.
afterNavItemClose | string | function(item){} | Callback function for after a navigation item is closed. The 'item' argument is the jQuery element of the closed navigational item.
afterOpen | string | function(item){} | Callback function for opening the whole navigation.
afterClose | string | function(item){} | Callback function for closing the whole navigation.
stopPropagation | boolean | true | To stop the click on the anchor from propagation up

## Example

__The following is an example html structure for this plugin:__

__HTML__
```
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
	jQuery(function($){
		$('#main-nav')
			.mobileNavigation()
			.enhanceDesktopNav();//<--may be used in conjunction with other plugins
	});
```
