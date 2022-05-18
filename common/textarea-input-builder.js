import React from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../../coreView/common/textarea-input';

const TextAreaInputBuilder = ({field, inputChange, onBlur, itemState, lang}) => {
	let fieldName = field.name;
	if (lang != null){
		fieldName = field.name+"-"+lang;
	}
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (itemState.selected != null && itemState.selected[codeModel.field] != null) {
			defaultInput = itemState.selected[codeModel.field];
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
			<TextAreaInput name={fieldName} label={field.label} rendered={field.rendered} required={field.required} errors={itemState.errors} successes={itemState.successes} rows={field.rows} cols={field.cols}
			warns={itemState.warns} inputChange={(e) => inputChange("TEXT",fieldName,'',e)} value={(itemState.inputFields != null && itemState.inputFields[fieldName] != null)?itemState.inputFields[fieldName]:defaultInput} comment={comment}
			onBlur={(onBlur != null)?onBlur(field):null}/>
		);
	
};

TextAreaInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	inputChange: PropTypes.func,
	onBlur: PropTypes.func,
	lang: PropTypes.string
};

export default TextAreaInputBuilder;
