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
    smoothScroll,
    cookies
} from '../../../scripts-all';

//necessary for all plugin's to operate
//much like jQuery's $.data method, the $.store is similar
installStoreToLibrary(true);

//pass in as an array
libraryExtend([
    Collapse,
    EqualizeContent,
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

$.extend({cookies: cookies});

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