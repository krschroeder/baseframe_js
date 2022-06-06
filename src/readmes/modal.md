<h2 id="modal-plugin">Modal</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableEvent | string |  'click' | The event to show the modal, change to whatever event on the element. Could be 'hover', or synthetic event triggred by another element.
appendTo | string \| HTMLElement |  document.body | the HTML element the popup appends to.
ariaLabelledby | string |  null | 
ariaLabel | string |  null | 
cssPrefix | string |  'modal' | 
closeBtnIconCss | string |  'ico i-close' | 
closeOutDelay | number |  250 | 
backDropClose | boolean|  true | 
fromDOM | boolean |  true | 
modalCss | string |  null | 
modalID | string |  null | 
src | string |  null | CSS selector for DOM elements, or can be custom created element from data either from an AJAX call or computed otherwise.
useHashFilter | string |  null | If there is a number of elements where the `location.hash` value is used, it may be necessary to filter it to get the intended data. Pass in a string value, i.e.: 'modal' and it'll load and filter through as needed while maintaining the remaining location hash values. this only gets used if 'useLocationHash' option is selected. 
useLocationHash | boolean |  true |  Use the `window.location.hash` to open and close the items.
loadLocationHash | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item.
onOpenOnce | string |  () => {} | Event that fires only the first time the modal is enabled
onOpen | string |  () => {} | Event that fires when the element is opened
afterClose | string | () => {} | Event that fires after the element is closed

### Example

__The following structure should be used with this plugin:__

__HTML__
```html

```

```javascript
 
```
