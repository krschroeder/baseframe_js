import $be              from 'base-elem-js';

import libraryExtend, {
    Collapse,
    LazyLoad,
    Modal,
    Tabs,
    Toastr,
    AccessibleMenu,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    throttledResize,
    ScrollSpy
} from '../../../assets/js';

libraryExtend([
    AccessibleMenu, 
    Collapse, 
    LazyLoad,
    Modal, 
    NavDesktop,
    NavMobile,
    Parallax,
    ScrollSpy,
    SelectEnhance,
    Tabs,
    Toastr
], $be, true );

const { make } = $be.static;

 
console.log($be.BaseElem.prototype);

$be('select').selectEnhance();

const $collapseGroup1 = $be('.collapse-group-1');

$collapseGroup1.on('click.collapseHeading', (ev, elem) => {
    const h2 = elem as HTMLElement;
    const $btn = $be(h2.parentElement as HTMLElement).find('button');

    if ($btn.hasEls) {
        $btn.trigger('click');
    }
},'.collapse__header h2').collapse({
    moveToTopOnOpen: false,
    toggleGroup: true,
    locationFilter: 'collapse'
});

const $collapseGroup2 = $be('.collapse-group-2');
$collapseGroup2.collapse({
    toggleGroup: false,
    locationFilter: 'collapse2'
})

throttledResize(() => {
    const inMobile = $be('#mobile-nav-btn').elemRects().width !== 0; //hidden if zero
    $collapseGroup1.collapse({
        moveToTopOnOpen:  inMobile,
    })
},'collapse',true);

$be('#main-nav')
    .navMobile({enableBtn: '#mobile-nav-btn'})
    .navDesktop()
    .accessibleMenu();

$be(window).on('load',function() {
    // need to wait for images to load
    $be('#main-nav').scrollSpy({ 
        spyBody: 'main.body-content',
        locationFilter: 'spy',
        observerOptions: {
            rootMargin: "80px 0px 0px",
            threshold: 1
        }
    })
})

$be('#example-nav')
    .navMobile({enableBtn: '#mobile-nav-btn-example'})
    .navDesktop()
    .accessibleMenu({
        keyDirections: ['horizontal','vertical','vertical']
    });

// Parallax
$be('#jsBtnSCrollHorizontal').on('click',function(){
    $be('main').tgClass('body-content--scroll-x');
    $be('.do-parallax--hz').parallax('update')
})
$be('.do-parallax').parallax({speed:25, bgFill:true});


// Tabs
$be(".tabs-outer").tabs({ locationFilter: 'tabs', defaultContent: 1});
$be(".tabs-inner").tabs({ locationFilter: 'tabs-inner'});

// Lazy Load

$be('img[loading="lazy"]').lazyLoad({
    observerID: 'imgLazy',
    observerOpts: { rootMargin: '100px' }
});

//a bunch of paragraphs to style right!
$be('.lazy-highlight').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.background = '#ccc';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.background = '';},1000);
    }
});

// TOASTR
{
    const toastRandomMsgs = [
        'I boast about my toast.',
        'The hostess with the toastess',
        'toast is best, when its not burnt',
        'The fire is quite toasty',
        'Lets toast, to toast!'
    ]

    const randomToastMsg = () => {
        return toastRandomMsgs[Math.floor(Math.random() * toastRandomMsgs.length)]
    }
    // Example 1: standard way
    $be('#toastr-1').toastr({
        content: 'Toast is good for breakfast',
        duration: 7000
    });

    const $toastr2 = $be('#toastr-2');

    if ($toastr2.hasElems()) {
        // Example 2: extend perhaps in Cash then call on click
        const toastr2 = new Toastr($toastr2.elem[0] as HTMLElement, {
            content: 'Toast is good for breakfast',
            duration: 5000
        });

        $toastr2.on('click',function(){
            setTimeout(() => {
                toastr2.setContent(randomToastMsg(),true)
            },2500)
        });
    }

    // Example 3,4: somewhere else on the page
    $be('#toastr-3').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });

    $be('#toastr-4').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
}

//  Modal
{
    $be('.btn-modal').modal({
        modalID: 'from-dom'
    });


    $be('#btn-gen-content').modal({
        locationFilter: 'modal',
        src: '', 
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) {
         
            $be(modalObj.dialogContent)
            .on('click', modalObj.close,'button.dismiss')
            .insert(`
            <h2>Some generated Content</h2>
            <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
            <button type="button" class="button dismiss">Dimiss</button>
        `);
        }
    });
 

    // quick and dirty image carousel
    const $picGroup = $be('.pic-group');

    $picGroup.each((elem, index) => {
        
        let imgIndex: number = index;

        const 
            modalID = 'pic-group_' + index,
            imgDefaultSrc = elem.dataset.imgSrc,
            img = make('img', {loading:'lazy', src: imgDefaultSrc, alt: ''}),
            setImgSrc = (decrement: boolean) => {
                if (decrement)  imgIndex = imgIndex === 0 ? $picGroup.size - 1 : imgIndex - 1;
                else            imgIndex = imgIndex === $picGroup.size - 1 ? 0 : imgIndex + 1;
                
                return ($picGroup.elem[imgIndex] as HTMLElement).dataset.imgSrc || '';
            }
        ;

        $be(elem).modal({
            modalID,
            modalCss: 'modal--gallery', 
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                $be(modalObj.dialogContent).insert(img).insert(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `).on('click', (e, elem) => {
                    const decrement = $be(elem).hasClass('prev-btn');
                    img.src = setImgSrc(decrement);    
                },'button');
            },
            onOpen(modalObj) {
                $be(window).on('keyup.gallery', function(e:KeyboardEvent){
                    const arrowLeft = e.key === 'ArrowLeft';

                    if (e.key === 'Escape') modalObj.close();
                    if (e.key === 'ArrowRight' || arrowLeft) {
                        img.src = setImgSrc(arrowLeft);
                    }
                });
            },
            onClose() {
                $be(window).off('keyup.gallery');
            }
        });
    })
} 