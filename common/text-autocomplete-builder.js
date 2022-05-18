import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';
import { View } from 'react-native';

const TextAutocompleteBuilder = ({item, field, inputFields, inputChange, onBlur, containerState, lang, options, isSelectListOpen}) => {
	
	let value = "";
	if (inputFields != null && inputFields[field.name] != null) {
		value = inputFields[field.name].label;
	} else if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (item != null && item[codeModel.field] != null) {
			value = item[codeModel.field];
		}
	}
	
	let commentLabel = '';
	if (field.validation != "") {
		let validation = JSON.parse(field.validation);
		if (validation.comment != null) {
			commentLabel = validation.comment;
		}
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (containerState != null && containerState.errors != null && containerState.errors[name] != null && containerState.errors[name] != "") {
		errorLabel = <View>{errors[name]}</View>;
	}
		
	let warnLabel = '';
	let warnFeedBack = '';
	if (containerState != null && containerState.warns != null && containerState.warns[name] != null && containerState.warns[name] != "") {

		warnLabel = <View>{warns[name]}</View>;
	}
	
	let successLabel = '';
	let successFeedBack = '';
	if (containerState != null && containerState.successes != null && containerState.successes[name] != null && containerState.successes[name] != "") {
		successLabel = <View>{successes[name]}</View>;
	}
	
	let req = "";
	if ((typeof field.required === "boolean" && field.required) || (typeof field.required === "string" && field.required == "true")){
		req = " *";
	}
	
	let rendered = true;
	if (field.rendered == null || field.rendered.length == 0){
		rendered = field.rendered;
	} else if (typeof field.rendered === "string"){
		if (rendered == "true") {
			rendered = true;
		} else {
			rendered = false;
		}
	}
	let placeHolder = "";
	
	if (rendered) {
		return (
			<View>
				<View>{field.label}{req}</View>
				<Input autoCapitalize="off" onChangeText={(e) => inputChange("SELECT",field,'',e)} placeholder={placeHolder} value={value || ""}/>
				{isSelectListOpen &&
					<View>
						{options}
					</View>
				}
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

TextAutocompleteBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	lang: PropTypes.string,
	isSelectListOpen: PropTypes.bool
};

export default TextAutocompleteBuilder;
