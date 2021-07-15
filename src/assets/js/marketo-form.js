

const VERSION = '1.0.0';

export default class MarketoForm {

	constructor(form,option){
		const _ = this;

		_.$mktoForm = $(form);
		_.defaults = {
			formID: null,
			inMarketo: false,//if were in marketo we don't need to load the form
			account: "597-BOK-XXX",
			loadScript: "https://app-ab05.marketo.com",
			hideLabels: false,
			removeStyleSheets: true,
			wrapLabels: true,
			wrapperClass: 'input-wrap',
			buttonClass: 'button',
			cols_3: 'md-col-4',
			cols_2: 'sm-col-6',
			cols_1: 'col-12',
			inlineFollowUp: null,
			followUpUrl: null,
			followUpUrlDelay: 0,
			whenReady: function(){},
			afterSuccess: function(){}
		};
		_.param = $.extend(_.defaults,option);

		_.insertMktoScriptsAndOrLoadForm();

	}

	static version(){
		return VERSION;
	}

	insertMktoScriptsAndOrLoadForm(){
		const _ = this;

		let script = document.createElement('script');
		const mtkoScriptSrc = `${_.param.loadScript}/js/forms2/js/forms2.min.js`;

		script.src = mtkoScriptSrc;
		script.type = "text/javascript";

		let existingScripts = document.getElementsByTagName('script');
		let lastScript = existingScripts[existingScripts.length-1];
		let alreadyHaveScript = false;

		for(let i = 0,l = existingScripts.length; i < l; i+=1){
			if( existingScripts[i].src === mtkoScriptSrc){
				alreadyHaveScript = true;
				break;
			}
		}

		if(alreadyHaveScript){
			_.loadFormAndOrDoStyleMagic();
			return;
		} else{
			script.addEventListener('load',()=>{
				console.log(`Script has been loaded: ${mtkoScriptSrc}`);
				_.loadFormAndOrDoStyleMagic();
			});
		}

		if(existingScripts.length > 0){
			lastScript.parentNode.insertBefore(script, lastScript);
		} else{
			document.getElementsByTagName('body')[0].appendChild(script);
		}
	}

	loadFormAndOrDoStyleMagic(){
		const _ = this;

		const MktoForms2 = window.MktoForms2 || null;
		if(!MktoForms2){
			console.log('MktoForms2 didn\'t properly attach. Check your settings.');
		}else{
			MktoForms2.whenReady(function(form){
				_.mktoFormMagic(_);
				_.param.whenReady(form);
			});
		}

		if(_.param.inMarketo){
			return;
		}

		MktoForms2.loadForm(
			_.param.loadScript,
			_.param.account,
			_.param.formID,
		function(form) {
			//neccessary step because this is a webforms page
			MktoForms2.$(_.$mktoForm).append(form.getFormElem());

			form.onSuccess(function () {
				if(typeof _.param.inlineFollowUp === "string"){

						_.$mktoForm.html(
							'<span class="mkto-form-followup">'+
							_.param.inlineFollowUp +
						'</span>');
						//any potential callback
						_.param.afterSuccess(form);

						return false;
				} else if (typeof _.param.followUpUrl === "string"){
					setTimeout(()=>{

						window.location.href = _.param.followUpUrl;

					},_.param.followUpUrlDelay);

					return false;
				}else{
					//go to the specificed LP dictated by the form.
				}
			});
		});
	}

	mktoFormMagic(that){
		let _ = that,
			throttleResize = null;

		//to make sure it clears the others add .row
		$('.mktoButtonRow',_.$mtkoForm).addClass('row');

		//remove the label class, it adds too many bad styles :-(
		$('.mktoLabel',_.$mtkoForm).removeClass('mktoLabel');

		$('.mktoButton',_.$mktoForm)
			.removeClass('mktoButton')
			.addClass(_.param.buttonClass);

		$('.mktoFormRow',_.$mktoForm).each(function(){
			const $row = $(this);

			$row.addClass('row')
				.removeClass('mktoFormRow');

			if( _.param.hideLabels){
				_.hideFormLabels($row);
			}

			if( _.param.removeStyleSheets ){
				_.removeMktoStylesheets();
			}
			if( _.param.wrapLabels ){
				_.wrapCheckBoxInputsWithLabels();
			}
			_.assignColumns($row);
		});



		_.mktoStripStyle(_);
		_.hideLogicalFieldMainLabel();

		$(window).on('resize',function(){

			if(throttleResize) {clearTimeout(throttleResize);}

			throttleResize = setTimeout(_.mktoStripStyle,250,_);
		});
	}

