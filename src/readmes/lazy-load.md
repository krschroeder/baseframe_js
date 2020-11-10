<h2 id="plugin-lazy-load">Lazy Load</h2>

Load background images and images lazily once they appear in the viewport! Also, run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses `window.IntersectionObserver` and magically polyfills for IE11. 


Option | Type | Default | Description
------ | ---- | ------- | -----------
imgSrcName | string | 'src' | Name of the data attribute to load an image source. For example `<img src="cleardot.gif" data-src="your-lazy-image.jpg">`.
bgSrcName | string | 'bgSrc' | Name of the data attribute to load a background image. Use camel casing when changing.
loadImgs | boolean | true | Load images and background images. Built-in function for this since its the core intended functionality.
inEvt | Function | null | Custom function that hooks into the element appearing on screen. the `lazyElem` is the only parameter passed, so `inEvt(lazyElem) = > {console.log(lazyElem)}`.
outEvt | Function | null | Custom function that hooks into the element disappearing in the viewport.
force | boolean | false | Pass in a custom condition that will just bypass the lazy load.
polyfillSrc | string | 'https://polyfill.io/v3/polyfill.js?features=IntersectionObserver' | Source of the polyfill for IE11. Can be changed if necessary should this need changed for any reason.
observerID| string | null | ID of `window.IntersectionObserver` which gets created with the 'new' operator, so one can get used for each instance.
unobserve| string | true | once entered in on the viewport, it'll unobserve. Make `false` should you want to re-observe an element.
observerOpts| string | { rootMargin: '48px' } | Object being passed is the 'options' argument for the IntersectionObserver, please refer to documentation regarding that [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer).
isIE | regexp | Browser dependent |  If its IE it'll resolve to `true` else `false`.

### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/565656" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/444" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768/222" 
    alt="Placeholder" 
/>

<img src="./assets/images/cleardot.gif" 
    data-src="https://placehold.it/768x768" 
    alt="Placeholder" 
/>



<div class="background-area-bg desktop-bg md-up-show"
 data-bg-src="https://placehold.it/1920x760"
></div>

<div class="background-area-bg mobile-bg md-up-hide"
    data-bg-src="https://placehold.it/768x768"
></div>


<h1>Common Plugins and JavaScript for Websites</h1>
<p class="text-md">It's nearly inevitable your website will need these plugin's and functions for it to work. These are made to work with <a href="https://github.com/fabiospampinato/cash" target="_blank">Cash</a> (with jQuery still an option) as the only dependency.</p>
<h2>About</h2>
<p><a href="#page-bottom" class="smooth-scroll">Go To Page Bottom Smooth Scroll</a> Below are some common plugin's to help enhance your website. You'll notice some are missing (like a Carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use it, its great. Others I always thought could be better, even though a few are frankly near duplicates 🤷🏻‍♂️. Anyways here we are, and you're stil reading this! If you download you probably work where I do, or somehow stumbled across.</p>

<h2>Some nice features are their is some shared syntax in the way they all operate.</h2>

<p><strong>For Example:</strong> all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)</p>
<code>
    &lt;div id="your-plugin-elem" data-plugin-name="{option:'text',option2: true, etc: 'you get the idea'}"&gt;&lt;/div&gt;
</code>

<p><strong>For Example:</strong> all can have their configuration change. Which can come in handy sometimes when things get complex</p>
<code>
    $('.your-plugin-elem').PluginOfSorts({change:'yep', height: 1e6})
</code>
                
```

__JavaScript__
```javascript

//Background images... with a custom in event
$('.background-area-bg').lazyLoad({
    observerID: 'background-area-bg', 
    inEvt: (el)=>{console.log('el',el)}
});

//regular images
$('img[data-src]').lazyLoad({
    observerID: 'img[data-src]'
});

//a bunch of paragraphs to style right!
$('p').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.color = 'red';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.color = '';},1000);
    }
});
```