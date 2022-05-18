import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../coreView/common/select-input';

const SelectInputBuilder = ({itemState, field, options, inputChange, lang }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
	}
	
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (itemState.item != null && itemState.item[codeModel.field] != null) {
			defaultInput = itemState.item[codeModel.field];
		}
	}
	
	let selectOptions = [];
    if (options != null) {
    	selectOptions = options;
    } else {
    	let o = JSON.parse(field.value);
    	selectOptions = o.options
    }
	
	return (
		<Select name={fieldName} label={field.label} required={field.required} errors={itemState.errors} successes={itemState.successes} warns={itemState.warns} 
		options={selectOptions} inputChange={inputChange} value={(itemState.inputFields != null && itemState.inputFields[fieldName] != null)?itemState.inputFields[fieldName]:defaultInput}/>
	);
};

SelectInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	options: PropTypes.array,
	inputChange: PropTypes.func.isRequired,
	lang: PropTypes.string
};

export default SelectInputBuilder;
