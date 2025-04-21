import $be from 'base-elem-js';
 
import libraryExtend from '../../../assets/js/core/libraryExtend';

import Collapse from '../../../assets/js/Collapse';
import LazyLoad from '../../../assets/js/LazyLoad';
import Modal from '../../../assets/js/Modal';
import Tabs from '../../../assets/js/Tabs';
import Toastr from '../../../assets/js/Toastr';
import AccessibleMenu from '../../../assets/js/AccessibleMenu';
import NavDesktop from '../../../assets/js/NavDesktop';
import NavMobile from '../../../assets/js/NavMobile';
import Parallax from '../../../assets/js/Parallax';
import SelectEnhance from '../../../assets/js/SelectEnhance';
import throttledResize from '../../../assets/js/fn/throttleResize';
import ScrollSpy from '../../../assets/js/ScrollSpy';
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
], true, $be);

 
$be('select').selectEnhance();
const $collapseGroup = $be('.collapse-group-1');
$collapseGroup.on('click.collapseHeading', (ev, elem) => {
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

throttledResize(() => {
    const inMobile = $be('#mobile-nav-btn').elemRects().width !== 0; //hidden if zero
    $collapseGroup.collapse({
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
         
            modalObj.$dialogContent.on('click', modalObj.close,'button.dismiss');

            modalObj.$dialogContent.insert(`
            <h2>Some generated Content</h2>
            <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
            <button type="button" class="button dismiss">Dimiss</button>
        `);
        }
    });
 

    // quick and dirty image carousel
    const $picGroup = $be('.pic-group');

    $picGroup.each((elem, index) => {
        // const src = $be('<img>').attr({ src: this.dataset.imgSrc || '', loading: 'lazy' });
        const modalID = 'pic-group_' + index;
        let imgIndex: number = index;
        const imgDefaultSrc = elem.dataset.imgSrc;

        $be(elem).modal({
            // src, 
            modalID,
            modalCss: 'modal--gallery', 
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                
                const $img = modalObj.$dialogContent.find('img');

                modalObj.$dialogContent.insert(`
                    <img src="${imgDefaultSrc}" loading="lazy" />
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `);

                modalObj.$dialogContent.on('click', (e, elem) => {
                    if ((elem as HTMLButtonElement).classList.contains('prev-btn')) {

                        imgIndex = imgIndex === 0 ? $picGroup.elem.length - 1 : imgIndex - 1;
                         
                    } else {
                        imgIndex = imgIndex === $picGroup.elem.length - 1 ? 0 : imgIndex + 1;

                    }
                    
                    if (imgIndex > 0 && $picGroup.elem.length) {
                        $img.attr({src: ($picGroup as any)[imgIndex].dataset.imgSrc || ''});
                    }
                },'button');
            },
            onOpen(modalObj) {
                const $img = modalObj.$dialogContent.find('img');

                $be(window).on('keyup.gallery', function(e:KeyboardEvent){
                    const arrowRight = e.key === 'ArrowRight';
                    const arrowLeft = e.key === 'ArrowLeft';
                    if (e.key === 'Escape') {
                        modalObj.close();
                    }
                    if (arrowLeft) {
                        imgIndex = imgIndex === 0 ? $picGroup.elem.length - 1 : imgIndex - 1;
                    }
                    if (arrowRight) {
                        imgIndex = imgIndex === $picGroup.elem.length - 1 ? 0 : imgIndex + 1;
                    }
                    if (arrowLeft || arrowRight) {
                        if (imgIndex > 0 && $picGroup.elem.length) {
                            $img.attr({src: ($picGroup as any)[imgIndex].dataset.imgSrc || ''});
                        }
                    }
                });
            },
            onClose() {
                $be(window).off('keyup.gallery');
            }
        });
    })
} 