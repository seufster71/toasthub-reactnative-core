import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

const TextInputBuilder = ({field, inputChange, onBlur, itemState, lang}) => {
	let fieldName = field.name;
	if (lang != null){
		fieldName = field.name+"-"+lang;
	}
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (itemState.item != null && itemState.item[codeModel.field] != null) {
			defaultInput = itemState.item[codeModel.field];
		}
	}
	
	let comment = "";
	if (field.validation != "") {
		let validation = JSON.parse(field.validation);
		if (validation.comment != null) {
			comment = validation.comment;
		}
	}

	return (
			<Input name={fieldName} inputType={field.htmlType} label={field.label} rendered={field.rendered} required={field.required} errors={itemState.errors} successes={itemState.successes}
			warns={itemState.warns} inputChange={(e) => inputChange("TEXT",fieldName,'',e)} value={(itemState.inputFields != null && itemState.inputFields[fieldName] != null)?itemState.inputFields[fieldName]:defaultInput} comment={comment}
			onBlur={(onBlur != null)?() => onBlur(field):null}/>
		);
	
};

TextInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	lang: PropTypes.string
};

export default TextInputBuilder;
