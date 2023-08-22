//lets bring it all on in
import $ from 'cash-dom';
import type { Cash, CashStatic } from 'cash-dom';

import installStoreToLibrary, {
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    Modal,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr,
    // installStoreAsDataToLibrary,
    formInputs,
    getHashParam,
    getUrlParam,
    smoothScroll,
    cookies
} from '../../assets/js/index';

// import objectToQs from '../../assets/js/util/object-to-qs';
// import qsToObject from '../../assets/js/util/qs-to-object';

// const ourQs = objectToQs({yeah: ['buddy','friendo'], foo: 'bar', baz: 'bar'},'repeat');
// const qsToObj = qsToObject(ourQs);
// console.log(ourQs, qsToObj);

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary(true);
// installStoreAsDataToLibrary(true); 

//pass in as an array
libraryExtend([
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    Modal,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr
],false); 

// console.log(Collapse)
// Defaults overrides
// Modal.defaults = $.extend(Modal.defaults, {backDropClose: false});


declare module 'cash-dom' {

    interface CashStatic {
        toastr: typeof Toastr
    }
}
$.extend({getHashParam: getHashParam});
$.extend({getUrlParam: getUrlParam});
$.extend({cookies: cookies});

$.extend({modal: Modal});
$.extend({collapse: Collapse});
$.extend({tabs: Tabs});
$.extend({selectEnhance: SelectEnhance});
$.extend({toastr: Toastr});



const smoothScrollCallback = (arg,dos) => {
    console.log('yeah ' + arg + dos);
}

$('body').on('click', 'a.smooth-scroll', function(e){
    const $topElem = $($(this).attr('href'));
    const top = (<any>$topElem).position().top;

    smoothScroll(top, 30, smoothScrollCallback);
   
    e.preventDefault();
})

$('#main-nav')
    .navMobile({

        enableBtn: '#mobile-nav-btn',
        submenuBtnSkip(ul) {
            // console.log(ul.classList.contains('skip'),ul)
            return ul.classList.contains('skip');
        },
        afterOpen($element, outerElement, enableBtn) {
            console.log($element, outerElement, enableBtn);
        },
        afterNavItemOpen($li) {
            console.log('open',$li, $li.parentsUntil('#main-nav'))

            
        },
        afterNavItemClose($li) {
            console.log('close', $li.parentsUntil('#main-nav').length)
        }
    })
    .navDesktop();

$('#main-nav').accessibleMenu();

formInputs.init();

$('select').selectEnhance({
    afterChange(el){console.log('after change',el)},
    focusIn($el) {console.log('focus in select',$el)},
    focusOut($el) {console.log('focus out select',$el)}
});

SelectEnhance.refreshOptions($('select'));

$('select.nope').lazyLoad('remove')

$('.background-area-bg').lazyLoad({observerID: 'background-area-bg', inEvt: (el)=>{console.log('el',el)}});
$('img[data-src]').lazyLoad({observerID: 'img[data-src]',inEvt: (el, entry)=>{console.log('el and entry',el, entry)}});
$('img[loading="lazy"]').lazyLoad({observerID: 'imgLazyLoadAttr'});
$('p').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.opacity = '0.6';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.opacity = '';},1000);
    }
});


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
        const toastr2 = new $.toastr($toastr2[0] as HTMLElement, {
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

setTimeout(function(){
    const $toaster1 = $('#toastr-1');
    if ($toaster1.length) {

        Toastr.setContent($('#toastr-1'), $('<div>').append(
            
            $('<p>').text('Is the 4 slot really better than the 2 slotted toaster?')
        ), false);
    }
}, 10000)

 