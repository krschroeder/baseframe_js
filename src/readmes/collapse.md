<h2 id="collapse-plugin">Collapse</h2>


### Features
This has a move-to-top after open feature, open with location hash, and callbacks after events and such.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix | string |  'collapse' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
toggleDuration | number |  500 |  The speed at which the items will open, should pair with CSS transition settings.
toggleGroup | boolean |  false |  More or less toggles the other opened element(s) closed, and make it behave like an accordion.
moveToTopOnOpen | boolean |  false |  After the element is opened, the item will move to the top of it. Good for mobile.
moveToTopOffset | number |  0 |  Should we need to offset the move to the top if the __moveToTopOnOpen__ is set to `true`.
scrollSpeed | number |  100 |  The speed of the scroll if __moveToTopOnOpen__ is set to `true`.
urlFilterType | 'hash'\|'search' | 'hash' | The filtering type to use (either `location.hash` or `location.search`) to track the status of an open modal.
historyType | 'replace'\|'push'| 'replace' | The history state update. Either `history.pushState` or `history.replaceState`.
locationFilter | string |  null | Key name of the param to be captured in the location URL. Example: `YOUR_URL#collapse=the-item-id`, where `the-item-id` is the ID property and `collapse` is our `locationFilter`.
loadLocation | boolean |  true | Loads with a location hash in the browser address bar, must of course be the ID of the item.
afterOpen | function |  ($btnElems, $collapsibleItem) => {} |  callback function after an item is opened.
afterClose | function |  ($btnElems, $collapsibleItem) => {} |  callback function after an item is closed.
afterInit | function |  (element) => {} | callback function after collapse is initialized.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<section class="container">
    <div class="collapse collapse-group collapse-group-1" >
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 1</h2>
                <button class="collapse__btn" aria-controls="item-1" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-1">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                    <a href="#item-3" class="collapse__btn" aria-controls="item-3"><strong>Open Item 3 from here!</strong></a>
                </div>
            </div>
        </div>
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 2</h2>
                <button class="collapse__btn" aria-controls="item-2" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-2">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>

                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                </div>
            </div>
        </div>
        <div class="collapse__item">
            <div class="collapse__header">
                <h2>Collapse Item 3</h2>
                <button class="collapse__btn" aria-controls="item-3" aria-label="toggle section"></button>
            </div>
            <div class="collapse__body" id="item-3">
                <div class="collapse__body-inner">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation. Gallia est omnis divisa in partes tres, quarum. Contra legem facit qui pastrami id facit quod lex prohibet. Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus.</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

__JavaScript__
```javascript
$('.collapse-group').collapse();
```
