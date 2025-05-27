import $, { type Cash } from 'cash-dom';

import libraryExtend, {
    Collapse,       type CollapsePlugin,
    LazyLoad,       type LazyLoadPlugin,
    Modal,          type ModalPlugin,
    Tabs,           type TabsPlugin,
    Toastr,         type ToastrPlugin,
    AccessibleMenu, type AccessibleMenuPlugin,
    NavDesktop,     type NavDesktopPlugin,
    NavMobile,      type NavMobilePlugin,
    Parallax,       type ParallaxPlugin, 
    SelectEnhance,  type SelectEnhancePlugin,
    ScrollSpy,      type ScrollSpyPlugin,
    debounceResize
} from '../../../assets/js';

declare module 'cash-dom' {
    interface Cash extends
        CollapsePlugin,
        LazyLoadPlugin,
        ModalPlugin,
        TabsPlugin,
        ToastrPlugin,
        AccessibleMenuPlugin,
        NavDesktopPlugin,
        NavMobilePlugin,
        ParallaxPlugin,
        SelectEnhancePlugin,
        ScrollSpyPlugin {}
}

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
], $, true );

$('select').selectEnhance();

const $collapseGroup = $('.collapse-group-1');
$collapseGroup.on('click.collapseHeading', '.collapse__header h2', function(ev) {
    const h2 = this as HTMLElement;
    const $btn = $(h2.parentElement as HTMLElement).find('button');

    if ($btn.length) {
        $btn.trigger('click');
    }
}).collapse({
    moveToTopOnOpen: false,
    toggleGroup: true,
    locationFilter: 'collapse'
});

debounceResize(() => {
    const inMobile = $('#mobile-nav-btn').outerWidth() !== 0; //hidden if zero
    $collapseGroup.collapse({
        moveToTopOnOpen:  inMobile,
    })
},'collapse',true);

$('#main-nav')
    .navMobile({enableBtn: '#mobile-nav-btn'})
    .navDesktop()
    .accessibleMenu();

$(window).on('load',function() {
    // need to wait for images to load
    $('#main-nav').scrollSpy({ 
        spyBody: 'main.body-content',
        locationFilter: 'spy',
        observerOptions: {
            rootMargin: "80px 0px 0px",
            threshold: 1
        }
    })
})

$('#example-nav')
    .navMobile({enableBtn: '#mobile-nav-btn-example'})
    .navDesktop()
    .accessibleMenu({
        keyDirections: ['horizontal','vertical','vertical']
    });

// Parallax
$('#jsBtnSCrollHorizontal').on('click',function(){
    $('main').toggleClass('body-content--scroll-x');
    $('.do-parallax--hz').parallax('update')
})
$('.do-parallax').parallax({speed:25, bgFill:true});


// Tabs
$(".tabs-outer").tabs({ locationFilter: 'tabs', defaultContent: 1});
$(".tabs-inner").tabs({ locationFilter: 'tabs-inner'});

// Lazy Load

$('img[loading="lazy"]').lazyLoad({
    observerID: 'imgLazy',
    observerOpts: { rootMargin: '100px' }
});

//a bunch of paragraphs to style right!
$('.lazy-highlight').lazyLoad({
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
    $('#toastr-1').toastr({
        content: 'Toast is good for breakfast',
        duration: 7000
    });

    const $toastr2 = $('#toastr-2');

    if ($toastr2.length) {
        // Example 2: extend perhaps in Cash then call on click
        const toastr2 = new Toastr($toastr2[0] as HTMLElement, {
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
    $('#toastr-3').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });

    $('#toastr-4').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
}

//  Modal
{
    $('.btn-modal').modal({
        modalID: 'from-dom'
    });


    $('#btn-gen-content').modal({
        locationFilter: 'modal',
        src: '', 
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) {
         
            $(modalObj.dialogContent).on('click', 'button.dismiss', modalObj.close);

            $(modalObj.dialogContent).append(`
            <h2>Some generated Content</h2>
            <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
            <button type="button" class="button dismiss">Dimiss</button>
        `);
        }
    });
 

    // quick and dirty image carousel
    const $picGroup = $('.pic-group');

    $picGroup.each((index, elem) => {
        
        let imgIndex: number = index;

        const 
            modalID = 'pic-group_' + index,
            imgDefaultSrc = elem.dataset.imgSrc,
            $img = $('<img>').attr({loading:'lazy', src: imgDefaultSrc, alt: ''}),
            setImgSrc = (decrement: boolean) => {
                if (decrement)  imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                else            imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;
                
                return ($picGroup[imgIndex] as HTMLElement).dataset.imgSrc || '';
            }
        ;

        $(elem).modal({
            modalID,
            modalCss: 'modal--gallery',
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                $(modalObj.dialogContent).append($img).append(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `).on('click', 'button',function(ev) {
                    const decrement = $(this).hasClass('prev-btn');
                    $img.attr({src: setImgSrc(decrement)});
                });
            },
            onOpen(modalObj) {
                $(window).on('keyup.gallery', function(e:KeyboardEvent){
                    const arrowLeft = e.key === 'ArrowLeft';

                    if (e.key === 'Escape') modalObj.close();
                    if (e.key === 'ArrowRight' || arrowLeft) {
                        
                        $img.attr({src: setImgSrc(arrowLeft)});
                    }
                });
            },
            onClose() {
                $(window).off('keyup.gallery');
            }
        });
    })
} 