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
useHashFilter | string |  null | 
loadLocationHash | boolean |  true | 
useLocationHash | boolean |  true | 
onOpenOnce | string |  () => {} | 
onOpen | string |  () => {} | 
afterClose | string | () => {} | 

### Example

__The following structure should be used with this plugin:__

__HTML__
```html

```

```javascript
 
```
