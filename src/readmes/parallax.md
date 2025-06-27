<h2 id="parallax-plugin">Parallax</h2>


### Features
This plugin is for parallaxing page elements (and yes background images). Use the `bgFill` option and it'll magically expand to the height of its container if using a background image. It uses the `translate3d` property as its more efficient than using a `top` or `left` as well as `requestAnimationFrame`. Can be used to move elements either with a Y or X axis, also a Z axis for zooming (use `perspective` CSS prop on parent to work).

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
speed | number |  7 | Speed of the scroll. A negative amount will move it in the opposite direction.
zSpeed | number |  5 | Speed of the z-axis. A negative amount will move it in the opposite direction.
axis | string | 'y' | Axis of movement, it can be 'y','x'.
zAxis | boolean | false | If `true` used will utilize the z-axis.
cssPrefix | number |  'parallax' | CSS class name for styling purposes. Other derived CSS classes use the BEM naming convention.
scrollAxis | number |  'y' | The axis of which the parallax is based on.
relativeElem |  boolean \| HTMLElement \| string | false | If you need to bsae the parallaxing of one element relative to the offset of it's parent. 
bgFill | number |  false | If the parallaxing element is a background image, this adds extra height to ensure it fills the it's containing element.
rootMargin | number\| \[number,number\] | 0 | Delay the parallax effect relative to the viewport. Pass in an array \[start,end\] for tighter control.
scrollMaxPxStop | number |  5000 | The max an item can scroll. Make this less should you want it to stop prior to exiting the screen. Good for when you have content that it shouldn't overlap. 
zScrollMaxPxStop | number |  2000 | Max an item can scroll regarding the z-axis.
minWidth | number | null | The minimum width for the parallax effect to run.
maxWidth | number | null | The maximum width for the parallax effect to run.

### Example

__The following structure should be used with this plugin:__

__HTML__
```html
<section class="container">
   
    <h2 id="section-parallax">Parallax</h2>
    <div class="parallax-area">
        <img class="parallax-area__bg parallax do-parallax"
            data-parallax-options="{speed: 20, bgFill: true, zAxis: true, rootMargin: 100}"
             src="https://picsum.photos/1920/760"
            srcset="https://picsum.photos/960/760 959w, https://picsum.photos/1920/760 960w"
            size="(max-width: 959px) 959px, 960px" 
            loading="lazy"
        />
    </div>
    <div>
        <h3>Randomized Movement</h3>
    </div>
    <div class="container parallax-tiles">
        <div class="parallax do-parallax"
            data-parallax-options="{speed: 10, bgFill: false, scrollMaxPxStop: 120}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed:30, bgFill: false, scrollMaxPxStop: 220, axis: 'x'}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed:-10, bgFill: false, scrollMaxPxStop: 120}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax"
            data-parallax-options="{speed: -20, bgFill: false, scrollMaxPxStop: 180}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax" data-parallax-options="{speed:-20, bgFill: false, axis: 'x'}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div>

        <div class="parallax do-parallax" data-parallax-options="{speed:-10, bgFill: false, axis: 'x', rootMargin: [200,0]}">
            <img loading="lazy" src="https://placehold.co/768" alt="Placeholder" />
        </div> 
    </div>
    <div>
        <h3>Scroll Horizontally</h3>
        <button class="btn" id="jsBtnSCrollHorizontal">Add space for horizontal scrolling</button>
    </div>
    <div class="parallax-area">
        <img class="parallax-area__bg parallax -do-parallax do-parallax--hz" 
            data-parallax-options="{speed: -10, axis: 'x', bgFill: true, scrollAxis: 'x'}"
            src="https://picsum.photos/1920/760"
            srcset="https://picsum.photos/960/760 959w, https://picsum.photos/1920/760 960w"
            size="(max-width: 959px) 959px, 960px" 
            loading="lazy"
        />
    </div>
</section>
```

```javascript
$('.parallax-bg').parallax({
	speed:10,
	axis: 'y'
});
```
