/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use-strict';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../core/status/status-actions';


function StatusView() {
	const itemState = useSelector((state) => state.status);
	const dispatch = useDispatch();

    const clearStatus = () => {
    	dispatch(actions.clearStatus());
    }
    
	let items = [];
	if (itemState.error != null ) {
		for (let i = 0; i < itemState.error.length; i++) {
			items.push(<View>
				<Text>Error:</Text>
				<Text>{itemState.error[i].message}</Text>
				</View>);
		}
	}
	if (itemState.info != null) {
		for (let i = 0; i < itemState.info.length; i++) {
			items.push(<View><Text>
			{itemState.info[i].message}</Text></View>);
		}
	}
	if (itemState.warn != null) {
		for (let i = 0; i < itemState.warn.length; i++) {
			items.push(<View><Text>
			{itemState.warn[i].message}</Text></View>);
		}
	}
	if (itemState.error != null || itemState.info != null || itemState.warn != null) {
		setTimeout(() => {this.clearStatus()},5000);
	}
	
	return (
			<View> 
				{items} 
			</View>
	);

}

export default StatusView;
