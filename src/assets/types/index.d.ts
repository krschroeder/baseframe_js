import type { Selector } from "cash-dom";
import type { Cash } from "cash-dom";

import { StringPluginArgChoices } from "./shared";

import type { cookies } from "./util/cookies";

import type AccessibleMenu from "./plugin/accessibleMenu";
import type { IAccessibleMenuOptions } from "./plugin/accessibleMenu";
import type Modal from './plugin/modal';
import type { IModalOptions } from './plugin/modal';
import type Collapse from "./plugin/collapse";
import type { ICollapseOptions } from "./plugin/collapse";
import type Equalize from './plugin/equalize';
import type { IEqualizeOptions } from './plugin/equalize';
import type LazyLoad from "./plugin/lazyLoad";
import type { ILazyLoadOptions } from "./plugin/lazyLoad";
import type Parallax from './plugin/parallax';
import type { IParallaxOptions } from './plugin/parallax';
import type Tabs from './plugin/tabs';
import type { ITabsOptions } from './plugin/tabs';
import type SelectEnhance from './plugin/selectEnhance';
import type { ISelectEnhanceOptions } from './plugin/selectEnhance'; 

declare module 'cash-dom' {
    export interface Cash {
        accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): Cash;
        equalize(options?: IEqualizeOptions | StringPluginArgChoices): Cash;
        collapse(options?: ICollapseOptions | StringPluginArgChoices): Cash;
        modal(options?: IModalOptions | StringPluginArgChoices): Cash;
        lazyLoad(options?: ILazyLoadOptions | StringPluginArgChoices): Cash;
        parallax(options?: IParallaxOptions | StringPluginArgChoices): Cash;
        selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): Cash;
        tabs(options?: ITabsOptions | StringPluginArgChoices): Cash;
        store<T>(dataName: string, data?: T): void | T;
    }
}

export {
    cookies,
    AccessibleMenu,
    Collapse,
    Equalize,
    LazyLoad,
    Modal,
    Parallax,
    SelectEnhance,
    Tabs
}