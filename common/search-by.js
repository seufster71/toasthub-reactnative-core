import React from 'react';
import PropTypes from 'prop-types';
import SelectMultiple from './select-multiple-input';

const SearchBy = ({itemState, name, appPrefs, columns, parent, onClick}) => {

	let options = [];
	let selectedColumns = [];
	
	if (columns != null && columns.length > 0) {
		for (let c = 0; c < columns.length; c++) {
			if (columns[c].optionalParams != null) {
				let opt = JSON.parse(columns[c].optionalParams);
				if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
					continue;
				}
				if (opt.fieldIcon != null) {
					continue;
				}
			}
			if (columns[c].value != "") {
				let option = {value:columns[c].name, label:columns[c].value};
				options.push(option);
				if (itemState.searchCriteria != null) {
					for (let i = 0; i < itemState.searchCriteria.length; i++) {
						if (itemState.searchCriteria[i].searchColumn === columns[c].name) {
							selectedColumns.push(option);
						}
					}
				}
			}
		}
	}

	let value = "";

	return (
		<div className="col-xs-12 col-md-3">
			<SelectMultiple itemState={itemState} name={name} label="Search by" options={options} defaultOption={selectedColumns} inputChange={onClick} inline="true"/>
        </div>
	);
};

SearchBy.propTypes = {
	itemState: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	appPrefs: PropTypes.object.isRequired,
	columns: PropTypes.array.isRequired,
	parent: PropTypes.string,
	onClick: PropTypes.func
};

export default SearchBy;
