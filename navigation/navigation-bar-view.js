import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-ico-material-design';
import utils from '../../core/common/utils';
import fuLogger from '../../core/common/fu-logger';

var iconHeight = 35;
var iconWidth = 35;

export default function NavigationBarView({menus,appPrefs,permissions,activeTab,changeTab,backToTab,headerToolTip,user,profileMenu,navigate}) {

	
    let items = [];
    let topMenus = menus;
	fuLogger.log({level:'TRACE',loc:'NavigationBarView',msg:"menus "+ JSON.stringify(menus)});
	
    if (topMenus != null) {
      items = buildMenu(items,topMenus,permissions,user,activeTab,navigate);
    }
   
    let headerName = "";
    if (appPrefs != null && appPrefs.headerName != "") {
      headerName = appPrefs.headerName;
    }
    if (headerToolTip == null || headerToolTip == "") {
    	headerToolTip = "Environment undetermined";
    }

	return (
	<View style={styles.NavContainer}>
		<View style={styles.NavBarContainer}>
			<View style={styles.NavBar}>
				{items}
			</View>
		</View>
	</View>
	);
}

const buildMenu = (items,menus,permissions,user,activeTab,navigate) => {
	for (let m = 0; m < menus.length; m++) {
        if (permissions != null && !utils.hasPermission(permissions,menus[m].permissionCode,"R")) {
			continue;
        }
        if (menus[m].values[0].rendered) {
          
			fuLogger.log({level:'TRACE',loc:'NavigationBarView::buildMenu::menus',msg:JSON.stringify(menus[m])});
			
	    	let image = "";
	  		if (menus[m].values[0].iconNative != null) {
	            image = menus[m].values[0].iconNative;
	  		}
	
	      	let value = "";
	      	if (menus[m].optionalParams != null && menus[m].optionalParams != "") {
	      		let optionalParams = JSON.parse(menus[m].optionalParams);
	      		if (optionalParams.override != null && optionalParams.override === "value"){
	      			if (optionalParams.object === "user" && optionalParams.field != null && user != null){
	      				value = user[optionalParams.field];
	      			}
	      		} 
	      	} else {
	      		value = menus[m].values[0].value;
	      	}
			let route = menus[m].values[0].routeNative;
			let pressableStyle = [styles.IconBehave];
			if (activeTab == menus[m].values[0].routeNative) {
				pressableStyle.push(styles.IconActive);
			}
			fuLogger.log({level:'TRACE',loc:'NavigationBarView::buildMenu::activeTab',msg:activeTab+" "+menus[m].values[0].routeNative});
	        items.push(
				<Pressable key={menus[m].menuId} onPress={() => navigate(route)} style={pressableStyle} android_ripple={{borderless:true, radius:50}} >
					<Icon name={image} height={iconHeight} width={iconWidth} />
					<Text>{value}</Text>
				</Pressable>
	        );
        }
    }
	return items;
}
        
const styles = StyleSheet.create({
	NavContainer: {
		height: '95%',
		position: 'absolute',
		top:'5%',
		left:0,
		right:0
	},
	NavBarContainer: {
		position: 'absolute',
		alignItems: 'center',
		left:0,
		right:0,
		bottom: 0,
		zIndex: 100,
	},
	NavBar: {
		flexDirection: 'row',
		backgroundColor: '#eee',
		width: '100%',
		justifyContent: 'space-evenly',
	},
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
	}
	
});
        
  NavigationBarView.propTypes = {
    appPrefs: PropTypes.object,
    permissions: PropTypes.object,
    menus: PropTypes.array,
    activeTab: PropTypes.string,
    changeTab: PropTypes.func,
    backToTab: PropTypes.string,
    headerToolTip: PropTypes.string,
    user: PropTypes.object,
    profileMenu: PropTypes.array
  };
