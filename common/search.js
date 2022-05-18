import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input';
import Button from './button';


const Search = ({name, label, onChange, onClick, onBlur, placeHolder, value, error, buttonClassName}) => {
	let wrapperClass = 'form-group';
	if (buttonClassName == null) {
		buttonClassName = "input-group-addon";
	}
	if (placeHolder == null){
		placeHolder = "Search"
	}
	return (
		<div className="col-xs-12 col-md-3">
        	<div className="input-group">
        		<input className="form-control" type="text" id={name} name={name} placeholder={placeHolder} aria-label="Search" onKeyPress={(e) => onChange(name,e)} onChange={(e) => onChange(name,e)}/>
        		<span key={name} id={name} name={name} value={value} onClick={() => onClick(name)} className={buttonClassName}><i className="fa fa-search" aria-hidden="true"></i></span>
        	</div>
        </div>
	);
};

Search.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onBlur: PropTypes.func,
	placeHolder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	buttonClassName: PropTypes.string
};

export default Search;