	hideLogicalFieldMainLabel(){
		const _ = this;

		//always hide the logical fields
		$('.mktoLogicalField',_.$mktoForm)
			.parent().each(function(){
				let $outerLabel = $(this).find('> label');
				let $afterInputLabel = $(this).find('.input-wrap label');

				//replace with the contents if its a single input
				if($(this).find('input').length === 1){
					let labelHTML = $outerLabel.html();
					let labelText = $outerLabel.text();
					let labelIsEmpty = labelText != "" || labelText != "*";

					if( labelText.trim().slice(-1) === ':'){

						labelText = labelHTML.trim().slice(0,-1);

					}
					if( !labelIsEmpty ){
							$afterInputLabel.html(labelHTML);
					}
					$outerLabel.addClass('hide').hide();
				}


			});
	}


	mktoStripStyle(that){
		//need to pass in this... which is that due to scoping issues
		let _ = that;

		_.$mktoForm.find('[style]')
			.not('.keep-style,select')
			.removeAttr('style');
	}

	removeMktoStylesheets(){

		 $('#mktoForms2ThemeStyle, #mktoForms2BaseStyle').remove();
	}

	hideFormLabels($scope){

		$scope.find('label').each(function(){
			if(!$(this).parent().hasClass('mktoLogicalField')){
				$(this).addClass('hide');
			}
		});
	}

	wrapCheckBoxInputsWithLabels() {
		const _ = this;

		$('.mktoCheckboxList,.mktoRadioList',_.$mktoForm).each(function () {
			const $input = $(this).find('>input');
			const isRadioType = $input.attr("type") === 'radio';
			const inputSpecificClass = isRadioType ? 'input-radio' : 'input-checkbox';

			$input.each(function (index) {
				$(this).parent().find('input:eq(' + index + '),label:eq(' + index + ')')
					.wrapAll(`<div class="${_.param.wrapperClass} ${inputSpecificClass}"/>`);
			});
		});
	}

	// wrapCheckBoxInputsWithLabels() {
    //     const _ = this;
        
    //     $('.mktoCheckboxList,.mktoRadioList', _.$mktoForm).each(function () {
    //         const $input = $(this).find('input');
    //         const $pLbl = $(this).closest('.mktoFieldWrap').find('label').first();
    //         const $pLblHTML = $pLbl.html();

    //         // const inputType = $input.attr("type").toLowerCase();
    //         const isRadioType = $input.attr("type") === 'radio';
    //         const inputSpecificClass = isRadioType ? 'input-radio' : 'input-checkbox';

    //         $input.each(function (index) {
    //             const $parent = $(this).parent();

    //             $parent.find('input:eq(' + index + '), label:eq(' + index + ')')
    //                 .wrapAll(`<div class="${_.param.wrapperClass} ${inputSpecificClass}"/>`);

    //             const $label = $parent.find('label').eq(0);

    //             !isRadioType && $label.html($pLblHTML);
    //             isRadioType && $pLbl.addClass('sr-only');
    //             $(this).after(`<i class="input-marker"/>`);

    //         });
            
    //     });
    // }

	assignColumns($scope){

		const _ = this;
		const $cols = $scope.find('.mktoFormCol'),
			colsLength = $cols.length;

		if(colsLength === 3){
			$cols.addClass(_.param.cols_3);
		}
		if(colsLength === 2){
			$cols.addClass(_.param.cols_2);
		}
		if(colsLength === 1){
			$cols.addClass(_.param.cols_1);
		}

		$cols.removeClass('mktoFormCol');
	}

}
