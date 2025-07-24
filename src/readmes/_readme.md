# Baseframe JS

Baseframe JS is a comprehensive suite of modular plugins and utilities designed for front-end development. It provides solutions for common UI needs supplying solutions for: modals, collapsible sections, parallax effects, tabs and more. Additionally it has utility functions for cookies, smooth scrolling, debouncing, and URL state management. All plugins are highly configurable and follow consistent patterns, making it easy to integrate and extend them in your projects.

---

## Features
Baseframe JS is meant to be something you can build off of.

- **Consistent Plugin Architecture:** All plugins share a unified API and configuration approach, simplifying usage and customization.
- **Data Attribute Configuration:** Easily configure plugins via `data-` attributes using object literal syntax.
- **Dynamic Parameter Updates:** Update most plugin parameters after initialization without re-instantiating.
- **Event Callbacks:** Register callbacks for key plugin events (e.g., open, close, update).
- **TypeScript Support:** Full type definitions for seamless integration with TypeScript projects.
- **Flexible DOM Library Integration:** Extend plugins into jQuery, Cash-Dom, or Base Elem JS.
- **Minimal, Customizable SCSS:** Base styles provided for all plugins, easily extended or overridden.

---

## Usage

### Importing Plugins

You can import all plugins and utilities at once, or selectively import only what you need for optimal bundle size:

```javascript
import libraryExtend, {
    AccessibleMenu,
    Collapse,
    Cookies,
    LazyLoad,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr,
    UrlState,
    smoothScroll,
    debounce,
    debounceResize,
    focusTrap
} from 'baseframe-js';

// For tree-shaking, import individual modules:
import Collapse from 'baseframe-js/dist/js/Collapse';
```

### Extending a DOM Library

