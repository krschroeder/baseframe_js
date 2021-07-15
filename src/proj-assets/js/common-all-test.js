//lets bring it all on in
import installStoreToLibrary, {
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    MarketoForm,
    NavDesktop,
    NavMobile,
    NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs,
    bgResponsiveLoad,
    formInputs,
    getHashParam,
    getUrlParam,
    smoothScroll,
    cookies
} from '../../../all-es6';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary(true);

//pass in as an array
libraryExtend([
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    LazyLoad,
    NavDesktop,
    NavMobile,
    // NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs
],false); 

$.extend({getHashParam: getHashParam});
$.extend({getUrlParam: getUrlParam});
$.extend({cookies: cookies});

$.extend({popup: Popup})

window.MarketoForm = MarketoForm;

const smoothScrollCallback = (arg,dos) => {
    console.log('yeah ' + arg + dos);
}

$('body').on('click', 'a.smooth-scroll', function(e){
    const $topElem = $($(this).attr('href'));
    const top = $topElem.position().top;

    smoothScroll(top, 30, smoothScrollCallback ,['yeah',' yeah']);
   
    e.preventDefault();
})

$('#main-nav')
    .navMobile({navToggleNestled:false})
    .navDesktop();

$('#main-nav').accessibleMenu();

formInputs.init();

$('.background-area-bg').lazyLoad({observerID: 'background-area-bg', inEvt: (el)=>{console.log('el',el)}});
$('img[data-src]').lazyLoad({observerID: 'img[data-src]'});
$('p').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.color = 'red';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.color = '';},1000);
    }
});

// bgResponsiveLoad('.background-area-bg');