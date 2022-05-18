import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const DateInput = ({name, label, placeHolder, value, errors, warns, successes, rendered, required, inputChange, onBlur, wrapperClass, comment}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let commentLabel = '';
	if (comment != null && comment != "") {
		commentLabel = comment;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] != null && successes[name] != "") {
		wrapperClass += ' ' + 'has-error has-feedback';
		//successFeedBack = <span className='glyphicon glyphicon-remove form-control-feedback'/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{successes[name]}</label>;
	}
		
	let req = '';
	if ((typeof required === 'boolean' && required) || (typeof required === 'string' && required == 'true')){
		req = ' *';
	}
	
	if (rendered == null || rendered.length == 0){
		rendered = true;
	} else if (typeof rendered === "string"){
		if (rendered == "true") {
			rendered = true;
		} else {
			rendered = false;
		}
	}
	
	let selected = null;
	if (value != null && value != "") {
		selected = moment(value).toDate();
	} else {
		selected = moment().toDate();
	}
	
	if (rendered) {
		return (
			<div className={wrapperClass}>
				<label htmlFor={name}>{label}{req}</label>
				<div>
					<DatePicker className="form-control" selected={selected} dateFormat="MM-dd-yyyy" onChange={inputChange} />
				</div>
				{errorFeedBack}
				{errorLabel}
				{warnFeedBack}
				{warnLabel}
				{successFeedBack}
				{successLabel}
			</div>
		);
	} else {
		return (<div></div>);
	}
};

DateInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	value: PropTypes.string,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	wrapperClass: PropTypes.string,
	comment: PropTypes.string
};

export default DateInput;