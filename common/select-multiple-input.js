import React from 'react';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, Text } from 'react-native';

const SelectMultipleInput = ({itemState, name, label, defaultOption, value, rendered, required, inputChange, onBlur, options, wrapperClass, inline}) => {

	const [open, setOpen] = false;
	const setValue = inputChange;
	const items = options;
	const setItems = null;

	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	if (inline != null && inline == "true") {
		inline = true;
	} else {
		inline = false;
	}
	
	let errorLabel = null;
	let errorFeedBack = null;
	if (itemState != null && itemState.errors != null && itemState.errors[name] != null && itemState.errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{itemState.errors[name]}</div>;
	}
	
	let warnLabel = null;
	let warnFeedBack = null;
	if (itemState != null && itemState.warns != null && itemState.warns[name] != null && itemState.warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{itemState.warns[name]}</label>;
	}
			
	let successLabel = null;
	let successFeedBack = null;
	if (itemState != null && itemState.successes != null && itemState.successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{itemState.successes[name]}</label>;
	}
	
	let req = "";
	if ((typeof required === "boolean" && required) || (typeof required === "string" && required == "true")){
		req = " *";
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
	
	if (rendered) {
		if (inline) {
			return (
				<View>
					<Text>{label}{req}</Text>
					<DropDownPicker 
						open={open} 
						value={value} 
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						theme={theme}
						multiple={true}
						mode="BADGE"
						badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
					/>
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</View>
			);
		} else {
			return (
				<View>
						<Text>{label}{req}</Text>
						<DropDownPicker 
							open={open} 
							value={value} 
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							theme={theme}
							multiple={true}
							mode="BADGE"
							badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
						/>
						{errorFeedBack}
						{errorLabel}
						{warnFeedBack}
						{warnLabel}
						{successFeedBack}
						{successLabel}
				</View>
				);
		}
	} else {
		return (<View><Text>Select issue contant admin</Text></View>);
	}
};

SelectMultipleInput.propTypes = {
	itemState: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string,
	inline: PropTypes.string
};

export default SelectMultipleInput;
