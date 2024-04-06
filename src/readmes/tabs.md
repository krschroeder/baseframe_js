<h2 id="tabs-plugin">Tabs Plugin About</h2>

At some point we all need to be able to tab content. This one does it for you!

### Features
- Tabs within tabs, so tabs can be added inside other tabs if needed (which it will at some point),
- hash to load not only a tab, but tabs in tabs as well!
	- i.e.: add this to the location `#tab-id` open multipe with an '=' sign so `cool-tab=cooler-tab`, or run with a filter as well so it can work in conjuction with other plugin's that use a hash

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
defaultContent | number \| 'none' | 0 | The order of the list item selected. Goes of course their appearance in the DOM. Passing in `'none'` does as it sounds and hides them all by default.
tabsEvent | string | 'click' | Event to change the tabs content
cssPrefix | string | 'tab' | The CSS that prefixes every relevant structural element contained within. Uses BEM convention.
locationFilter | string | null | Key name of the param to be captured in the location URL. Example: `YOUR_URL#tab=the-item-id`.
loadLocation | boolean | true | Add in location hash parameters to load default tabs. `#files=files-inner` loading multiple is possible if many diffrent tabs. Also load tabs within tabs and such as well.
historyType | 'push'\|'replace' | 'push' | If using using `useLocationHash` or a history of events, 'push' pushes a new state, and 'replace' replaces the current.
tabbing | boolean | true | Enables tabbing with keyboard arrows. A tab list should only be focusable one at a time with the 'tab' key.
tabDirection| string | 'horizontal' | Typically tabs are 'horizontal' but may also go 'vertical'. They take either or as an option, otherwise it'll throw a `console.warn` to correct.
addIDtoPanel | boolean | true | Adds an ID attribute to the panel for ADA compliance, but isn't necessary for its functionality.
ariaLabel | boolean | true | Adds an 'aria-label' attribute to the panel for ADA compliance. Set to false if an equivalent exists in the mark-up.
tabChange | (tabId: string, prevTabId: string, tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run before the tab change, passed variables are the 'previous tab ID', 'tabs list', 'tabs body' elements.
onInit | (tabsList: Cash, tabsBody: Cash): void | () => {} | Function to run after the the plugin intializes, passed variables are the  'tabs list', 'tabs body' elements.


### Example

__The following is an example html structure for this plugin:__


__HTML__
```html
<section class="container">
    <h2 id="section-tabs">Tabs</h2>
    <div class="tabs__container tabs-outer">
        <div class="inline-ul tabs__nav" role="menubar">
            <ul>
                <li><button data-href="#description"><span>Description</span></button></li>
                <li><button data-href="#files"><span>Files</span></button></li>
                <li><button data-href="#requirements"><span>Requirements</span></button></li>
                <li><button data-href="#instructions"><span>Instructions</span></button></li>
                <li><button data-href="#files2"><span>Additional Info</span></button></li>
                <li><button data-href="#related"><span>Related</span></button></li>
            </ul>
        </div>
        <div class="tabs__body">
            <div data-tab-id="description" class="tabs__panel">
                <div class="tabs__container tabs-inner inner-one">
                    <div class="inline-ul tabs__nav" role="menubar">
                        <ul>
                            <li><button data-href="#description-inner"><span>Description Inner</span></button></li>
                            <li><button data-href="#files-inner"><span>Files Inner</span></button></li>
                            <li><button data-href="#requirements-inner"><span>Requirements Inner</span></button></li>

                        </ul>
                    </div>
                    <div class="tabs__body">
                        <div data-tab-id="description-inner" class="tabs__panel">
                            <p><strong>Description Inner</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam,sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
                        </div>
                        <div data-tab-id="files-inner" class="tabs__panel">
                            
                            <p>Non equidem invideo, miror magis posuere velit aliquet. Qui ipsorum lingua Celtae, nostra galli appellantur. Phasellus laoreet lorem vel dolor tempus vehicula. Plura mihi bona sunt, inclinet, amari petere vellent.</p>
                        </div>
                        <div data-tab-id="requirements-inner" class="tabs__panel">
                            
                            <ul>
                                <li>Something in a list item</li>
                                <li>Something in a list item</li>
                                <li>Something in a list item</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div data-tab-id="files" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
               
            </div>
            <div data-tab-id="requirements" class="tabs__panel">
                <p><strong>Description</strong> quis aute iure reprehenderit in voluptate velit esse. Quam diu etiam furor iste tuus nos eludet? Ambitioni dedisse scripsisse iudicaretur porkchops.</p>
                
            </div>
            <div data-tab-id="instructions" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
            
            </div>
            <div data-tab-id="files2" class="tabs__panel">
                <p><strong>Description</strong> pellentesque habitant morbi tristique senectus et netus. Fabio vel iudice vincam, sunt in culpa qui officia. Curabitur blandit tempus ardua ridiculus sed magna. Petierunt uti sibi concilium totius Galliae in diem certam indicere.</p>
            </div>
            <div data-tab-id="related" class="tabs__panel">
                 
                <p>Nec dubitamus multa iter quae et nos invenerat. Integer legentibus erat a ante historiarum dapibus.
                    Curabitur est gravida et libero vitae dictum.</p>
            </div>
        </div>
    </div>
</section>
```

__JavaScript__
```javascript
$(".tabs__container").tabs({
	onInit: (tabId, prevTabId, tabsList, tabsBody) =>{
		// do something ...
	},
	tabChange: (tabsList, tabsBody) =>{
		// do something to start
	}
});

```
