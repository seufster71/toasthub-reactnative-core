import React from 'react';
import PropTypes from 'prop-types';

const ShowEntries = ({name, appPrefs, listLimit, onListLimitChange}) => {
	let options = [];
	if(appPrefs.prefOptions.GLOBAL_PAGE != null && appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT_SELECT != null) {
		let listLimitSelect = appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT_SELECT.value;
		if (listLimitSelect != "") {
			let items = JSON.parse(listLimitSelect);
			for (let i = 0; i < items.length; i++) {
				if (listLimit != null && listLimit == items[i].k) {
					options.push(<option key={i} value={items[i].k} value={listLimit}>{items[i].v}</option>);
				} else {
					options.push(<option key={i} value={items[i].k}>{items[i].v}</option>);
				}
			}
		}
	}


	return (
		<div className="col-xs-12 col-md-3">
			<div className="dataTables_length" id="datatable_length">
				<label>Show <select name={name} aria-controls="datatable" className="form-control input-sm" onChange={(e) => onListLimitChange(name,e)} >
              	{options}
              	</select> entries </label>
            </div>
        </div>
	);
};

ShowEntries.propTypes = {
	name: PropTypes.string.isRequired,
	appPrefs: PropTypes.object.isRequired,
	listLimit: PropTypes.number,
	onListLimitChange: PropTypes.func
};

export default ShowEntries;
