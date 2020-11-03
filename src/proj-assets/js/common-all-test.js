//lets bring it all on in
import installStoreToLibrary, {
    libraryExtend,
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
    cookies,
} from '../../../scripts-all';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary(true);

//pass in as an array
libraryExtend([
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
]); 

//should you just want to add in one
//then just the plugin
libraryExtend(Tabs);


$.extend({getHashParam: getHashParam});
$.extend({getUrlParam: getUrlParam});
$.extend({cookies: cookies});

window.LazyLoad = LazyLoad;

const smoothScrollCallback = (arg,dos) => {
    console.log('yeah ' + arg + dos);
}

$('body').on('click', 'a.smooth-scroll', function(e){
    const $topElem = $($(this).attr('href'));
    const top = $topElem.position().top;

    smoothScroll(top, 30, smoothScrollCallback ,['yeah',' yeah']);
   
    e.preventDefault();
})

formInputs.init();

$('img[data-src]').lazyLoad();
$('.background-area-bg').lazyLoad();
// bgResponsiveLoad('.background-area-bg');