import React from 'react';
import PropTypes from 'prop-types';
import SelectMultiple from './select-multiple-input';

const SelectInputBuilder = ({itemState, field, options, inputChange, lang, defaultOption }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
	}
	
	return (
			<SelectMultiple itemState={itemState} name={fieldName} label={field.label} options={options} 
				inputChange={inputChange} defaultOption={defaultOption}/>
	);
};

SelectInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	options: PropTypes.array,
	defaultOption: PropTypes.array,
	inputChange: PropTypes.func.isRequired,
	lang: PropTypes.string
};

export default SelectInputBuilder;
