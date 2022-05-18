import React from 'react';
import PropTypes from 'prop-types';
import Input from './text-input';
import { View } from 'react-native';
import Utils from '../../core/common/utils';

const MultiLangTextInput = ({ itemState, field, inputChange, appPrefs, wrapperClass}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let errors = null;
	if (itemState != null && itemState.errors != null) {
		errors = itemState.errors;
	}
	
	let warns = null;
	if (itemState != null && itemState.warns != null) {
		warns = itemState.warns;
	}
			
	let successes = null;
	if (itemState != null && itemState.successes != null) {
		successes = itemState.successes;
	}
	
	let titleDefault = "";
	if (field.classModel != "") {
		let titleModel = JSON.parse(field.classModel);
		if (itemState.selected != null && itemState.selected[titleModel.field] != null) {
			titleDefault = itemState.selected[titleModel.field].defaultText;
		}
	}
	
	let defaultName = field.name + '-DEFAULT';

	let textName = field.name + '-TEXT';
	
	let formLabel = JSON.parse(field.label);
	let inputFields = itemState.inputFields;

	let langTextOptions=[];
    if (appPrefs != null && appPrefs.prefGlobal != null && appPrefs.prefGlobal.LANGUAGES != null && appPrefs.prefGlobal.LANGUAGES.length > 0){
    	for (let i = 0; i < appPrefs.prefGlobal.LANGUAGES.length; i++) {
    		let langLabel = Utils.getMultiLangLabel(appPrefs.prefGlobal.LANGUAGES[i], appPrefs.lang);

    		let required = false;
    		if (appPrefs.prefGlobal.LANGUAGES[i].defaultLang) {
    			required = true;
    		}
    		if (field.rendered) {
    			let textDefault = "";
    			//if (itemState.selected != null && itemState.selected.title != null && itemState.selected.title.langTexts != null) {
    			//	for (let j = 0; j < iitemState.selected.title.langTexts.length; j++) {
    			//		if (itemState.selected.title.langTexts[j].lang == appPrefs.prefGlobal.LANGUAGES[i].code) {
    			//			textDefault = itemState.selected.title.langTexts[j].text;
    			//		}
    			//	}
    			//}
    			let textLabel = formLabel.textLabel + " " + langLabel;
    			let textNameLang = textName + "-" + appPrefs.prefGlobal.LANGUAGES[i].code;
    			langTextOptions.push(<Input key={i} name={textNameLang} inputType={field.htmlType} label={textLabel} required={required} errors={errors} warns={warns} successes={successes} inputChange={(e) => inputChange("TEXT",textNameLang,'',e)} value={(inputFields != null && inputFields[textNameLang] != null)?inputFields[textNameLang]:textDefault}/>);
    		}
    	}
    }
    
	let rendered = true;
	if (field.rendered != null && field.rendered.length != 0){
		if ((typeof field.rendered === "string" && field.rendered == "false")){
			rendered = false;
		} else {
			rendered = field.rendered;
		}
	}
		
	if (rendered) {
		return (
			<View>
				<View> {formLabel.label} </View>
				<View>
					<Input name={defaultName} inputType={field.htmlType} label={formLabel.defaultLabel} rendered={field.rendered} required={field.required} errors={errors} warns={warns} successes={successes} inputChange={(e) => inputChange("TEXT",defaultName,'',e)} value={(inputFields != null && inputFields[defaultName] != null)?inputFields[defaultName]:titleDefault}/>
					{langTextOptions}
				</View>
			</View>
		);
	} else {
		return (<View></View>);
	}
};

MultiLangTextInput.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	inputChange: PropTypes.func.isRequired,
	appPrefs: PropTypes.object.isRequired,
	wrapperClass: PropTypes.string,
};

export default MultiLangTextInput;
