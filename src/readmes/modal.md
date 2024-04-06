<h2 id="modal-plugin">Modal</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
enableEvent | string |  'click' | The event to show the modal, change to whatever event on the element. Could be 'hover', or synthetic event triggred by another element.
appendTo | string | HTMLElement |  document.body | the HTML element the popup appends to.
ariaLabelledby | string |  null | If using an `aria-labelledby` to label the modal for ADA purposes.
ariaLabel | string |  null | If using an `aria-label` to label the modal for ADA purposes.
cssPrefix | string |  'modal' | The primary CSS class and prefix for all other derived elements. The BEM CSS naming convention is used for all derived elements.
closeBtnIconCss | string |  'ico i-close' | CSS used on the close button.
closeOutDelay | number |  250 | Time for closing the animation. Sync with CSS transition or animation.
backDropClose | boolean|  true | Toggle whether a user can click the backdrop to close the modal.
fromDOM | boolean |  true | If the modal content is grabbed from the DOM. Set to false if grabbed via an AJAX call or otherwise generated.
modalCss | string |  null | Additional modal css for styling or other scripting purposes
modalID | string |  null | The ID of the modal.
src | string |  '' | CSS selector for DOM elements, or can be custom created element from data either from an AJAX call or computed otherwise. Optional if modal content is dynamic/generated.
urlFilterType | 'hash'\|'search' | 'hash' | The filtering type to use (either `location.hash` or `location.search`) to track the status of an open modal.
historyType | 'replace'\|'push'| 'replace' | The history state update. Either `history.pushState` or `history.replaceState`.
locationFilter | string |  null | Key name of the filter to be captured in the location URL. Example: `YOUR_URL#modal=the-modal-id`, where `the-modal-id` is the `modalID` property and `modal` is our `locationFilter`.
loadLocation | boolean |  true | Loads with a location from the browser address bar, must of course be the ID of the item.
onOpenOnce | object |  (modalObj) => {} | Event that fires only the first time the modal is enabled
onOpen | object |  (modalObj) => {} | Event that fires when the element is opened
afterClose | object | (modalObj) => {} | Event that fires after the element is closed
    
#### Modal Object
This is an object with the following props/elements that is the first (and only) argument above in the callback functions (`onOpenOnce`,`onOpen` and `afterClose`). This should help allow for more flexibility with the prompt to attach any additional events or styling more easily. Below some examples with a little bit of custom code with this object.

```javascript
{
    $backdrop,
    $content,// in the params this would be the src. If not specifying a source and using generated content use $dialogContent instead
    contentAppended: false, //state
    $dialog, //modal dialog
    $dialogContent, // modal dialog content
    $closeBtn,
    id: modalID,
    $modal, //outermost element
    close: () => _.close(), //disable modal fn
    show: false //state
}
```

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<section class="modal-section container">
    <h2 id="section-modal">Modal</h2>

    <div>
        <h3>Modal with Hidden Content</h3>
        <p>Modal with grabbing content from the page in a hidden section.</p>
        <a href="#modal-content" class="button btn-modal"
            data-modal-options="{closeBtnLabel:'Close it up'}">Modal with content from DOM</a>

        <h3>Modal With Generated Content</h3>
        <p>Content that is generated from some source. Could be an AJAX call, or in this case just defined in the JS.</p>
        <button type="button" class="button" id="btn-gen-content">Generated Content</button>
        

        <h3>Modal Group / Carousel</h3>
        <p>Carousel of items. Note: the 'carousel' portion is done with additional scripting separate from the modal.</p>

        <div class="modal-section__group">
            <button type="button" 
                data-img-src="https://picsum.photos/600/400"
                alt="Picsum Pic 1" class="pic-group"
            >
                <img src="https://picsum.photos/600/400" alt="Picsum Pic 1" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/900/550"
                class="pic-group"
            >
            <img src="https://picsum.photos/900/550" alt="Picsum Pic 2" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/900/450"
                class="pic-group"
            >
                <img src="https://picsum.photos/900/450" alt="Picsum Pic 3" loading="lazy"/>
            </button>

            <button type="button" 
                data-img-src="https://picsum.photos/800/600"
                class="pic-group"
            >
                <img src="https://picsum.photos/800/600" alt="Picsum Pic 4" loading="lazy"/>
            </button>
        </div>
    </div>

     <div style="display: none;" hidden>
        <div id="modal-content">
            <h1>Pop-up</h1>
            <p>This is for a basic modal content</p>
            <p>Cum sociis natoque <a href="#"> some link </a>penatibus et magnis dis parturient. Etiam habebis
                sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. <button
                    type="button" disabled>Some Button</button> Unam incolunt Belgae, aliam Aquitani, tertiam.
                Nihil hic munitissimus habendi <button type="button">clickable btn</button> senatus locus, nihil
                horum?</p>
        </div>
    </div>
</section>
```

```javascript
{
    $('.btn-modal').modal({
        modalID: 'from-dom'
    });


    $('#btn-gen-content').modal({
        locationFilter: 'modal',
        src: $('<div>').attr({ class: 'gen-content' }), 
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) {
         
            modalObj.$dialogContent.on('click', '.dismiss', modalObj.close);

            modalObj.$dialogContent.append(`
            <h2>Some generated Content</h2>
            <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
            <button type="button" class="button dismiss">Dimiss</button>
        `);
        }
    });
 

    // quick and dirty image carousel
    const $picGroup = $('.pic-group');

    $picGroup.each(function (index) {
        const src = $('<img>').attr({ src: this.dataset.imgSrc || '', loading: 'lazy' });
        const modalID = 'pic-group_' + index;
        let imgIndex = index;
        
        $(this).modal({
            src, 
            modalID,
            modalCss: 'modal--gallery', 
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                
                const $img = modalObj.$dialogContent.find('img');

                modalObj.$dialogContent.append(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `);

                modalObj.$dialogContent.on('click', 'button', function(e){
                    if (this.classList.contains('prev-btn')) {

                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                         
                    } else {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;

                    }
                    
                    if (imgIndex > 0 && $picGroup.length) {
                        $img.attr({src: ($picGroup as any)[imgIndex].dataset.imgSrc || ''});
                    }
                });
            },
            onOpen(modalObj) {
                const $img = modalObj.$dialogContent.find('img');

                $(window).on('keyup.gallery', function(e:KeyboardEvent){
                    const arrowRight = e.key === 'ArrowRight';
                    const arrowLeft = e.key === 'ArrowLeft';
                    if (e.key === 'Escape') {
                        modalObj.close();
                    }
                    if (arrowLeft) {
                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                    }
                    if (arrowRight) {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;
                    }
                    if (arrowLeft || arrowRight) {
                        if (imgIndex > 0 && $picGroup.length) {
                            $img.attr({src: ($picGroup as any)[imgIndex].dataset.imgSrc || ''});
                        }
                    }
                });
            },
            onClose() {
                $(window).off('keyup.gallery');
            }
        });
    })
} 
```
