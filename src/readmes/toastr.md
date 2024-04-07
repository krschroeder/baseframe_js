<h2 id="toastr-plugin">Toastr</h2>
Little toastr messages for everyone, side of marmalade optional.

### Features
Can set groups of toastr's with the `cssGroupKey` if there ever needs to be multiple toastr's at once in various positions.

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
duration | number | 3000 | The duration in milliseconds the toastr message will appear for.
appendTo | HTMLElement | `document.body` | HTML element to append the toastr message to.
ariaLive: POLITENESS_SETTING | 'polite' | Aria Live property messaging settings
animationDuration | number | 500 | Amount of time the transitional css class will append to the class list of the element.
content | string OR HTMLElement | '' | Message text/HTML of the toastr.
outerCss | string | 'toastr' | CSS class to the div container of the message.
enabledCss | string | 'toastr--enabled' | CSS to show the toastr message
dismissCss | string | 'toastr--dismiss' | CSS to dismiss the toastr message
btnDismissCss | string | 'toastr__btn-dismiss' | CSS for the dismiss button element.
closeIconCss | string | 'ico i-close' | Icon CSS to draw the 'X' or what have you to dismiss the toastr.
cssGroupKey | string | 'std' | Key which is used to group together like Toastr messages. Additionally as a CSS concatenated prop, keep that in mind.
oneOnly | boolean | true | launches only one at a time.

### Example

__Add these clicks to buttons or other elements should they be applicable:__

__HTML__
```html
<h3>Toastr</h3>
<ul>
	<li><button id="toastr-1">Launch a Toastr</button></li>
	<li><button id="toastr-2">Launch a Toastr Two</button></li>
	<li><button id="toastr-3">Launch a Toastr Three</button></li>
	<li><button id="toastr-4">Launch a Toastr Four</button></li>
</ul> 
```
__JavaScript__
```javascript
	// Example 1: standard way
    $('#toastr-1').toastr({
        content: 'Toast is good for breakfast',
        duration: 7000
    });
	
	// and you can make an update here which will use the same instance
	// note: any props that build the html elements cannot be updated
	// unless of course you destroy the instance and rebuild it.
	$('#toastr-1').toastr({ content: 'A new toast message'});


    // Example 2: extend perhaps in Cash then call on click
    const toastr1 = new $.toastr($('#toastr-2')[0] as HTMLElement, {
        content: 'Toast is good for breakfast',
        duration: 5000
    });
    const toastRandomMsgs = [
        'I boast about my toast.',
        'The hostess with the toastess',
        'toast is best, when its not burnt',
        'The fire is quite toasty',
        'Lets toast, to toast!'
    ]
    const randomToastMsg = () => {
        return toastRandomMsgs[Math.floor(Math.random() * toastRandomMsgs.length)]
    }

    $('#toastr-2').on('click',function(){
        setTimeout(() => {
            toastr1.setContent(randomToastMsg(),true)
        },2500)
    });

    // Example 3,4: somewhere else on the page
    $('#toastr-3').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });

    $('#toastr-4').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
```