import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const SelectInput = ({name, label, defaultOption, value, errors, warns, successes, rendered, required, inputChange, onBlur, options, wrapperClass}) => {

	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';

		errorLabel = <View>{errors[name]}</View>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		// warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <View>{warns[name]}</View>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		// successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <View>{successes[name]}</View>;
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
	
	let selectOptions = [];
	for (let i = 0; i < options.length; i++) {
		let label = "";
		if (options[i].label == null && options[i].defaultText != null) {
			label = options[i].defaultText;
		} else if (options[i].label != null) {
			label = options[i].label;
		}
		selectOptions.push(<option key={i} value={options[i].value}>{label}</option>);
	}
	
	if (rendered) {
		return (
			<View>
				<Text>{label}{req}</Text>
			
			</View>
		);
	} else {
		return (<View></View>);
	}
};

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string
};

export default SelectInput;
