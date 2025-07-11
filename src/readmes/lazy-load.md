<h2 id="plugin-lazy-load">Lazy Load</h2>

By default it will load background images and images lazily slightly before they appear in the viewport. But also run custom fuctions as well to hook into elements appearing (or disappearing) as well. This plugin uses [window.IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This plugin works to load images with the `loading="lazy"` attribute (yes it would work by itself!). It loads the image/iframe before the first pixel enters the viewport--see settings as we can pad so it can appear loaded once scrolled to. The `loading="lazy"` attribute only works once the first pixel enters the viewport, which may cause a blank space before the image loads.


Option | Type | Default | Description
------ | ---- | ------- | -----------
imgSrcName | string | 'src' | Name of the data attribute to load an image source. For example `<img src="cleardot.gif" data-src="your-lazy-image.jpg">`.
bgSrcName | string | 'bgSrc' | Name of the data attribute to load a background image. Use camel casing when changing.
loadImgs | boolean | true | Load images and background images. Built-in function for this since its the core intended functionality.
inEvt | Function | null | Custom function that hooks into the element appearing on screen. the `lazyElem` and `entry` are the two parameters passed, so `inEvt(lazyElem, entry) = > {console.log(lazyElem, entry)}`.
outEvt | Function | null | Custom function that hooks into the element disappearing in the viewport. Same parameters are passed as the inEvt function.
force | boolean | false | Pass in a custom condition that will just bypass the lazy load.
observerID| string | null | ID of `window.IntersectionObserver` which gets created with the 'new' operator, so one can get used for each instance.
unobserve| boolean | true | once entered in on the viewport, it'll unobserve. Make `false` should you want to re-observe an element.
observerOpts| object | { rootMargin: '48px' } | Object being passed is the 'options' argument for the IntersectionObserver, please refer to documentation regarding that [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer).
### Example

__The following is an example html structure for this plugin:__

__HTML__
```html
<img src="https://placehold.it/768x768/565656" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768/444" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768/222" alt="Placeholder" loading="lazy"/>

<img src="https://placehold.it/768x768" alt="Placeholder" loading="lazy"/>


<p>It's nearly inevitable your website will need these plugin's and functions for it to work. These are made to work with <a href="https://github.com/fabiospampinato/cash" target="_blank">Cash</a> (with jQuery still an option) as the only dependency.</p>
<h2>About</h2>
<p><a href="#page-bottom" class="smooth-scroll">Go To Page Bottom Smooth Scroll</a> Below are some common plugin's to help enhance your website. You'll notice some are missing (like a Carousel for example), that's because there are just some really, realy well made, IMO. Not touching that stuff, use it, its great. Others I always thought could be better, even though a few are frankly near duplicates 🤷🏻‍♂️. Anyways here we are, and you're stil reading this! If you download you probably work where I do, or somehow stumbled across.</p>

<h2>Some nice features are their is some shared syntax in the way they all operate.</h2>

<p><strong>For Example:</strong> all have options that can be plugged in as a data attribute, in JSON format (loosely written somehat)</p>
                
```

__JavaScript__
```javascript

//load regular images few pixels before then enter
//the screen rather than the first pixel to enter
$('img[loading="lazy"]').lazyLoad({
    observerID: 'imgLazy',
    observerOpts: { rootMargin: '100px' }
});

//a bunch of paragraphs to style right!
$('p.highlight').lazyLoad({
    observerID: 'p',
    loadImgs: false, 
    unobserve:false,
    inEvt: (el) => {
        setTimeout(()=> {el.style.background = '#ccc';},1000);
    },
    outEvt: (el) => {
        setTimeout(()=> {el.style.background = null;},1000);
    }
});
```