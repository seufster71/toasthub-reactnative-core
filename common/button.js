import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Pressable  } from "react-native";

const ToasthubButton = ({value, onClick}) => {
  
  return (
    <Pressable onPress={() => navigate("/login")} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}} >
			<Icon name="hat-bubble" height="40" width="40" />
	</Pressable>
  );
};

ToasthubButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

const styles = StyleSheet.create({
	IconBehave: {
		padding: 14
	},
	Button: {
		width: 150,
		height: 50,
		backgroundColor: '#00ffee',
		alignItems: 'center'
	}
});

export default ToasthubButton;
