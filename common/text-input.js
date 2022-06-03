import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TextInput } from "react-native";

const InputText = ({name, label, placeHolder, value, errors, warns, successes, inputType, min, max, rendered, required, inputChange, onBlur, wrapperClass, comment}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	
	let commentLabel = null;
	if (comment != null && comment != "") {
		commentLabel = <Text>{comment}</Text>;
	}
	
	let errorLabel = null;
	let errorFeedBack = null;
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <Text/>;
		errorLabel = <Text>{errors[name]}</Text>;
	}
	
	let warnLabel = null;
	let warnFeedBack = null;
	if (warns != null && warns[name] != null && warns[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <Text/>;
		warnLabel = <Text>{warns[name]}</Text>;
	}
			
	let successLabel = null;
	let successFeedBack = null;
	if (successes != null && successes[name] != null && successes[name] != "") {
		wrapperClass += " " + 'has-success has-feedback';
		successLabel = <Text>{successes[name]}</Text>;
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
				<Text style={styles.FieldText} >{label}{req}</Text>
				<TextInput style={styles.FieldInput} autoComplete="off" autoCorrect={false} autoCapitalize="none" onChangeText={(e) => inputChange(e,name)} placeholder={placeHolder} value={value}/>
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

const styles = StyleSheet.create({
	FieldInput: {
		height: 40,
		width: 300,
		paddingHorizontal: 5,
    	marginBottom: 5,
    	borderWidth: 1,
		backgroundColor: '#FFF',
    	padding: 10,
	},
	FieldText: {
		color: '#FFF'
	}
});

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
