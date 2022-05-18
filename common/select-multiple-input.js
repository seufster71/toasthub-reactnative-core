import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectMultipleInput = ({itemState, name, label, defaultOption, value, rendered, required, inputChange, onBlur, options, wrapperClass, inline}) => {

	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	if (inline != null && inline == "true") {
		inline = true;
	} else {
		inline = false;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (itemState != null && itemState.errors != null && itemState.errors[name] != null && itemState.errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{itemState.errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (itemState != null && itemState.warns != null && itemState.warns[name] != null && itemState.warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{itemState.warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (itemState != null && itemState.successes != null && itemState.successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{itemState.successes[name]}</label>;
	}
	
	let req = "";
	if ((typeof required === "boolean" && required) || (typeof required === "string" && required == "true")){
		req = " *";
	}
	
	if (rendered == null || rendered.length == 0){
		rendered = true;
	} else if (typeof rendered === "string"){
		if (rendered == "true") {
			rendered = true;
		} else {
			rendered = false;
		}
	}
	
	if (rendered) {
		if (inline) {
			return (
				<div className={wrapperClass}>
					<div className="row">
						<div className="col-md-3">
							{label}{req}
						</div>
						<div className="col-md-9">
							<Select id="multiSelect" name={name} defaultValue={defaultOption} isMulti onChange={(e) => inputChange(name,e)} options={options}/>
						</div>
					</div>
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</div>
			);
		} else {
			return (
					<div className={wrapperClass}>
						<label htmlFor={name}>{label}{req}</label>
						<Select id="multiSelect" name={name} defaultValue={defaultOption} isMulti onChange={(e) => inputChange(name,e)} options={options}/>
						{errorFeedBack}
						{errorLabel}
						{warnFeedBack}
						{warnLabel}
						{successFeedBack}
						{successLabel}
					</div>
				);
		}
	} else {
		return (<div></div>);
	}
};

SelectMultipleInput.propTypes = {
	itemState: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string,
	inline: PropTypes.string
};

export default SelectMultipleInput;
