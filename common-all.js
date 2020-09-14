//cash dom or jquery are a dependency
//not importing them because it can be either or
import {installStoreToLibrary} from './src/util/data';
import libraryExtend from './src/util/lib-extend';

import Popup from './src/common/js/popup';
import Collapse from './src/common/js/collapse';
import Parallax from './src/common/js/parallax';
import NavDesktop from './src/common/js/nav-desktop';
import NavMobile, {NavMobileNestled} from './src/common/js/nav-mobile';
import Tabs from './src/common/js/tabs';
import EqualizeContent from './src/common/js/equalize-content';
import MarketoForm from './src/common/js/marketo-form';
import ResponsiveDropDown from './src/common/js/responsive-dropdowns';
import formInputs from './src/common/js/form-input'

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
    formInputs
}