Baseframe JS plugins can be installed into [jQuery](https://jquery.com/), [Cash-Dom](https://www.npmjs.com/package/cash-dom), or [Base Elem JS](https://www.npmjs.com/package/base-elem-js):

```typescript
libraryExtend([
    Collapse,
    LazyLoad,
    Modal,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr
], $library);
```

### TypeScript Integration

To enable full type support with jQuery or Cash-Dom, extend their interfaces with the provided plugin types:

```typescript
import {
    Collapse, type CollapsePlugin,
    Modal, type ModalPlugin,
    // ...other plugins: 
    // All plugins types are named the following way: [Plugin Name]Plugin
} from 'baseframe-js';

declare global {
    interface JQuery<TElement = HTMLElement> extends CollapsePlugin, ModalPlugin {}
}

declare module 'cash-dom' {
    interface Cash extends CollapsePlugin, ModalPlugin {}
}
```

### Configuring Plugins via Data Attributes

All plugins accept configuration via a `data-pluginName-options` attribute in object literal format:

```html
<div id="your-plugin-elem" data-pluginName-options="{ option: 'value', anotherOption: true }"></div>
```

### Updating Plugin Parameters

Most plugin parameters can be updated after initialization by calling the plugin method again with new options:

```javascript
$('.your-plugin-elem').plugin({ option: 'newValue', height: 1000 });
```

### Removing a Plugin Instance

Remove a plugin and its components by calling:

```javascript
$('.element').plugin('remove');
```
Or, using the static method:
```javascript
$.plugin.remove($('.element').eq(1));
```

### Including Base Styles

All base SCSS styles are located in the `dist/scss/` directory. Import and customize as needed for your project.

---

## Available Plugins

- **Accessible Menu:** Keyboard-friendly navigation with arrow key support and escape-to-close.  
  [View Accessible Menu](#accessible-menu-plugin)

- **Collapse:** Expandable/collapsible sections, suitable for accordions and more.  
  [View Collapse](#collapse-plugin)

- **Lazy Load:** Run custom code for elements as they enter and exit the viewport. Also, loads images and backgrounds as they approach the viewport using IntersectionObserver.  
  [View Lazy Load](#plugin-lazy-load)

- **Modal:** Flexible modal dialogs with focus trapping, customizable content, and event hooks.  
  [View Modal](#modal-plugin)

- **Navigation Desktop:** Enhanced desktop navigation with edge detection and mouse refocus.  
  [View Navigation Desktop](#nav-desktop-plugin)

- **Navigation Mobile:** Mobile-first navigation with toggleable sub-sections.  
  [View Navigation Mobile](#nav-mobile-plugin)

- **Parallax Elements:** Horizontal, vertical, and zoom parallax effects with background fill options.  
  [View Parallax Elements](#parallax-plugin)

- **Scroll Spy:** Highlights navigation elements based on scroll position and anchor targets.  
  [View Scroll Spy](#scroll-spy-plugin)

- **Select Enhance:** Fully stylable `<select>` elements with enhanced dropdowns. Supports the `<optgroup>` option grouping.
  [View Select Enhance](#select-enhance-plugin)

- **Tabs:** Accessible tabbed interfaces with keyboard navigation and history tracking.  
  [View Tabs](#tabs-plugin)

- **Toastr:** Dismissible notification messages with customizable positions and stacking.  
  [View Toastr](#toastr-plugin)

---

## Utility Functions

### `libraryExtend`

Integrates plugins into a DOM manipulation library (jQuery, Cash, or Base Elem JS):

```typescript
libraryExtend(
  plugins: Array<Plugin> | Plugin,
  Library: Cash | jQuery | BaseElem,
  notify?: boolean
);
```

**Parameters**
- **plugins**: Can be one Plugin, or an array of them. 
- **Library**: The second parameter is the library to extend into. Currently can plug into __jQuery__, __Cash__, or the __Base Elem__ which is used in the package.
- **notify** (optional): The final parameter console logs each updated parameter when they get updated. Really meant only for development purposes to help debugging.

### `smoothScroll`

Smoothly scrolls to a target Y position with optional easing and callback:

```typescript
smoothScroll(
    scrollTargetY: number,
    duration?: number,
    easing?: EasingFn | Easings,
    scrollEndFn?: (...args) => void
);
```

**Parameters**
- **scrollTargetY**: The destination to scroll to. Pass in the Y position of the element you want to scroll to.
- **duration** (optional): The time in milliseconds over which the scroll animation occurs. Defaults to 400ms if not specified.
- **easing** (optional): Accepts a custom easing function or the following string values: 'linear', 'easeInOutCubic', 'easeInOutQuart', 'easeOutQuint'.  

### `focusTrap`

Traps keyboard focus within a container (used by Modal):

```typescript
const trappedFocus = focusTrap(element: Cash | HTMLElement, params?: ITrapFocusProps);
// Remove later:
trappedFocus.remove();
```

### `Cookies`

Static class for managing browser cookies:

```javascript
Cookies.set('cookieName', 'value', { path: '/', expires: 60 });
Cookies.get('cookieName');
Cookies.remove('cookieName', { path: '/' });
```

**Parameters**
- **cookieName**: The cookie name
- **cookieValue**: The value of the cookie
- **config** (optional): The configuration of the cookies being set

__Cookie Configation Options__
Option | Description
------ | -------
path | Path to the cookie, default is the current `location.pathname`.
expires | Set in minutes. Time the cookie will expire.
secure | Sets the cookie so it can only be accessed via https protocol. This gets set automatically when `sameSite` is set to `None`.
sameSite | `Lax`, `Strict`, or `None` are the options.

### `debounce` and `debounceResize`

Debounce event handlers or window resize events to improve performance:

```typescript
debounce('#my-button', 'click', (ev, elem) => { ... }, { delay: 300 });
debounceResize(() => { ... }, 200);
```

**`debounce` Parameters**
- **elem**: The element(s) or selector to bind the event to.
- **event**: The event name(s) to listen for (e.g., `'click'`, `'input'`).
- **cb**: The callback function to run after the debounce delay.
- **config** (optional): 
  - `immediate` (boolean): If `true`, the callback fires immediately on the first event, then debounces subsequent calls. Default: `false`.
  - `delay` (number): The debounce delay in milliseconds. Default: `100`.

### `UrlState`

Static class for managing URL hash and search parameters:

```typescript
UrlState.set('search', 'param', 'value');
UrlState.get('hash', 'section');

// by default the UrlState static class tracks 'popstate' updates. 
// Setting to false removes that tracking.
UrlState.refresh(true);

 
// prints the values, 'brackets' option will add the [] to any
// key that contains an array value, as back-end needs or doesn't
UrlState.print(type: UrlSearchType, options: UrlPrintOptions): string

// updates the url, this is used in the UrlState.set if the fourth param is set
UrlState.toUrl(type: UrlSearchType, paramName: string): UrlParamRawValue
 
// sets new value, updates params in url if 4th param set
UrlState.set( 
    type: UrlSearchType, 
    paramName: string, 
    value: UrlParamRawValue,
    state?: StateChangeType
): void;
 
// sets a hash value, ex: 'https://your-website.com/some-page#your-hash-val'
UrlState.setHashVal(null, 'push'): void; 
// updates to: https://your-website.com/some-page and pushes to the history

UrlState.setHashVal('new-hash-value', 'replace'): void; 
// updates to: https://your-website.com/some-page#new-hash-value and replaces to the history
 
```

---

## Plugins

<br>
<br>
@@include('./accessible-menu.md')
<br>
<br>
@@include('./collapse.md')
<br>
<br>
@@include('./lazy-load.md')
<br>
<br>
@@include('./modal.md')
<br>
<br>
@@include('./nav-desktop.md')
<br>
<br>
@@include('./nav-mobile.md')
<br>
<br>
@@include('./parallax.md')
<br>
<br>
@@include('./scroll-spy.md')
<br>
<br>
@@include('./select-enhance.md')
<br>
<br>
@@include('./tabs.md')
<br>
<br>
@@include('./toastr.md')

---

## Release Notes

### __Version 6.0.0__
- Major changes to the `SelectEnhance` plugin: dropdown now appends to the body, resolving overflow issues. Not compatible with v5 CSS.
- Fixed a bug in `Parallax` when used with jQuery.

### __Version 7.0.0__
- Migrated away from Cash Dom to a custom DOM library.
- Updated smooth scrolling and naming conventions.
- Refactored and introduced breaking changes to several plugins, warranting a major version bump.