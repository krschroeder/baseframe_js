<h2 id="scroll-spy-plugin">Scroll Spy</h2>


### Features


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
cssPrefix  | string | 'scroll-spy' | CSS class name for styling purposes
observerOptions | IntersectionObserverInit | `{rootMargin: "0px", threshold: 1}` | Intersection observer options. By default this is set-up to work with an `<h2 id="the-id">` with a `threshold` of `1` is most appropriate. This should be adjusted if your spying an entire section instead.
spyNavElems| 'a' \| 'button' | `a` |
setActiveCssToLi | boolean | 
spyBody | Selector | 
spyElems | string | 
callback | ScrollSpyCallBack | 


    cssPrefix: string;
    spyNavElems: 'a' | 'button';
    setActiveCssToLi: boolean,
    spyBody: Selector;
    spyElems: string;
    callback?: ScrollSpyCallBack;
}

export interface IScrollSpyOptions extends Partial<IScrollSpyDefaults> {
    spyBody: Selector;
}

type ScrollSpyCallBack = (topMostEntries: HTMLElement[], navEntries: HTMLElement[]) => void;