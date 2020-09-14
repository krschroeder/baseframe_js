# Marketo Form Magic

## About
Scripting that removes the bad things Marketo adds (classes, stylesheets and etc), and allows you to add in classes already written. Utilizes Marketo Forms 2 API. Adds in the Marketo forms 2 API script as well if its not already added, and once loaded it runs the other scripting.

## Features
Makes Marketo Form embeds great again!

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
formID| number | null | Marketo assigns a number for each form in the embed code, needed for embedding
inMarketo| boolean | false | This option should be __true__ if in Marketo, and keeps the 'MktoForms2.loadForm' from trying to load the form. When in Marketo the form will be loaded, we will just want to run the scripting to assist in styling!
account| string | "487-ERY-597"| This is the account number, and it will be available when getting the embed code
loadScript| string|  "//app-ab03.marketo.com"| This should be unique/will vary per Marketo account and can be accessed via the embed code
hideLabels| boolean | false | When set to __true__ labels will be hidden
wrapLabels| boolean | true | When set to __true__ labels for radios and checkboxes will be wrapped in a css class which displays them inline-block. This way the input and label wont separate ever.
wrapperClass| string | 'input-wrap' | the class of the wrapped checkbox/radio label pairings.
removeStyleSheets| boolean | true| The default stylesheets load content that usually makes styling the layout more difficult. But sometimes you may want to leverage the styling that already exists
cols_3| string | 'md-col-4'| The column class names for those with 3 rows in them. Set responsive classes for each breakpoint as it corresponds to the page styling!
cols_2| string | 'sm-col-6'| The column class names for those with 2 rows in them.
cols_1| string | 'col-12'| The column class names for those with 1 rows in them.
inlineFollowUp | string | null | If set to a __string__ it will redirect to the url passed in. Do not set __followUpUrl__ to a string as well (otherwise you'll re-direct)
followUpUrlDelay | number | null | Delay the page will re-direct. Optionally can use the `inlineFollowUp` setting to do this as well if that was needed.
followUpUrl| string | null | If set to a __string__ it'll display this message. The surrounding class for the message is `<span class="mkto-form-followup" />`. you can use custom `html` if necessary, should styling be attached to that element.
whenReady| function | function(){} | Additional function to run other custom scripting when the form is ready (_whenReady event has fired_). No arguments are being passed
afterSuccess| function | function(){} | Additional function to run other custom scripting when the form has submitted (_form.onSuccess_). No arguments are being passed.

## Example

__The following is an example html structure for this plugin:__

__HTML__
```
<div class="some-other-class mkto-something-form">
	<!-- Added via mkto embed-->
</div>
```

__JavaScript__
```javascript
function yourNiftyWhenReadyFn(){
	console.log('the whistles go woot!');
}
jQuery(function($){
	var myMarketoForm = new MyMarketoForm('.mkto-something-form',{
		inlineFollowUp: "Thank You for Subscribing",
		account: "597-BOK-146",
		loadScript: '//app-ab05.marketo.com',
		formID: 1470,
		whenReady: function(){
			yourNiftyWhenReadyFn();
		}
	});
});
```
