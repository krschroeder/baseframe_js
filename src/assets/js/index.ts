import libraryExtend                    from './core/libraryExtend';

// Core
export { default as UrlState }          from './core/UrlState';
export { default as Store}              from "./core/Store";
export default libraryExtend;

// Functions
export { default as smoothScroll }      from './fn/smoothScroll';
export { default as Cookies }           from './fn/Cookies';
export { 
    default as debounce, 
    debounceResize 
}                                       from './fn/debounce';
export { default as focusTrap }         from './fn/focusTrap';

// Plugins
export { default as AccessibleMenu, type AccessibleMenuPlugin } from './AccessibleMenu';
export { default as Collapse, type CollapsePlugin }             from './Collapse';
export { default as LazyLoad, type LazyLoadPlugin }             from './LazyLoad';
export { default as Modal, type ModalPlugin }                   from './Modal';
export { default as NavDesktop, type NavDesktopPlugin }         from './NavDesktop';
export { default as NavMobile, type NavMobilePlugin }           from './NavMobile';
export { default as Parallax, type ParallaxPlugin }             from './Parallax';
export { default as ScrollSpy, type ScrollSpyPlugin }           from './ScrollSpy';
export { default as SelectEnhance, type SelectEnhancePlugin }   from './SelectEnhance';
export { default as Tabs, type TabsPlugin }                     from './Tabs';
export { default as Toastr, type ToastrPlugin }                 from './Toastr';