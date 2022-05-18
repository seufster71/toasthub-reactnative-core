import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, View } from 'react-native';
import Input from '../../coreView/common/text-input';
import TextBuilder from '../../coreView/common/text-input-builder';
import TextAutocompleteBuilder from '../../coreView/common/text-autocomplete-builder';
import TextAreaBuilder from '../../coreView/common/textarea-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
// import SelectBuilder from '../../coreView/common/select-input-builder';
import Button from '../../coreView/common/button';
// import Switch from '../../coreView/common/switch';
// import DateBuilder from '../../coreView/common/date-input-builder';
// import SelectMultipleBuilder from '../../coreView/common/select-multiple-builder';
import utils from '../../core/common/utils';
import moment from 'moment';

export default function FormBuilder({itemState, formName, formTitle, formGroup, appPrefs, onSave, onCancel, inputChange}) {
	
		
	let formTitleDefault = "Form Title";
	if (formTitle == null || formTitle != null && formTitle == ""){
		formTitle = formTitleDefault;
	}
	
	let created = "";
    if (itemState.selected != null && itemState.selected.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(itemState.selected.created).toDate());
    	created = <View>Created: {created}</View>;
    }
    
    let modified = "";
    if (itemState.selected != null && itemState.selected.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(itemState.selected.modified).toDate());
    	modified = <View>Last Modified: {modified}</View>
    }
	
	let fieldList = [];
	let subGroups = [];
	let options = [];
	let defaultOption;
	if (itemState.prefForms != null && itemState.prefForms[formName] != null) {
    	for (let i = 0; i < itemState.prefForms[formName].length; i++) {
    		if (itemState.prefForms[formName][i].subGroup != undefined && itemState.prefForms[formName][i].subGroup != ""){
    			continue;
    		}
    		let fieldType = itemState.prefForms[formName][i].fieldType;
    		switch(fieldType) {
    		case "MGRP":
        		subGroups.push(itemState.prefForms[formName][i]);
    			break;
    		case "TXT":
    			fieldList.push(
    					<View>
    						<View>
    							<TextBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</View>
    					</View>);
    			break;
    		case "TXTAREA":
    			fieldList.push(
    					<View>
    						<View>
    							<TextAreaBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</View>
    					</View>);
    			break;
    		case "MTXT":
    			fieldList.push(
    					<View>
							<View>
								<MultiLangTextInput field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} appPrefs={appPrefs}/>		
							</View>
						</View>);
    			break;
    		case "INT":
    			fieldList.push(
    					<View>
    						<View>
    							<TextBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</View>
    					</View>);
    			break;
    		case "SLT":
    			options = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					options = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								options = value.options;
							}
						}
    				} else if (valueObj.referPrefGlobal != null) {
    					let prefs = appPrefs.prefGlobal[valueObj.referPrefGlobal];
    					if (prefs != null && valueObj.referPrefGlobal === "LANGUAGES") {
							for (let j = 0; j < prefs.length; j++) {
								let option = {};
								option.value = prefs[j].code;
								for (let k = 0; k < prefs[j].title.langTexts.length; k++) {
									if (prefs[j].title.langTexts[k].lang === appPrefs.lang) {
										option.label = prefs[j].title.langTexts[k].text;
									}
								}
								options.push(option);
							}
						}
    				}
    			}
			/*	fieldList.push(
    					<View>
    						<View>
    							<SelectBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={options}/>
    						</View>
    					</View>); */
    			break;
    		case "SLTMULTI":
    			options = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					options = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								options = value.options;
							}
						}
    				} else if (valueObj.optionRef != null) {
    					options = itemState[valueObj.optionRef];
    				}
    			}
    			defaultOption = [];
    			if (itemState.inputFields[itemState.prefForms[formName][i].name] != null && itemState.inputFields[itemState.prefForms[formName][i].name] != "") {
    				let optionIds = itemState.inputFields[itemState.prefForms[formName][i].name];
    				for (let l = 0; l < optionIds.length; l++) {
    					for (let o = 0; o < options.length; o++) {
    						if (optionIds[l] == options[o].value) {
    							defaultOption.push(options[o]);
    						}
    					}
    				}
    			}
    			
    		/*	fieldList.push(
    					<View>
    						<View>
    							<SelectMultipleBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={options} defaultOption={defaultOption}/>
    						</View>
    					</View>);*/
    			break;
    		case "BLN":
    			let optionsBLN = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					optionsBLN = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
						if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								optionsBLN = value.options;
							}
						}
    				}
    			}
    			/*fieldList.push(
    					<View>
    						<View>
    							<Switch field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
    						</View>
    					</View>);*/
    			break;
    		case "DATE":
    		/*	fieldList.push(
    					<View>
    						<View>
    							<DateBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</View>
    					</View>);*/
    			break;
    		case "ASLT":
    			if (itemState.selectList != null) {
    				for (let l = 0; l < itemState.selectList.length; l++) {
    					let desc = itemState.selectList[l].label;
    					if (itemState.selectList[l] != null && itemState.selectList[l].extra != "") {
    						desc += " - " + itemState.selectList[l].extra;
    					}
    					options.push(<View key={l} onClick={() => inputChange("SELECTCLICK",itemState.prefForms[formName][i],itemState.selectList[l])}>{desc}</View>);
    				}
    			}
    			fieldList.push(
    					<View>
    						<View>
    							<TextAutocompleteBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={options} isSelectListOpen={itemState.isSelectListOpen}/>
    						</View>
    					</View>);
    			break;
    		}
    		
    	}
    	if (subGroups.length > 0) {
    		for (let i = 0; i < subGroups.length; i++) {
    			let groupName = "";
    			let groupType = "";
    			let subGroupLabel = subGroups[i].label;
    			if (subGroups[i].classModel != undefined && subGroups[i].classModel.includes("{")) {
    				let classModel = JSON.parse(subGroups[i].classModel);
    				groupName = classModel.groupName;
    				groupType = classModel.groupType;
    			}
    			if (groupType === "MULTI") {
    				for (let l = 0; l < appPrefs.prefGlobal.LANGUAGES.length; l++) {
    	    			let key = "subGroup-"+appPrefs.prefGlobal.LANGUAGES[l].code;
    	    			let subGroupList = [];
    	    			for (let j = 0; j < itemState.prefForms[formName].length; j++) {
    	    				if ( !(itemState.prefForms[formName][j].subGroup === groupName) ) {
    	    	    			continue;
    	    	    		}
    	    					
    	    				let fieldType = itemState.prefForms[formName][j].fieldType;
    	    				switch(fieldType) {
    	    	    		case "TXT":
    	    					subGroupList.push(
    	            					<View>
    	            						<View>
    	            							<TextBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange}/>
    	            						</View>
    	            					</View>);
    	            			break;
    	    	    		case "SLT":
    		    				let options = [];
    		        			if (itemState.prefForms[formName][j].value != "") {
    		        				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
    		        				options = valueObj.options;
    		        			}
    	        			/*	subGroupList.push(
    	            					<View>
    	            						<View>
    	            							<SelectBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={options}/>
    	            						</View>
    	            					</View>);*/
    	        				break;
    	    	    		case "BLN":
    	    	    			let optionsBLN = [];
    	    	    			if (itemState.prefForms[formName][j].value != "") {
    	    	    				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
    	    	    				if (valueObj.options != null) {
    	    	    					optionsBLN = valueObj.options;
    	    	    				} else if (valueObj.referPref != null) {
    	    	    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    	    							if (pref != null && pref.value != null && pref.value != "") {
    	    								let value = JSON.parse(pref.value);
    	    								if (value.options != null) {
    	    									optionsBLN = value.options;
    	    								}
    	    							}
    	    	    				}
    	    	    			}
    	        			/*	subGroupList.push(
    	            					<View>
    	            						<View>
    	            							<Switch field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
    	            						</View>
    	            					</View>);*/
    	        				break;
    	    				}
    	    			}
    	    			let label = subGroupLabel+" "+utils.getMultiLangLabel(appPrefs.prefGlobal.LANGUAGES[l],appPrefs.lang);
    	    			if (appPrefs.prefGlobal.LANGUAGES[l].defaultLang) {
    	    				label = label+" *";
    	    			}
    	    			fieldList.push(
    	    	    			<View>
    	    						<View>
    	    			    			<View>
    	    			    				<View> {label} </View>
    	    			    				<View>
    	    									{subGroupList}
    	    								</View>
    	    							</View>
    	    						</View>
    	    					</View>);
    				}
    			} else {
    				for (let j = 0; j < itemState.prefForms[formName].length; j++) {
        				if ( !(itemState.prefForms[formName][j].group === groupName) ) {
        	    			continue;
        	    		}
        				let fieldType = itemState.prefForms[formName][j].fieldType;
        				switch(fieldType) {
	    	    		case "TXT":
        					subGroupList.push(
                					<View>
                						<View>
                							<TextBuilder field={prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange}/>
                						</View>
                					</View>);
        					break;
	    	    		case "SLT":
    	    				let options = [];
    	        			if (itemState.prefForms[formName][j].value != "") {
    	        				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
    	        				options = valueObj.options;
    	        			}
            			/*	subGroupList.push(
                					<View>
                						<View>
                							<SelectBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={options}/>
                						</View>
                					</View>);*/
            				break;
	    	    		case "BLN":
	    	    			let optionsBLN = [];
	    	    			if (itemState.prefForms[formName][j].value != "") {
	    	    				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
	    	    				if (valueObj.options != null) {
	    	    					optionsBLN = valueObj.options;
	    	    				} else if (valueObj.referPref != null) {
	    	    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
	    							if (pref != null && pref.value != null && pref.value != "") {
	    								let value = JSON.parse(pref.value);
	    								if (value.options != null) {
	    									optionsBLN = value.options;
	    								}
	    							}
	    	    				}
	    	    			}
            		/*		subGroupList.push(
                					<View>
                						<View>
                							<Switch field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
                						</View>
                					</View>);*/
            				break;
    	        		}
        			}
    				fieldList.push(
    		    			<View>
    							<View>
    				    			<View>
    				    				<View> {subGroupLabel} </View>
    				    				<View>
    										{subGroupList}
    									</View>
    								</View>
    							</View>
    						</View>);
    			}
    		}
    	}
    }
	
	return (
		<View>
			<View>
				<View>{formTitle}</View>
				{created}
				{modified}
				{fieldList}
				<View>
					<View>
			  			<Button onClick={() => onSave()} value={"Save"}/>
			  			<Button onClick={() => onCancel()} value={"Cancel"}/>
			  		</View>
		  		</View>
		  	</View>
		</View>
	);
}

FormBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	formName: PropTypes.string.isRequired,
	formTitle: PropTypes.string,
	formGroup: PropTypes.string.isRequired,
	appPrefs: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired
};

