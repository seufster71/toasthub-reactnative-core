import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import TextInput from '../common/text-input';
import fuLogger from '../../core/common/fu-logger';
// import Button from '../common/button';
// import Link from '../common/link';
// import PasswordMeter from '../common/password-meter';

export default function LoginView({currentState, fields, texts, labels, onChangeLogin,
	onChangeRegistration, fieldChangeEvent, onForgotPassword, handleChange,
	fieldBlurEvent, buttonClick}) {

	let items = [];
	let headers = [];
	let formId = "login-form";
	let loginActive = "";
	let regActive = "";
	let forgotActive = "";
	let loginTexts = texts.LOGIN_FORM;
	let registrationTexts = texts.REGISTRATION_FORM;
	let forgotTexts = texts.FORGOTPASSWORD_FORM;
	if (currentState.view === 'login') {
		loginActive = "active";
		// LOGIN_FORM
		// fields
		let loginFields = fields.LOGIN_FORM;
		let loginLabels = labels.LOGIN_FORM;
		for (let i = 0; i < loginFields.length; i++) {
			if (loginFields[i].fieldType === "TXT") {
				items.push(<TextInput
					key={"LOGIN_FORM-"+loginFields[i].name}
					name={"LOGIN_FORM-"+loginFields[i].name}
					label={loginFields[i].label}
					inputChange={handleChange} />
				);
  			}
		}
    	// buttons
	//	fuLogger.log({level:'TRACE',loc:'LoginView::labels',msg:JSON.stringify(labels)});
    	for (let l = 0; l < loginLabels.length; l++) {
			let label = loginLabels[l];
      		if (label.rendered) {
	      		items.push(
					<Pressable key={loginLabels[l].name} onPress={() => buttonClick(label.name)} style={[styles.IconBehave]} android_ripple={{borderless:true, radius:50}} >
						<View style={styles.ButtonContainer}>
							<Text style={styles.ButtonText} >{label.value}</Text>
						</View>
					</Pressable>
				);
      		}
    	}

    	// Forgot Password
    /*	items.push(<Link
     		 key={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      		id={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      		name={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      		label={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.value}
      		onClick={onForgotPassword}/>);
	*/
		headers.push(<Text key={loginTexts.LOGIN_FORM_HEADER.name}>{loginTexts.LOGIN_FORM_HEADER.value}</Text>);
		headers.push(<Text key={registrationTexts.REGISTRATION_FORM_HEADER.name}>{registrationTexts.REGISTRATION_FORM_HEADER.value}</Text>);
	} else if (currentState.view === 'forgotPassword') {
		// FORGOT_PASSWORD_FORM
		forgotActive = "active";
		// fields test
		let forgotFields = fields.FORGOTPASSWORD_PAGE;
		let forgotLabels = labels.FORGOTPASSWORD_PAGE;
		if (forgotFields != null && forgotLabels != null) {
			for (let i = 0; i < forgotFields.length; i++) {
				if (forgotFields[i].fieldType === "TXT") {
					items.push(<TextInput
						name={'FORGOTPASSWORD_FORM-'+forgotFields[i].name}
			            placeHolder={forgotFields[i].label}
						onChangeText={handleChange}/>
					);
				}
 			}
			// buttons
			for (let l = 0; l < forgotLabels.length; l++) {
				let label = forgotLabels[l];
				if (label.rendered) {
					items.push(
						<Pressable onPress={(label) => buttonClick(label.name)} style={[styles.IconBehave]} android_ripple={{borderless:true, radius:50}} >
							<View style={ButtonContainer}>
								<Text>{label.value}</Text>
							</View>
						</Pressable>
					);
				}
			}
		}
		headers.push(<Text>{loginTexts.LOGIN_FORM_HEADER.value}</Text>);
    	headers.push(<Text>{forgotTexts.FORGOTPASSWORD_FORM_HEADER.value}</Text>);
  	} else {
		// REGISTRATION_FORM
		// fields
		regActive = "active";
		formId = "registration-form";
		let registrationFields = fields.REGISTRATION_PAGE;

		let registrationLabels = labels.REGISTRATION_PAGE;
		for (let f = 0; f < registrationFields.length; f++) {
			if (registrationFields[f].fieldType === "TXT") {
				items.push(<TextInput
          			name={'REGISTRATION_FORM-'+registrationFields[f].name}
          			placeHolder={registrationFields[f].label}
          			error={currentState.errorMap[registrationFields[f].name]}
          			onChange={handleChange}/>
				);
      		}
			if (registrationFields[f].htmlType === "password") {
        		if (registrationFields[f].optionalParams == null) {
          			let alphaCheckCss = "text-success";
          			if (currentState.errorMap.REGISTRATION_FORM_ALPHA_CHECK != null && currentState.errorMap.REGISTRATION_FORM_ALPHA_CHECK === "ERROR"){
           				alphaCheckCss = "text-danger";
          			}
          			let capitalCheckCss = "text-success";
          			if (currentState.errorMap.REGISTRATION_FORM_CAPITAL_CHECK != null && currentState.errorMap.REGISTRATION_FORM_CAPITAL_CHECK === "ERROR"){
            			capitalCheckCss = "text-danger";
          			}
          			let numberCheckCss = "text-success";
          			if (currentState.errorMap.REGISTRATION_FORM_NUMBER_CHECK != null && currentState.errorMap.REGISTRATION_FORM_NUMBER_CHECK === "ERROR"){
            			numberCheckCss = "text-danger";
          			}
          			let specialCheckCss = "text-success";
          			if (currentState.errorMap.REGISTRATION_FORM_SPECIAL_CHECK != null && currentState.errorMap.REGISTRATION_FORM_SPECIAL_CHECK === "ERROR"){
            			specialCheckCss = "text-danger";
          			}
          			let countCheckCss = "text-success";
          			if (currentState.errorMap.REGISTRATION_FORM_COUNT_CHECK != null && currentState.errorMap.REGISTRATION_FORM_COUNT_CHECK === "ERROR"){
            			countCheckCss = "text-danger";
          			}
          			// show password requirements
          			items.push(<PasswordMeter
            			key="{registrationFields[f].name}-METER"
            			name={registrationFields[f].name}
            			alphaCheckCss={alphaCheckCss}
            			alphaCheckValue={registrationTexts.REGISTRATION_FORM_ALPHA_CHECK.value}
            			capitalCheckCss={capitalCheckCss}
            			capitalCheckValue={registrationTexts.REGISTRATION_FORM_CAPITAL_CHECK.value}
            			numberCheckCss={numberCheckCss}
            			numberCheckValue={registrationTexts.REGISTRATION_FORM_NUMBER_CHECK.value}
            			specialCheckCss={specialCheckCss}
            			specialCheckValue={registrationTexts.REGISTRATION_FORM_SPECIAL_CHECK.value}
            			countCheckCss={countCheckCss}
            			countCheckValue={registrationTexts.REGISTRATION_FORM_COUNT_CHECK.value} />
					);
        		} else if (registrationFields[f].optionalParams != null) {
         			// show password check match
        		}
      		}
    	}
    	// buttons
    	for (let g = 0; g < registrationLabels.length; g++) {
      		if (registrationLabels[g].rendered) {
        		items.push(<Button
          			key={registrationLabels[g].name}
          			id={registrationLabels[g].name}
          			name={registrationLabels[g].name}
          			value={registrationLabels[g].value}
          			onClick={(e) => buttonClick(e,registrationLabels[g].value)}
          			className="form-control"/>
				);
      		}
    	}
    	headers.push(<Text>{loginTexts.LOGIN_FORM_HEADER.value}</Text>);
    	headers.push(<Text>{registrationTexts.REGISTRATION_FORM_HEADER.value}</Text>);

	}

	return (
		<View>
	        <View>
	           {headers}
			</View>
			<View style={styles.FieldsView}>
            	{items}
			</View>
    	</View>
  	);
}

