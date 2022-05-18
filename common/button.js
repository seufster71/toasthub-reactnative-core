import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-native";

const ToasthubButton = ({value, onClick}) => {
  
  return (
    <Button title={value} onPress={onClick}/>
  );
};

ToasthubButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default ToasthubButton;
