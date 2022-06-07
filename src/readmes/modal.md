<h2 id="modal-plugin">Modal</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableEvent | string |  'click' | The event to show the modal, change to whatever event on the element. Could be 'hover', or synthetic event triggred by another element.
appendTo | string | HTMLElement |  document.body | the HTML element the popup appends to.
ariaLabelledby | string |  null | If using an `aria-labelledby` to label the modal for ADA purposes.
ariaLabel | string |  null | If using an `aria-label` to label the modal for ADA purposes.
cssPrefix | string |  'modal' | CSS class name for styling purposes. The outer most CSS class. Children elements naming uses the BEM naming convention.
closeBtnIconCss | string |  'ico i-close' | CSS used on the close button.
closeOutDelay | number |  250 | Time for closing the animation. Sync with CSS transition or animation.
backDropClose | boolean|  true | Toggle whether a user can click the backdrop to close the modal.
fromDOM | boolean |  true | If the modal content is grabbed from the DOM. Set to false if grabbed via an AJAX call or otherwise generated.
modalCss | string |  null | Additional modal css for styling or other scripting purposes
modalID | string |  null | The ID of the modal.
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
