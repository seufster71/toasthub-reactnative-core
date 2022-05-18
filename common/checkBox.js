import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native';

const CheckBox = ({name, label, onChange}) => {

  return (
    <CheckBox value={label} onValueChange={onChange}/>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckBox;
