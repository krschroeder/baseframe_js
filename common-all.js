//cash dom or jquery are a dependency
//not importing them because it can be either or
import {installStoreToLibrary} from './src/assets/js/util/data';
import libraryExtend from './src/assets/js/util/lib-extend';
import smoothScroll from './src/assets/js/util/smoothScroll';

import Popup from './src/assets/js/popup';
import Collapse from './src/assets/js/collapse';
import Parallax from './src/assets/js/parallax';
import NavDesktop from './src/assets/js/nav-desktop';
import NavMobile, {NavMobileNestled} from './src/assets/js/nav-mobile';
import Tabs from './src/assets/js/tabs';
import EqualizeContent from './src/assets/js/equalize-content';
import MarketoForm from './src/assets/js/marketo-form';
import ResponsiveDropDown from './src/assets/js/responsive-dropdowns';
import formInputs from './src/assets/js/form-input'

// this is needed for all to operate
// so I would say this makes sense
export default installStoreToLibrary;
export {
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
}