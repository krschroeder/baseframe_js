<h2 id="tabs-plugin">Tabs Plugin About</h2>

At some point we all need to be able to tab content. This one does it for you!

### Features
- Tabs within tabs, so tabs can be added inside other tabs if needed (which it will at some point),
- hash to load not only a tab, but tabs in tabs as well!
	- i.e.: add this to the location `#description#files-inner`
	- or to load just a tab then `#description`

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
defaultContent | Boolean / String | 0 | The order of the list item selected. Goes of course their appearance in the DOM.
tabsEvent | string | 'click' | Event to change the tabs content
activeCss | string | 'tab--active' | The 'active' CSS class that is added to the tabs list on the `<li>` element.
tabsBodyCss | string | 'tabs__body' | The CSS class for the body element in which all the tab content resides.
tabsBodyItemCss | string | 'tabs__body-item' | The CSS class for the tab content within the 'tabs body'.
tabsBodyItemShowCss | string | 'tabs__body-item--show' | The CSS class added to the 'tabs body item' to show it.
tabsHeadCss | string | 'tabs__nav' | The CSS class for the tabs navigation, added to the `<ul>` or its parent element.
useHashFilter | string | null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'tabs' and it'll load and filter through as needed while maintaining the remaining location hash values. Example value of this could be `#tabs=#requirements&foo=bar&baz=foo`. This only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean | true | Use window location hash and history push state so the browser back button can be used (or forward as well) to toggle through tabs.
loadLocationHash | boolean | true | Add in location hash parameters to load default tabs. `#files#files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
beforeChange | function | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
afterChange | function | () => {}  | Function to run after the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | function | () => {} | Function to run after the the plugin intializes, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.


### Example

__The following is an example html structure for this plugin:__


__HTML__
```html
<div class="tab__container">
	<div class="inline-ul tabs__nav" role="menubar">
		<ul>
			<li><a href="#description"><span>Description</span></a></li>
			<li><a href="#files"><span>Files</span></a></li>
			<li><a href="#requirements"><span>Requirements</span></a></li>
			<li><a href="#instructions"><span>Instructions</span></a></li>
		</ul>
	</div>
	<div class="tabs__body">
		<div class="tabs__body-item" data-tab-id="description">
			Description Text...
		</div>
		<div class="tabs__body-item" data-tab-id="files">
			Files Text...
		</div>
		<div class="tabs__body-item" data-tab-id="requirements">
			Requirements Text...
		</div>
		<div class="tabs__body-item" data-tab-id="instructions">
			Instructions Text...

			<div class="tabs__container">
				<div class="inline-ul tabs__nav" role="menubar">
					<ul>
						<li><a href="#description"><span>Description Nestled</span></a></li>
						<li><a href="#files"><span>Files Nestled</span></a></li>
					</ul>
				</div>
				<div class="tabs__body">
					<!-- html goes here... -->
				</div>
			</div>
		</div>
	</div>
</div>


</div>
```

__JavaScript__
```javascript
$(".tabs__container").tabs({
	onInit: (tab,list,body) =>{
		console.log('init',tab,list,body)
	},
	beforeChange: (tab,list,body) =>{
		console.log('before',tab,list,body)
	},
	afterChange: (tab,list,body) =>{
		console.log('after',tab,list,body)
	}
});

```
