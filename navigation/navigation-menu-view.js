import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import Icon from 'react-native-ico-material-design';
import utils from '../../core/common/utils';

var iconHeight = 26;
var iconWidth = 26;

export default function NavigationView({menus,appPrefs,permissions,activeTab,changeTab,backToTab,headerToolTip,user,profileMenu,navigate}) {
	
	const fadeAnim = useRef(new Animated.Value(0)).current;
	
    let items = [];
    let topMenus = menus;

    if (topMenus != null) {
     // items = buildMenu(items,topMenus,permissions,user,activeTab);
    }
    // user profile
    if (user != null) {
    	if (profileMenu != null) {
    		items = buildMenu(items,profileMenu,permissions,user,activeTab);
    	} else {
	/*	    items.push(
		        <NavDropdown key="UP" title={<span><i className="fa fa-bars fa-1" aria-hidden="true"></i> <span className="navText">{user.username}</span></span>} id="UP" >
		        	<NavDropdown.Item key="UP-1" href="/member-profile">Profile</NavDropdown.Item>
		        	<NavDropdown.Item key="UP-2" href="/member-logout">Logout</NavDropdown.Item>
		        </NavDropdown>
		    );*/
    	}
    }
    let headerName = "";
    if (appPrefs != null && appPrefs.headerName != "") {
      headerName = appPrefs.headerName;
    }
    if (headerToolTip == null || headerToolTip == "") {
    	headerToolTip = "Environment undetermined";
    }
 /*   return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
			<Container>
          		<Navbar.Brand  href="#page-top">{headerName}</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  		<Navbar.Collapse id="responsive-navbar-nav">
        			<Nav className="me-auto">{items}</Nav>
				</Navbar.Collapse>
        	</Container>
      </Navbar>
    ); */

	const openDrawer = () => {
		Animated.timing(
			fadeAnim,
			{ toValue: 1, duration: 100, useNativeDriver: true }
		).start();
	}
	
	const closeDrawer = () => {
		Animated.timing(
			fadeAnim,
			{ toValue: 0, duration: 100, useNativeDriver: true }
		).start();
	}

	return (
	<View style={styles.NavContainer}>
		<Pressable onPress={() => navigate("/services")} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}} >
			<Icon name="car-directions" height={iconHeight} width={iconWidth} />
		</Pressable>
		<Pressable onPress={() => navigate("/")} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}} >
			<Icon name="chat-bubble" height={iconHeight} width={iconWidth} />
		</Pressable>
		<Pressable onPress={() => navigate("/about")} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}} >
			<Icon name="add-alarm-button" height={iconHeight} width={iconWidth} />
		</Pressable>
		<Pressable onPress={() => openDrawer()} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}} >
			<Icon name="menu-button" height={iconHeight} width={iconWidth} />
		</Pressable>
	</View>
	);
}

const buildMenu = (items,menus,permissions,user,activeTab) => {
	for (let m = 0; m < menus.length; m++) {
        if (permissions != null && !utils.hasPermission(permissions,menus[m].permissionCode,"R")) {
          continue;
        }
        if (menus[m].values[0].rendered) {
          let children = [];
          if (menus[m].children != null) {
            let childList = menus[m].children;
            for (let c = 0; c < childList.length; c++) {
              if (permissions != null && !utils.hasPermission(permissions,childList[c].permissionCode,"R")) {
                continue;
              }
              if (childList[c].values[0].rendered) {
                children.push(
                  <NavDropdown.Item key={menus[m].code+"-"+childList[c].menuId} href={childList[c].values[0].href}>{childList[c].values[0].value}</NavDropdown.Item>
                );
              }
            }
          }
          if (children.length > 0) {
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
            items.push(
              <NavDropdown key={menus[m].menuId} title={<span><i className="fa fa-bars fa-1" aria-hidden="true"></i> <span className="navText">{value}</span></span>} id={menus[m].code} >
                {children}
              </NavDropdown>
            );
          } else {
        	let image = "";
          	if (menus[m].values[0].image != null) {
          		if (menus[m].values[0].image.startsWith("fa")) {
	  	            image = <i className={menus[m].values[0].image} aria-hidden="true"/>;
          		} else {
	  	            image = <img src={"/img/"+menus[m].values[0].image+"_outline.png"} height="20" width="20" />;
	  	            if (activeTab === menus[m].values[0].href) {
	  	              image = <img src={"/img/"+menus[m].values[0].image+".png"} height="25" width="25" />;
	  	            }
          		}
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
            items.push(
              <Nav.Link key={menus[m].menuId} href={menus[m].values[0].href}>
                 <NavItem>{image}<span className="navText"> {value}</span>
                 </NavItem>
              </Nav.Link>
            );
          }
        }
      }
	return items;
}
        
const styles = StyleSheet.create({
	NavContainer: {
		top:20,
	},
	
	IconBehave: {
		padding: 14
	}
});
        
  NavigationView.propTypes = {
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
