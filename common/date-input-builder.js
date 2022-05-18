import React from 'react';
import PropTypes from 'prop-types';
import DateInput from '../../coreView/common/date-input';

const DateInputBuilder = ({itemState, field, inputChange, onBlur, lang}) => {
	let fieldName = field.name;
	if (lang != null){
		fieldName = field.name+"-"+lang;
	}
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (itemState != null && itemState.inputFields != null && itemState.inputFields[codeModel.field] != null) {
			defaultInput = itemState.inputFields[codeModel.field];
		}
	}
	
	let comment = "";
	if (field.validation != "") {
		let validation = JSON.parse(field.validation);
		if (validation.comment != null) {
			comment = validation.comment;
		}
	}
	let errors = null;
	if (itemState != null && itemState.errors != null){
		errors = itemState.errors;
	}
	
	let warns = null;
	if (itemState != null && itemState.warns != null){
		warns = itemState.warns;
	}
	
	let successes = null;
	if (itemState != null && itemState.successes != null){
		successes = itemState.successes;
	}
	
	return (
			<DateInput name={fieldName} label={field.label} rendered={field.rendered} required={field.required} errors={errors} successes={successes}
			warns={warns} inputChange={(e) => inputChange("DATE",fieldName,'',e)} value={(itemState.inputFields != null && itemState.inputFields[fieldName] != null)?itemState.inputFields[fieldName]:defaultInput} comment={comment}
			onBlur={(onBlur != null)?onBlur(field):null}/>
		);
	
};

DateInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	lang: PropTypes.string
};

export default DateInputBuilder;
