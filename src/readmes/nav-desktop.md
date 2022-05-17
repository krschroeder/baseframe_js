<h2 id="nav-desktop-plugin">Desktop Navigation (Enhanced)</h2>


### Features
This plugin adds a delay to the desktop navigation and for the nestled `<ul>`'s that fly out. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page. I think this is a nice feature to have and adds a small nice little touch to the finished project.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
stopWidth | number | 768 | the width in which the navigaiton will stop for mobile.
delay | number | 800 | The delay in time you can hover off a sub menu item.
edgeCss | string | 'ul-on-edge' | The CSS class that moves the nav when if goes over the egde of the page.
outerElem | string | document.body | Element to attach the `navHoveredCss` option.
ulHasCss | string | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
ulNotCss | string | 'no-ul' | CSS class for `<li>` that don't have a `<ul>` nestled.
navHoveredCss | string | 'desktop-nav-hovered' | The CSS class added to the `outerElem` (defaulted to the `<body>`).
navLeavingCss | string | 'desktop-nav-leaving' | The CSS class added to the `outerElem` as the nav is leaving. An opportunity to add styling to fade away any open navigations.
navLeavingDelay | number | 800 | delay in milliseconds in which the `navLeavingCss` gets added to the `outerElem`
hoverCss | string | 'hover' | The hover class to work in conjuction with the `delay` option to keep the item on the page when hovered off.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<nav id="main-nav">
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
$('#main-nav').navDesktop();
```