const styles = StyleSheet.create({
	IconBehave: {
		paddingTop: 10,
		paddingRight: 14,
		paddingLeft: 14,
		paddingBottom: 30,
		alignItems: 'center',
	},
	IconActive: {
		borderTopWidth: 2
	},
	IconText: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ButtonContainer: {
    	shadowColor: '#000',
    	shadowOffset: {
      		width: 0,
      		height: 2,
    	},
    	backgroundColor: '#5DADE2',
    	shadowOpacity: 0.23,
    	shadowRadius: 2.62,
    	width: 250,
    	elevation: 4,
    	borderRadius: 8,
    	height: 50,
    	justifyContent: 'center',
    	alignItems: 'center',
    	paddingHorizontal: 80,
  	},
	ButtonText: {
		color: '#FFF',
		fontSize: 16,
    	fontWeight: 'bold',
	}
});

LoginView.propTypes = {
  currentState: PropTypes.object.isRequired,
  errorMap: PropTypes.object,
	fields: PropTypes.object.isRequired,
  texts: PropTypes.object,
  labels: PropTypes.object,
  onChangeLogin: PropTypes.func,
  onChangeRegistration: PropTypes.func,
  onForgotPassword: PropTypes.func,
  fieldChangeEvent: PropTypes.func,
  fieldBlurEvent: PropTypes.func,
  handleChange: PropTypes.func,
  buttonClick: PropTypes.func
};
