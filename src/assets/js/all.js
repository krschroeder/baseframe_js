//cash dom or jquery are a dependency
//not importing them because it can be either or
import installStoreToLibrary from './util/store';
import libraryExtend from './util/lib-extend';
import smoothScroll from './util/smooth-scroll';
import getUrlParam, {getHashParam} from './util/get-param';
import Popup from './popup';
import AccessibleMenu from './accessible-menu';
import Collapse from './collapse';
import Parallax from './parallax';
import NavDesktop from './nav-desktop';
import NavMobile from './nav-mobile';
import Tabs from './tabs';
import EqualizeContent from './equalize-content';
import ResponsiveDropDown from './responsive-dropdowns';
import LazyLoad from './lazy-load';

import cookies from './cookies';
import formInputs from './form-input';
import throttledResize from './util/throttle-resize';
import bgResponsiveLoad from './bg-responsive-load';

// this is needed for all to operate
// so I would say this makes sense
export default installStoreToLibrary;
export {
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    NavDesktop,
    NavMobile,
    Parallax,
    Popup,
    ResponsiveDropDown,
    Tabs,
    LazyLoad,
    bgResponsiveLoad,
    cookies,
    formInputs,
    getHashParam,
    getUrlParam,
    smoothScroll,
    throttledResize
} 