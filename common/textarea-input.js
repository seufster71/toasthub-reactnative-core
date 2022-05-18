import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';

const TextAreaInput = ({name, label, placeHolder, value, errors, warns, successes, rows, cols, rendered, required, inputChange, onBlur, wrapperClass, comment}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	if (rows == null || rows.length == 0){
		rows = 2;
	}
	
	if (cols == null || cols.length == 0){
		cols = 50;
	}
	
	let commentLabel = '';
	if (comment != null && comment != "") {
		commentLabel = comment;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {

		errorLabel = <View>{errors[name]}</View>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] != "") {

		warnLabel = <View>{warns[name]}</View>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] != null && successes[name] != "") {
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
	if (rendered) {
		return (
			<View >
				<View>{label}{req}</View>
				<TextInput multiline={true} numberOfLines={4} onChangeText={inputChange} placeholder={placeHolder} value={value}/>
				{commentLabel}
				{errorFeedBack}
				{errorLabel}
				{warnFeedBack}
				{warnLabel}
				{successFeedBack}
				{successLabel}
			</View>
		);
	} else {
		return (<View></View>);
	}
};

TextAreaInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	value: PropTypes.string,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	rows: PropTypes.number,
	cols: PropTypes.number,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func,
	onBlur: PropTypes.func,
	wrapperClass: PropTypes.string,
	comment: PropTypes.string
};

export default TextAreaInput;
