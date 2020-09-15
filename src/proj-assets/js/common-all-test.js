//lets bring it all on in
import installStoreToLibrary, {
    libraryExtend,
    Collapse,
    EqualizeContent,
    MarketoForm,
    NavDesktop,
    NavMobile,
    NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs,
    formInputs,
    smoothScroll
} from '../../../common-all';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary();

libraryExtend([
    Collapse,
    EqualizeContent,
    NavDesktop,
    NavMobile,
    // NavMobileNestled,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs,
]); 

$('a.smooth-scroll').on('click',function(e){
    const $topElem = $($(this).attr('href'));
    const top = $topElem.position().top;

    smoothScroll(top);
    e.preventDefault();
})
formInputs.init();