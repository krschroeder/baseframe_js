import type { Selector } from "cash-dom";
import type { Cash } from "cash-dom";
import type Modal from './plugin/modal';
import type { FnModal } from './plugin/modal';
import type { cookies } from "./util/cookies";
import type AccessibleMenu from "./plugin/accessibleMenu";
import type { FnAccessibleMenu } from "./plugin/accessibleMenu";

export function collapse(options?: object | 'remove'): Cash;
export function lazyLoad(options?: object | 'remove'): Cash;
export function parallax(options?: object | 'remove'): Cash;
export function selectEnhance(options?: object | 'remove'): Cash;
export function tabs(options?: object | 'remove'): Cash;
export function store<T>(dataName: string, data?: T): void | T;


export {
    cookies,
    FnAccessibleMenu, AccessibleMenu,
    FnModal, Modal
}