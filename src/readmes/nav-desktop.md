<h2 id="nav-desktop">Enhance Desktop Navigation</h2>


### Features
This plugin just adds a delay to the desktop navigation and for the nestled levels. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
stopWidth | 768 | the width in which the navigaiton will stop for mobile.
delay | 800 | The delay in time you can hover off a sub menu item.
edgeCss | 'ul-on-edge' | The CSS class that moves the nav when if goes over the egde of the page.
outerElem | 'body' | Element to attach the `navHoveredCss` option.
ulHasCss | 'has-ul' | CSS class for `<li>` that have a `<ul>` nestled.
ulNotCss | 'no-ul' | CSS class for `<li>` that don't have a `<ul>` nestled.
navHoveredCss | 'desktop-nav-hovered' | The CSS class added to the `outerElem` (defaulted to the `<body>`).
hoverCss | 'hover' | The hover class to work in conjuction with the `delay` option to keep the item on the page when hovered off.

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
