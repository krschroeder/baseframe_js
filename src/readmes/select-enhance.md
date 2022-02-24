<h2 id="select-enhance-plugin">Select Enhance</h2>


### Features
Plugin that allows for styled dropdowns for the `<select>` element. This dropdown is ADA accessible, featuring typing to select, proper roles and aria attributes.
Can refresh the options list by calling static methods such as `SelectEnhance.refreshOptions('select')` or destroy it similiarly `SelectEnhance.remove('select')` (also with `$('select').selectEnhance('remove')`).

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix  | string | 'select-enhance' | CSS class name for styling purposes
mobileNative | boolean | true | Off by default this doesn't render the stylized dropdowns for mobile devices.
focusIn | string | ($element) => {} | event when focusing in on the select box
focusOut | string | ($element) => {} | event when focusing out on the select box
beforeChange | string | ($element) => {} | event to fire before the change event
afterChange | string | ($element) => {} | event to fire after the change event
blurDuration | number | 250 | the amount of time in milliseconds the blurring CSS effect lasts
typeAheadDuration | number | 500 | the timeout in millisconds to when the type/search feature resets
observeSelectbox | boolean | true | uses a MutationObserver to view changes on the `<select>` element or changes to the `<options>`

### Example

__The following is an example of the `<select>` elements for this plugin:__

__HTML__
```html
<label for="select-1">Select 1</label>
    <select id="select-1">
        <optgroup label="one">
            <option value="1">First Option</option>
            <option value="2">Second Option</option>
            <option value="3">Third Option</option>
        </optgroup>
        <optgroup label="two">
            <option value="4">More Options</option>
            <option value="5">Choices For Days</option>
            <option value="6">Sixth One</option>
        </optgroup>
    </select>
    <label for="another-select">Select 2</label>
    <select id="another-select">
        <option value="one">One Option</option>
        <option value="two">Two Option</option>
        <option value="three">Three!</option>
    </select>
```

```javascript
$('select').selectEnhance();
```
