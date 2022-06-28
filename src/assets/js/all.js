//cash dom or jquery are a dependency
//not importing them because it can be either or
import installStoreToLibrary from './util/store';
import libraryExtend from './util/library-extend';
import smoothScroll from './util/smooth-scroll';
import getUrlParam, {getHashParam} from './util/get-param';

import AccessibleMenu from './accessible-menu';
import Collapse from './collapse';
import EqualizeContent from './equalize-content';
import LazyLoad from './lazy-load';
import NavDesktop from './nav-desktop';
import NavMobile from './nav-mobile';
import Parallax from './parallax';
import Popup from './popup';
import Tabs from './tabs';
import Modal from './modal';

import cookies from './cookies';
import formInputs from './form-input';
import throttledResize from './util/throttle-resize';

// this is needed for all to operate
// so I would say this makes sense
export default installStoreToLibrary;

export {
    libraryExtend,
    AccessibleMenu,
    Collapse,
    EqualizeContent,
    Modal,
    NavDesktop,
    NavMobile,
    Parallax,
    Popup,
    Tabs,
    LazyLoad,
    cookies,
    formInputs,
    getHashParam,
    getUrlParam,
    smoothScroll,
    throttledResize
} 