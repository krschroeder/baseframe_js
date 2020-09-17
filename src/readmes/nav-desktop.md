<h2 id="nav-desktop">Enhance Desktop Navigation</h2>


## Features
This plugin just adds a delay to the desktop navigation and for the nestled levels. Also, features an edge detection on the drop-downs, and uses corresponding CSS to position, so it stays on the page.

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
mobileOff| number | 740 | The width it switches off for mobile navigation
delay| number | 950 | The delay the drop-downs stay put when moused off.
edgeClass| string | 'main-nav-edge' | Class name given to assist in edge positioning of drop-downs so they don't spill over to the right and off the page.
tabAccessible | boolean | true | Makes it possible to tab open dropdown links that are hidden. Works in conjuction with another css class `.focus` which gets added right along side with the `:hover` state class.


## Example

__The following is an example html structure for this plugin:__

```
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
	jQuery(function($){
		$('#main-nav').enhanceDesktopNav();
	});
```
