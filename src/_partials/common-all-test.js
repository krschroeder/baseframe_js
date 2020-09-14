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
    Tabs
} from '../../common-all';

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


formInputs.init();