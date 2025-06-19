<h2 id="scroll-spy-plugin">Scroll Spy</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix  | string | 'scroll-spy' | CSS class name for styling purposes
observerOptions | IntersectionObserverInit | `{rootMargin: "0px", threshold: 1}` | Intersection observer options. By default this is set-up to work with an `<h2 id="the-id">` with a `threshold` of `1` is most appropriate. This should be adjusted if your spying an entire section instead.
scrollBehavior | 'auto' \| 'instant' \| 'smooth' | the type of scroll to move to a section with the scroll spy.
spyNavElems| 'a' \| 'button' | `a` | Elements to look at and highlight in the navigation that is being spied.
setActiveCssToLi | boolean | true | If the spied element resides in a `<li>` attach the active class to that instead of the element
spyBody | Selector | '.scroll-spy-body' | A selector to identify the section of the hightlighted elements that pair with the 'spyNavElems'
spyElems | string | 'h2' | String to identify which elements to see that have entered in thew viewport. The observer options (seen in `observerOptions`) are set-up to look at headings. As mentioned above, to look at sections please adjust the `threshold` from 1 to something that is more appropriate.
callback | ScrollSpyCallBack | `undefined` | Callback to tap into the entries being spied on.
 
```typescript
type ScrollSpyCallBack = (topMostEntries: HTMLElement[], navEntries: HTMLElement[]) => void;
```


### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<!--Nav to Spy-->
<nav id="main-nav" class="main-nav">			 
    <ul>
        <li><a href="#section-parallax">Parallax</a></li>
        <li><a href="#section-tabs">Tabs</a></li>
        <li><a href="#section-collapse">Collapse</a></li>
        <li><a href="#section-toastr">Toastr</a></li>
        <li><a href="#section-modal">Modal</a></li>
        <li><a href="#section-selectEnhance">Select Box Enhance</a></li>
        <li><a href="#section-nav">Accessible Menu / Mobile and Desktop Nav</a></li>
        <li><a href="#section-lazyLoad">Lazy Load</a></li>
    </ul>
</nav>

<!--Body to spy that pairs with the nav-->

<div class="scroll-spy-body">

    <h2 id="section-parallax">Parallax</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quae vero auctorem tractata ab fiducia dicuntur.</p>

    <h2 id="section-tabs">Tabs</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quae vero auctorem tractata ab fiducia dicuntur.</p>
    <!-- and more ...-->
</div>
```

__JavaScript__

```javascript
 $('#main-nav').scrollSpy({
        spyBody: '.scroll-spy-body',
        locationFilter: 'spy',
        observerOptions: {
            rootMargin: "80px 0px 0px",
            threshold: 1
        }
})

```