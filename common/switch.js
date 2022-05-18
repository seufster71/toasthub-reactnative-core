import React from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Switch = ({itemState, field, inputChange, wrapperClass, lang, options }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
	}
	if (wrapperClass == null) {
		wrapperClass = 'form-group text-center';
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (itemState != null && itemState.errors != null && itemState.errors[fieldName] != null && itemState.errors[fieldName] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={fieldName + "-error"} className="control-label has-error" >{itemState.errors[fieldName]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (itemState != null && itemState.warns != null && itemState.warns[fieldName] != null && itemState.warns[fieldName] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={fieldName + "-warn"} className="control-label has-warn" htmlFor={fieldName}>{itemState.warns[fieldName]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (itemState != null && itemState.successes != null && itemState.successes[fieldName] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={fieldName + "-success"} className="control-label has-success" htmlFor={fieldName}>{itemState.successes[fieldName]}</label>;
	}
		
	// get options	
	let defaultOptions = [{"value":true,"label":"Yes"},{"value":false,"label":"No","defaultInd":true}];
	if (options == null || options != null && options.length == 0) {
		if (field.value != null) {
			let fieldOptions = JSON.parse(field.value);
			options = fieldOptions.options;
		} else {
			options = defaultOptions;
		}
	}
	let activeDefault;
	if (field.classModel != "") {
		let activeModel = JSON.parse(field.classModel);
		if (itemState.selected != null && itemState.selected[activeModel.field] != null) {
			activeDefault = itemState.selected[activeModel.field];
		}
	}
	
	let value;
	if (itemState.inputFields != null && itemState.inputFields[fieldName] != null) {
		value = itemState.inputFields[fieldName];
	} else {
		value = activeDefault;
	}
	
	if (value == null) {
		let found = false;
		for (let i = 0; i < options.length; i++) {
			if (options[i].defaultInd == true) {
				value = options[i].value;
				found = true;
			}
		}
		if (!found){
			value = false;
		}
	}
	
	// convert options to switches
	let switchOptions = [];
	for (let i = 0; i < options.length; i++) {
		let c = "btn btn-radio btn-sm notActive";
		if (value == options[i].value) {
			c = "btn btn-radio btn-sm active";
		}
		switchOptions.push(<a key={i} className={c} data-toggle={fieldName} data-title={options[i].label} onClick={() => inputChange("SWITCH",fieldName,options[i].value)}>{options[i].label}</a>);
	}

	let req = "";
	if ((typeof field.required === "boolean" && field.required) || (typeof field.required === "string" && field.required == "true")){
		req = " *";
	}
	
	let rendered = true;
	if (field.rendered != null && field.rendered.length != 0){
		if ((typeof field.rendered === "string" && field.rendered == "false")){
			rendered = false;
		} else {
			rendered = field.rendered;
		}
	}
	
	let fieldNameSwitch = fieldName + "-SWITCH";
	if (rendered) {
		return (
			<div className="form-group">
	        	<label htmlFor={fieldName} >{field.label}{req}</label>
				<div className="input-group">
					<div id={fieldNameSwitch} className="btn-group">
						{switchOptions}
					</div>
					<input type="hidden" name={fieldName} id={fieldName}/>
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</div>
	    	</div>
		);
	} else {
		return (<div></div>);
	}
};

Switch.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	inputChange: PropTypes.func.isRequired,
	wrapperClass: PropTypes.string,
	lang: PropTypes.string,
	options: PropTypes.array
};

export default Switch;
