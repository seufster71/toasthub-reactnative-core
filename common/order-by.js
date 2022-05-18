import React from 'react';
import PropTypes from 'prop-types';
import SelectMultiple from './select-multiple-input';

const OrderBy = ({itemState, name, appPrefs, columns, parent, onOrderBy}) => {

	let options = [];
	let tempColumns = [];
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
				let optionASC = {value:columns[c].name, label:columns[c].value+" ASC"};
				let optionDESC = {value:columns[c].name, label:columns[c].value+" DESC"};
				options.push(optionASC);
				options.push(optionDESC);
				if (itemState.orderCriteria != null) {
					for (let i = 0; i < itemState.orderCriteria.length; i++) {
						if (itemState.orderCriteria[i].orderColumn === columns[c].name) {
							if (itemState.orderCriteria[i].orderDir === "ASC") {
								tempColumns.push({orderCriteria:itemState.orderCriteria[i],option:optionASC});
							} else if (itemState.orderCriteria[i].orderDir === "DESC") {
								tempColumns.push({orderCriteria:itemState.orderCriteria[i],option:optionDESC});
							}
								
						}
					}
				}
			}
		}
	}
	
	for (let i = 0; i < itemState.orderCriteria.length; i++) {
		for (let j = 0; j < tempColumns.length; j++) {
			if (itemState.orderCriteria[i] ==  tempColumns[j].orderCriteria) {
				selectedColumns.push(tempColumns[j].option);
			}
		}
	}

	let value = "";

	return (
		<div className="col-xs-12 col-md-3">
			<SelectMultiple itemState={itemState} name={name} label="Order by" options={options} defaultOption={selectedColumns} inputChange={onOrderBy} inline="true" value={value}/>
        </div>
	);
};

OrderBy.propTypes = {
	itemState: PropTypes.object,
	name: PropTypes.string.isRequired,
	appPrefs: PropTypes.object.isRequired,
	columns: PropTypes.array.isRequired,
	parent: PropTypes.string,
	onOrderBy: PropTypes.func
};

export default OrderBy;
