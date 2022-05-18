import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput } from "react-native";

const InputText = ({name, label, placeHolder, value, errors, warns, successes, inputType, min, max, rendered, required, inputChange, onBlur, wrapperClass, comment}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	
	let commentLabel = '';
	if (comment != null && comment != "") {
		commentLabel = comment;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <View/>;
		errorLabel = <View >{errors[name]}</View>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <View/>;
		warnLabel = <View>{warns[name]}</View>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] != null && successes[name] != "") {
		wrapperClass += " " + 'has-success has-feedback';
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
			<View>
				<View >{label}{req}</View>
				<TextInput autoComplete="new-password" autoCapitalize="off" onChangeText={inputChange} placeholder={placeHolder} value={value}/>
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

InputText.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	inputType: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func,
	onBlur: PropTypes.func,
	wrapperClass: PropTypes.string,
	comment: PropTypes.string
};

export default InputText;
