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
onOpenOnce | object |  (modalObj) => {} | Event that fires only the first time the modal is enabled
onOpen | object |  (modalObj) => {} | Event that fires when the element is opened
afterClose | object | (modalObj) => {} | Event that fires after the element is closed

#### Modal Object
This is an object with the following props/elements that is the first (and only) argument above in the callback functions (`onOpenOnce`,`onOpen` and `afterClose`). This should help allow for more flexibility with the prompt to attach any additional events or styling more easily. Below some examples with a little bit of custom code with this object.

```javascript
{
    $backdrop,
    $content,
    contentAppended: false, //state
    $dialog, //modal dialog
    $dialogContent, // modal dialog content
    $closeBtn,
    id: modalID,
    $modal, //outermost element
    disableModal: () => _.disableModal(), //disable modal fn
    show: false //state
}
```

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<div style="display: none;">
    <div id="modal-content">
        <h1>Pop-up</h1>
        <p>This is for a basic modal content</p>
        <p>Cum sociis natoque <a href="#"> some link </a>penatibus et magnis dis parturient. Etiam habebis sem dicantur magna mollis euismod. Curabitur blandit tempus ardua ridiculus sed magna. <button type="button" disabled>Some Button</button> Unam incolunt Belgae, aliam Aquitani, tertiam. Nihil hic munitissimus habendi <button type="button">clickable btn</button> senatus locus, nihil horum?</p>
    </div>
</div>

<a href="#modal-content" class="button btn-modal"
    data-modal-options="{title:'How About That'}"
>Modal With HTML</a>

<button type="button" id="btn-gen-content">Generated Content</button>

<!-- Quick Image Carousel Example -->
<div class="md-col-4 pic-group-holder">
    <button type="button" 
        data-img-src="https://placekitten.com/1200/800"
        alt="Kittens (1)" class="pic-group"
    >
        <img src="https://placekitten.com/600/400" />
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/550"
        class="pic-group"
    >
    <img src="https://placekitten.com/600/500" alt="Kittens (2)"/>
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/450"
        class="pic-group"
    >
        <img src="https://placekitten.com/600/300" alt="Kittens (3)" />
    </button>

    <button type="button" 
        data-img-src="https://placekitten.com/900/450"
        class="pic-group"
    >
        <img src="https://placekitten.com/600/400"alt="Kittens (4)" />
    </button>
</div>
```

```javascript
(function($){
    // simple usage
    $('.btn-modal').modal({
        useHashFilter: 'modal'
    });

    // usage for a Prompt to dismiss itself
    // with self generated content
    $('#btn-gen-content').modal({
        useHashFilter: 'modal',
        src: $('<div>').attr({class: 'gen-content'}),
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) { 
             
            modalObj.$content.on('click','.dismiss', modalObj.disableModal );
            
            // generated content from somewhere
            modalObj.$content.append(`
                <h2>Some generated Content</h2>
                <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
                <button type="button" class="button dismiss">Dimiss</button>
            `);
        }
    })
})($);

// quick image carousel
(function ($) {
    const $picGroup = $('.pic-group');

    $picGroup.each(function (index) {
        const src = $('<img>').attr({ src: this.dataset.imgSrc, loading: 'lazy' });
        const modalID = 'pic-group_' + index;

        $(this).modal({
            src,
            modalID,
            useHashFilter: 'modal',
            fromDOM: false,
            onOpenOnce(modalObj) {
                
                const $img = modalObj.$dialogContent.find('img');
                
                let imgIndex = index;

                modalObj.$dialogContent.append(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">previous image</button>
                        <button type="button" class="next-btn">next image</button>
                    </footer>
                `);

                modalObj.$dialogContent.on('click', 'button', function(e){
                    if (this.classList.contains('prev-btn')) {

                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                            
                    } else {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;

                    }
                            
                    $img.attr({src: $picGroup[imgIndex].dataset.imgSrc});
                })
            }
        });
    })
})($);
```
